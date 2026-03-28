console.log('[GameManager] Script loading...');
console.log('GameManager.js loading...');
// Singleton GameManager to wrap chess.js and Stockfish Worker
class ChessGameManager {
    constructor() {
        console.log('[GameManager] Constructor started');
        if (ChessGameManager.instance) {
            console.log('[GameManager] Returning existing instance');
            return ChessGameManager.instance;
        }
        
        console.log('[GameManager] Initializing game state...');
        this.game = new Chess();
        this.engine = null;
        this.isEngineReady = false;
        this.isEngineThinking = false;
        
        this.playerColor = 'w';

        // Timer State
        this.whiteTime = 600000; // 10 minutes in ms
        this.blackTime = 600000;
        this.increment = 0;
        this.timerInterval = null;
        this.isGameOver = false;
        this.isGameStarted = false;

        // Time history for undo support — stores {whiteTime, blackTime} before each ply
        this.timeHistory = [];

        this.callbacks = {
            onUpdate: null,
            onGameOver: null,
            onEngineMove: null,
            onEvaluation: null,
            onTimerTick: null,
            onPVUpdate: null
        };

        if (typeof SharedArrayBuffer === 'undefined') {
            console.error('[GameManager] SharedArrayBuffer is NOT available. This page is not cross-origin isolated!');
            this.sab = null;
            this.sabView = null;
            ChessGameManager.instance = this;
            return;
        }

        console.log('[GameManager] SharedArrayBuffer is available. Initializing engine...');
        this.sab = new SharedArrayBuffer(4096);
        this.sabView = new Int32Array(this.sab);
        
        this.initEngine();
        ChessGameManager.instance = this;
    }

    initEngine() {
        console.log('[GameManager] Initializing Worker: js/engine-worker.js');
        try {
            this.engine = new Worker('js/engine-worker.js');
            console.log('[GameManager] Worker instance created');
            this.engine.onmessage = (e) => this.handleEngineMessage(e);
            
            // Initialize Worker with SharedArrayBuffer
            this.engine.postMessage({ 
                type: 'init', 
                sab: this.sab
            });
            console.log('[GameManager] Init message sent to worker');
        } catch (e) {
            console.error("Failed to load Local Potential Engine", e);
        }
    }

    handleEngineMessage(event) {
        if (!event.data) return;
        
        if (event.data.type === 'stdout') {
            console.log("[Potential] " + event.data.msg);
        } else if (event.data.type === 'stderr') {
            console.error("[Potential ERR] " + event.data.msg);
        }

        if (event.data.type !== 'stdout' && event.data.type !== 'ready') return;
        const msg = event.data.type === 'ready' ? 'ready' : event.data.msg;
        
        if (msg === 'ready') {
            this.sendToEngine('uci');
        } else if (msg === 'uciok') {
            this.isEngineReady = true;
            this.sendToEngine('isready');
            // Standard engine options
            this.sendToEngine(`setoption name Threads value 1`);
            this.sendToEngine(`setoption name Hash value 64`);
        } else if (msg.startsWith('bestmove')) {
            const bestMoveStr = msg.split(' ')[1];
            if (bestMoveStr) {
                this.isEngineThinking = false;
                this.executeEngineMove(bestMoveStr);
            }
        } else if (msg.startsWith('info depth')) {
            // Parse evaluation
            const scoreMatch = msg.match(/score cp (-?\d+)/);
            const mateMatch = msg.match(/score mate (-?\d+)/);
            if (scoreMatch) {
                let evalCp = parseInt(scoreMatch[1], 10) / 100;
                if (this.game.turn() === 'b') { evalCp = -evalCp; }
                if (this.callbacks.onEvaluation) this.callbacks.onEvaluation({ type: 'cp', value: evalCp });
            } else if (mateMatch) {
                let mateIn = parseInt(mateMatch[1], 10);
                // Adjust mate score perspective
                let side = this.game.turn();
                let displayMate = side === 'w' ? mateIn : -mateIn;
                const sign = displayMate > 0 ? '+' : '-';
                const mateText = `M${Math.abs(displayMate)}`;
                
                if (this.callbacks.onEvaluation) this.callbacks.onEvaluation({ type: 'mate', value: mateText, raw: displayMate });
            }

            // Extract PV (Principal Variation) moves
            const pvMatch = msg.match(/ pv (.+)/);
            if (pvMatch && this.callbacks.onPVUpdate) {
                this.callbacks.onPVUpdate(pvMatch[1], this.game.fen());
            }
        }
    }


    setPlayerColor(color) {
        this.playerColor = color; // 'w' or 'b'
        if (this.game.history().length === 0) {
           this.checkEngineTurn();
        }
    }

    startNewGame(timeSeconds = 600, incrementSeconds = 0) {
        this.stopTimer();
        this.game.reset();
        this.isGameOver = false;
        this.isGameStarted = true;
        this.whiteTime = timeSeconds * 1000;
        this.blackTime = timeSeconds * 1000;
        this.increment = incrementSeconds * 1000;
        this.timeHistory = [];
        
        this.notifyUpdate();
        this.startTimer();
        this.checkEngineTurn();
    }

