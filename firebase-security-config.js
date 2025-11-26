/**
 * Firebase Security Configuration
 * File này chứa các hàm validation và security helpers
 */

// Validation functions
const SecurityValidators = {
    /**
     * Validate room code format
     */
    isValidRoomCode(code) {
        return typeof code === 'string' && 
               code.length === 6 && 
               /^[A-Z0-9]+$/.test(code);
    },

    /**
     * Validate player move
     */
    isValidMove(move, currentTurn, playerSide) {
        if (!move || !move.from || !move.to) return false;
        if (currentTurn !== playerSide) return false;
        
        const { from, to } = move;
        return from.r >= 0 && from.r < 10 &&
               from.c >= 0 && from.c < 9 &&
               to.r >= 0 && to.r < 10 &&
               to.c >= 0 && to.c < 9;
    },

    /**
     * Validate game state
     */
    isValidGameState(state) {
        if (!state || typeof state !== 'object') return false;
        
        const required = ['pieces', 'deadChess', 'deadXQ', 'currentTurn', 'isGameOver'];
        return required.every(key => state.hasOwnProperty(key)) &&
               Array.isArray(state.pieces) &&
               Array.isArray(state.deadChess) &&
               Array.isArray(state.deadXQ) &&
               (state.currentTurn === 'chess' || state.currentTurn === 'xiangqi') &&
               typeof state.isGameOver === 'boolean';
    },

    /**
     * Sanitize player name
     */
    sanitizePlayerName(name) {
        if (typeof name !== 'string') return 'Player';
        const sanitized = name.trim().substring(0, 50);
        return sanitized || 'Player';
    },

    /**
     * Validate piece data
     */
    isValidPiece(piece) {
        if (!piece || typeof piece !== 'object') return false;
        
        return piece.hasOwnProperty('type') &&
               piece.hasOwnProperty('side') &&
               piece.hasOwnProperty('r') &&
               piece.hasOwnProperty('c') &&
               piece.r >= 0 && piece.r < 10 &&
               piece.c >= 0 && piece.c < 9 &&
               (piece.side === 'chess' || piece.side === 'xiangqi');
    }
};

// Rate limiting helper
const RateLimiter = {
    moveTimestamps: new Map(),
    
    /**
     * Check if move is allowed (prevent spam)
     */
    canMakeMove(playerId) {
        const now = Date.now();
        const lastMove = this.moveTimestamps.get(playerId) || 0;
        const minInterval = 100; // Minimum 100ms between moves
        
        if (now - lastMove < minInterval) {
            return false;
        }
        
        this.moveTimestamps.set(playerId, now);
        return true;
    },
    
    /**
     * Clear old timestamps
     */
    cleanup() {
        const now = Date.now();
        const maxAge = 60000; // 1 minute
        
        for (const [playerId, timestamp] of this.moveTimestamps.entries()) {
            if (now - timestamp > maxAge) {
                this.moveTimestamps.delete(playerId);
            }
        }
    }
};

// Cleanup old timestamps every minute
setInterval(() => RateLimiter.cleanup(), 60000);

// Export for use in HTML
if (typeof window !== 'undefined') {
    window.SecurityValidators = SecurityValidators;
    window.RateLimiter = RateLimiter;
}

