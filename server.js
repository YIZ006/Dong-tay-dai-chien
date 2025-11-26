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

// Serve static files
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
        
        // Start game if 2 players
        if (room.players.size === 2) {
            const firstTurn = Math.random() < 0.5 ? 'chess' : 'xiangqi';
            const sides = firstTurn === 'chess' ? ['chess', 'xiangqi'] : ['xiangqi', 'chess'];
            
            let idx = 0;
            room.players.forEach((player, playerId) => {
                player.side = sides[idx++];
            });
            
            room.status = 'playing';
            room.currentTurn = firstTurn;
            
            io.to(roomCode).emit('gameStarted', {
                players: Array.from(room.players.entries()).map(([id, data]) => ({
                    id,
                    name: data.name,
                    side: data.side
                })),
                currentTurn: firstTurn
            });
            
            console.log(`Game started in room: ${roomCode}`);
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
    console.log(`Open index_chess_socketio.html in your browser`);
});