    startTimer() {
        if (this.timerInterval || !this.isGameStarted) return;
        this.timerInterval = setInterval(() => {
            if (this.isGameOver) return;
            
            const turn = this.game.turn();
            if (turn === 'w') {
                this.whiteTime -= 100;
                if (this.whiteTime <= 0) {
                    this.whiteTime = 0;
                    this.handleTimeOut('w');
                }
            } else {
                this.blackTime -= 100;
                if (this.blackTime <= 0) {
                    this.blackTime = 0;
                    this.handleTimeOut('b');
                }
            }
            
            if (this.callbacks.onTimerTick) {
                this.callbacks.onTimerTick(this.whiteTime, this.blackTime, turn);
            }
        }, 100);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    handleTimeOut(color) {
        this.stopTimer();
        this.isGameOver = true;
        if (this.callbacks.onGameOver) {
            this.callbacks.onGameOver('timeout', color === 'w' ? 'Black' : 'White');
        }
    }

    // Handles user drop move
    makeUserMove(source, target) {
        if (!this.isGameStarted || this.isGameOver || this.game.turn() !== this.playerColor) return 'snapback';
        
        // Snapshot clock state before the move for undo support
        this.timeHistory.push({ whiteTime: this.whiteTime, blackTime: this.blackTime });

        let move = this.game.move({
            from: source,
            to: target,
            promotion: 'q'
        });

        if (move === null) {
            this.timeHistory.pop(); // Remove snapshot if move was illegal
            return 'snapback';
        }

        // Apply increment
        if (this.playerColor === 'w') this.whiteTime += this.increment;
        else this.blackTime += this.increment;

        this.notifyUpdate();
        if (this.checkGameOver()) return 'valid';

        // Ensure timer is running so engine's clock ticks during calculation
        this.startTimer();
        this.triggerEngine();
        
        return 'valid';
    }

    undoMove() {
        if (!this.isGameStarted || this.isGameOver) return;
        if (this.isEngineThinking) return; // Don't undo while engine is calculating

        this.game.undo(); // Undo engine's move
        if (this.game.turn() !== this.playerColor) {
            this.game.undo(); // Undo player's move too, so it's player's turn again
        }

        // Restore clock state — pop entries matching the number of plies undone
        // We undo 2 plies (player + engine), so pop 2 snapshots
        // But we only pushed a snapshot for player moves, and engine also pushes one
        // Pop until timeHistory length matches game history length
        const targetLength = this.game.history().length;
        while (this.timeHistory.length > targetLength && this.timeHistory.length > 0) {
            const restored = this.timeHistory.pop();
            this.whiteTime = restored.whiteTime;
            this.blackTime = restored.blackTime;
        }

        this.notifyUpdate();

        // Update clock display immediately
        if (this.callbacks.onTimerTick) {
            this.callbacks.onTimerTick(this.whiteTime, this.blackTime, this.game.turn());
        }
    }

    executeEngineMove(bestMoveStr) {
        const source = bestMoveStr.substring(0, 2);
        const target = bestMoveStr.substring(2, 4);
        const promotion = bestMoveStr.length > 4 ? bestMoveStr.substring(4, 5) : undefined;
        
        if (source === '(n' && target === 'on') {
            return;
        }

        // Snapshot clock state before engine's move for undo support
        this.timeHistory.push({ whiteTime: this.whiteTime, blackTime: this.blackTime });

        this.game.move({
            from: source,
            to: target,
            promotion: promotion
        });

        // Apply increment — engine is black, so black gets increment
        if (this.game.turn() === 'w') this.blackTime += this.increment; // It's now white's turn, so black just moved
        else this.whiteTime += this.increment;
        
        this.notifyUpdate();
        this.checkGameOver();
        
        if (this.callbacks.onEngineMove) {
            this.callbacks.onEngineMove(source, target);
        }
    }

    triggerEngine() {
        if (!this.isGameStarted || !this.engine || !this.isEngineReady || this.isGameOver || this.game.game_over()) return;
        
        if (this.game.turn() !== this.playerColor) {
            this.isEngineThinking = true;
            this.sendToEngine('position fen ' + this.game.fen());
            
            // Use time-based search
            const cmd = `go wtime ${this.whiteTime} btime ${this.blackTime} winc ${this.increment} binc ${this.increment}`;
            this.sendToEngine(cmd);
        }
    }

    sendToEngine(command) {
        if (!this.engine || !this.sabView) return;
        
        // Write to SharedArrayBuffer STDIN
        const fullCmd = command + '\n';
        let w = Atomics.load(this.sabView, 0);
        
        for (let i = 0; i < fullCmd.length; i++) {
            this.sabView[2 + (w % 1000)] = fullCmd.charCodeAt(i);
            w++;
        }
        
        Atomics.store(this.sabView, 0, w);
        Atomics.notify(this.sabView, 0, 1);
    }

    checkEngineTurn() {
        if (this.game.turn() !== this.playerColor) {
            this.triggerEngine();
        }
    }

    checkGameOver() {
        if (this.game.game_over()) {
            this.stopTimer();
            this.isGameOver = true;
            let status = 'draw';
            let winner = null;
            
            if (this.game.in_checkmate()) {
                status = 'checkmate';
                winner = this.game.turn() === 'w' ? 'Black' : 'White';
            } else if (this.game.in_stalemate()) {
                status = 'stalemate';
            } else if (this.game.in_threefold_repetition()) {
                status = 'repetition';
            } else if (this.game.insufficient_material()) {
                status = 'material';
            }
            
            if (this.callbacks.onGameOver) {
                this.callbacks.onGameOver(status, winner);
            }
            return true;
        }
        return false;
    }

    notifyUpdate() {
        if (this.callbacks.onUpdate) {
            this.callbacks.onUpdate(this.game.fen(), this.game.history());
        }
    }
}
