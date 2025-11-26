// Node.js Server với Socket.io cho Game Online
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// Route for root path - serve game HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index_chess_socketio.html'));
});

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(__dirname));

// API endpoint to get local IP
app.get('/api/ip', (req, res) => {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Skip internal (i.e. 127.0.0.1) and non-IPv4 addresses
            if (iface.family === 'IPv4' && !iface.internal) {
                return res.json({ ip: iface.address });
            }
        }
    }
    
    res.json({ ip: 'localhost' });
});

// Store game rooms
const rooms = new Map();
const players = new Map();

// Helper functions
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function isValidRoomCode(code) {
    return typeof code === 'string' && code.length === 6 && /^[A-Z0-9]+$/.test(code);
}

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    // Create room
    socket.on('createRoom', () => {
        const roomCode = generateRoomCode();
        const room = {
            code: roomCode,
            host: socket.id,
            players: new Map([[socket.id, { name: 'Người chơi 1', side: null }]]),
            status: 'waiting',
            gameState: null,
            createdAt: Date.now()
        };
        
        rooms.set(roomCode, room);
        players.set(socket.id, { roomCode, isHost: true });
        
        socket.join(roomCode);
        socket.emit('roomCreated', { roomCode, playerId: socket.id });
        
        console.log(`Room created: ${roomCode} by ${socket.id}`);
    });
    
    // Join room
    socket.on('joinRoom', ({ roomCode }) => {
        if (!isValidRoomCode(roomCode)) {
            socket.emit('error', { message: 'Mã phòng không hợp lệ!' });
            return;
        }
        
        const room = rooms.get(roomCode);
        if (!room) {
            socket.emit('error', { message: 'Phòng không tồn tại!' });
            return;
        }
        
        if (room.status !== 'waiting') {
            socket.emit('error', { message: 'Phòng đã bắt đầu!' });
            return;
        }
        
        if (room.players.size >= 2) {
            socket.emit('error', { message: 'Phòng đã đầy!' });
            return;
        }
        
        // Add player to room
        room.players.set(socket.id, { name: 'Người chơi 2', side: null });
        players.set(socket.id, { roomCode, isHost: false });
        
        socket.join(roomCode);
        socket.emit('roomJoined', { roomCode, playerId: socket.id });
        
        // Notify all players in room
        io.to(roomCode).emit('playerJoined', {
            players: Array.from(room.players.entries()).map(([id, data]) => ({
                id,
                name: data.name,
                side: data.side
            }))
        });
        
        // When 2 players join, start coin flip to choose sides
        if (room.players.size === 2) {
            room.status = 'choosingSides';
            io.to(roomCode).emit('readyToChooseSides', {
                players: Array.from(room.players.entries()).map(([id, data]) => ({
                    id,
                    name: data.name
                }))
            });
            console.log(`Ready to choose sides in room: ${roomCode}`);
        }
    });
    
    // Coin flip result (choose sides) - only host can flip
    socket.on('coinFlipResult', ({ roomCode, result }) => {
        const room = rooms.get(roomCode);
        if (!room || room.status !== 'choosingSides') return;
        
        // Only host can flip coin
        if (socket.id !== room.host) {
            socket.emit('error', { message: 'Chỉ Player 1 mới được tung đồng xu!' });
            return;
        }
        
        // result: 'heads' (Cờ Vua) or 'tails' (Cờ Tướng)
        const playerIds = Array.from(room.players.keys());
        const hostId = room.host;
        const guestId = playerIds.find(id => id !== hostId);
        
        if (result === 'heads') {
            // Heads = Cờ Vua
            room.players.get(hostId).side = 'chess';
            room.players.get(guestId).side = 'xiangqi';
        } else {
            // Tails = Cờ Tướng
            room.players.get(hostId).side = 'xiangqi';
            room.players.get(guestId).side = 'chess';
        }
        
        // Broadcast coin flip result to all players
        io.to(roomCode).emit('coinFlipCompleted', { result });
        
        // Broadcast side assignment
        io.to(roomCode).emit('sidesAssigned', {
            players: Array.from(room.players.entries()).map(([id, data]) => ({
                id,
                name: data.name,
                side: data.side
            }))
        });
        
        // Move to dice roll phase
        room.status = 'choosingFirstTurn';
        console.log(`Sides assigned in room: ${roomCode}, result: ${result}`);
    });
    
    // Dice roll result (choose first turn) - both players roll
    socket.on('diceRollResult', ({ roomCode, player1Result, player2Result }) => {
        const room = rooms.get(roomCode);
        if (!room || room.status !== 'choosingFirstTurn') return;
        
        // Store dice results
        if (!room.diceResults) room.diceResults = {};
        room.diceResults[socket.id] = { player1Result, player2Result, playerName: room.players.get(socket.id).name };
        
        // Broadcast dice result to all players
        io.to(roomCode).emit('diceRolled', {
            playerId: socket.id,
            playerName: room.players.get(socket.id).name,
            player1Result,
            player2Result,
            total: player1Result + player2Result
        });
        
        // Check if both players have rolled
        if (Object.keys(room.diceResults).length === 2) {
            const playerIds = Array.from(room.players.keys());
            const results = [
                { id: playerIds[0], ...room.diceResults[playerIds[0]] },
                { id: playerIds[1], ...room.diceResults[playerIds[1]] }
            ];
            
            const total1 = results[0].player1Result + results[0].player2Result;
            const total2 = results[1].player1Result + results[1].player2Result;
            
            // Player with higher total goes first
            let firstTurn;
            let winnerId;
            
            if (total1 > total2) {
                winnerId = results[0].id;
                firstTurn = room.players.get(results[0].id).side;
            } else if (total2 > total1) {
                winnerId = results[1].id;
                firstTurn = room.players.get(results[1].id).side;
            } else {
                // Tie - random
                const randomWinner = Math.random() < 0.5 ? results[0] : results[1];
                winnerId = randomWinner.id;
                firstTurn = room.players.get(randomWinner.id).side;
            }
            
            room.status = 'playing';
            room.currentTurn = firstTurn;
            
            // Start game
            io.to(roomCode).emit('gameStarted', {
                players: Array.from(room.players.entries()).map(([id, data]) => ({
                    id,
                    name: data.name,
                    side: data.side
                })),
                currentTurn: firstTurn,
                diceResults: room.diceResults,
                firstTurnPlayer: room.players.get(winnerId).name
            });
            
            console.log(`Game started in room: ${roomCode}, first turn: ${firstTurn} (${room.players.get(winnerId).name})`);
        }
    });
    
    // Update game state
    socket.on('updateGameState', ({ roomCode, gameState }) => {
        const room = rooms.get(roomCode);
        if (!room) {
            socket.emit('error', { message: 'Phòng không tồn tại!' });
            return;
        }
        
        if (room.status !== 'playing') {
            return;
        }
        
        // Validate it's player's turn
        const player = room.players.get(socket.id);
        if (!player || player.side !== room.currentTurn) {
            socket.emit('error', { message: 'Không phải lượt của bạn!' });
            return;
        }
        
        // Update game state
        room.gameState = gameState;
        room.currentTurn = gameState.currentTurn;
        
        // Broadcast to all players in room (except sender)
        socket.to(roomCode).emit('gameStateUpdated', { gameState });
        
        // Check for game over
        if (gameState.isGameOver) {
            room.status = 'finished';
            io.to(roomCode).emit('gameOver', { winner: gameState.winner });
        }
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        
        const playerData = players.get(socket.id);
        if (playerData) {
            const room = rooms.get(playerData.roomCode);
            if (room) {
                room.players.delete(socket.id);
                
                // Notify other players
                socket.to(playerData.roomCode).emit('playerLeft', { playerId: socket.id });
                
                // Clean up room if empty or host left
                if (room.players.size === 0 || (playerData.isHost && room.players.size === 1)) {
                    rooms.delete(playerData.roomCode);
                    console.log(`Room deleted: ${playerData.roomCode}`);
                }
            }
            
            players.delete(socket.id);
        }
    });
});

// Cleanup old rooms (older than 1 hour)
setInterval(() => {
    const now = Date.now();
    for (const [code, room] of rooms.entries()) {
        if (now - room.createdAt > 3600000) { // 1 hour
            rooms.delete(code);
            console.log(`Cleaned up old room: ${code}`);
        }
    }
}, 60000); // Check every minute

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT} or http://localhost:${PORT}/index_chess_socketio.html`);
    console.log(`Game available at root path: /`);
});

