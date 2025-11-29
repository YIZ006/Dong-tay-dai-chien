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

// Route for root path - serve game HTML (MUST be before static files)
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'index_chess_socketio.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error loading game file: ' + err.message);
        }
    });
});

// Serve static files (CSS, JS, images, etc.) - MUST be after specific routes
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
        console.log(`Join room request: ${roomCode} from ${socket.id}`);
        
        if (!isValidRoomCode(roomCode)) {
            console.log(`Invalid room code: ${roomCode}`);
            socket.emit('error', { message: 'Mã phòng không hợp lệ! Vui lòng nhập đúng 6 ký tự.' });
            return;
        }
        
        const room = rooms.get(roomCode);
        if (!room) {
            console.log(`Room not found: ${roomCode}`);
            socket.emit('error', { message: 'Phòng không tồn tại! Vui lòng kiểm tra lại mã phòng.' });
            return;
        }
        
        if (room.status !== 'waiting') {
            console.log(`Room already started: ${roomCode}, status: ${room.status}`);
            socket.emit('error', { message: 'Phòng đã bắt đầu! Vui lòng tạo phòng mới.' });
            return;
        }
        
        if (room.players.size >= 2) {
            console.log(`Room full: ${roomCode}`);
            socket.emit('error', { message: 'Phòng đã đầy! Vui lòng tạo phòng mới.' });
            return;
        }
        
        // Check if player already in room
        if (room.players.has(socket.id)) {
            console.log(`Player already in room: ${socket.id}`);
            socket.emit('roomJoined', { roomCode, playerId: socket.id });
            return;
        }
        
        // Add player to room
        room.players.set(socket.id, { name: 'Người chơi 2', side: null });
        players.set(socket.id, { roomCode, isHost: false });
        
        socket.join(roomCode);
        socket.emit('roomJoined', { roomCode, playerId: socket.id });
        console.log(`Player ${socket.id} joined room ${roomCode}`);
        
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
    socket.on('coinFlipResult', ({ roomCode, result, playerId }) => {
        const room = rooms.get(roomCode);
        if (!room || room.status !== 'choosingSides') return;
        
        // Only host can flip coin
        if (socket.id !== room.host) {
            socket.emit('error', { message: 'Chỉ Player 1 mới được tung đồng xu!' });
            return;
        }
        
        // Store coin result
        room.coinResult = result;
        
        // Random who gets to choose (50% chance for each player)
        const playerIds = Array.from(room.players.keys());
        const hostId = room.host;
        const guestId = playerIds.find(id => id !== hostId);
        const whoChooses = Math.random() < 0.5 ? hostId : guestId;
        room.whoChoosesSide = whoChooses;
        
        // Player 1 sees the result (heads = horse, tails = empty)
        // Player 2 sees the opposite (if Player 1 sees heads, Player 2 sees tails)
        // Send different views to each player
        socket.emit('coinFlipCompleted', { 
            result, 
            playerView: result,
            whoChooses: whoChooses === hostId ? 'player1' : 'player2',
            canChoose: socket.id === whoChooses
        }); // Player 1 sees result
        
        socket.to(roomCode).emit('coinFlipCompleted', { 
            result, 
            playerView: result === 'heads' ? 'tails' : 'heads', // Player 2 sees opposite
            whoChooses: whoChooses === hostId ? 'player1' : 'player2',
            canChoose: guestId === whoChooses
        });
        
        console.log(`Coin flipped in room: ${roomCode}, Player 1 sees: ${result}, Player 2 sees: ${result === 'heads' ? 'tails' : 'heads'}, Who chooses: ${whoChooses === hostId ? 'Player 1' : 'Player 2'}`);
    });
    
    // Player chooses side after seeing coin result (can be Player 1 or Player 2)
    socket.on('playerChooseSide', ({ roomCode, chosenSide, coinResult }) => {
        const room = rooms.get(roomCode);
        if (!room || room.status !== 'choosingSides') return;
        
        // Check if this player is allowed to choose
        if (socket.id !== room.whoChoosesSide) {
            socket.emit('error', { message: 'Bạn không được chọn bên!' });
            return;
        }
        
        const playerIds = Array.from(room.players.keys());
        const chooserId = socket.id;
        const otherId = playerIds.find(id => id !== chooserId);
        
        // Assign sides based on chooser's choice
        room.players.get(chooserId).side = chosenSide;
        room.players.get(otherId).side = chosenSide === 'chess' ? 'xiangqi' : 'chess';
        
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
        console.log(`Sides assigned in room: ${roomCode}, ${chooserId === room.host ? 'Player 1' : 'Player 2'} chose: ${chosenSide}`);
    });
    
    // Dice roll result (choose first turn) - both players roll 1 dice each (1-6)
    socket.on('diceRollResult', ({ roomCode, diceResult }) => {
        const room = rooms.get(roomCode);
        if (!room || room.status !== 'choosingFirstTurn') return;
        
        // Store dice result (chỉ 1 kết quả từ 1-6)
        if (!room.diceResults) room.diceResults = {};
        room.diceResults[socket.id] = { 
            diceResult: diceResult, 
            playerName: room.players.get(socket.id).name 
        };
        
        // Broadcast dice result to all players
        io.to(roomCode).emit('diceRolled', {
            playerId: socket.id,
            playerName: room.players.get(socket.id).name,
            diceResult: diceResult
        });
        
        // Check if both players have rolled
        if (Object.keys(room.diceResults).length === 2) {
            const playerIds = Array.from(room.players.keys());
            const results = [
                { id: playerIds[0], ...room.diceResults[playerIds[0]] },
                { id: playerIds[1], ...room.diceResults[playerIds[1]] }
            ];
            
            const player1Result = results[0].diceResult;
            const player2Result = results[1].diceResult;
            
            // Player with higher dice result goes first
            let firstTurn;
            let winnerId;
            
            if (player1Result > player2Result) {
                winnerId = results[0].id;
                firstTurn = room.players.get(results[0].id).side;
            } else if (player2Result > player1Result) {
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
                diceResults: {
                    player1: { diceResult: player1Result, playerName: results[0].playerName },
                    player2: { diceResult: player2Result, playerName: results[1].playerName }
                },
                firstTurnPlayer: room.players.get(winnerId).name
            });
            
            console.log(`Game started in room: ${roomCode}, Player 1: ${player1Result}, Player 2: ${player2Result}, first turn: ${firstTurn}`);
        }
    });
    
    // Chat message handler
    socket.on('chatMessage', ({ roomCode, message }) => {
        const room = rooms.get(roomCode);
        if (!room) return;
        
        const playerData = room.players.get(socket.id);
        if (!playerData) return;
        
        // Broadcast message to all players in room
        io.to(roomCode).emit('chatMessage', {
            playerId: socket.id,
            playerName: playerData.name,
            message: message,
            timestamp: Date.now()
        });
        
        console.log(`Chat message in room ${roomCode} from ${playerData.name}: ${message}`);
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

