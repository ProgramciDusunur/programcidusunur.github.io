console.log('[Potential.js] Script loading...');
document.addEventListener('DOMContentLoaded', () => {
    console.log('[Potential.js] DOMContentLoaded fired, creating GameManager');
    const manager = new ChessGameManager();
    console.log('[Potential.js] GameManager instance created');
    let board = null;
    let pvBoard = null;
    let lastPvFen = null; // Track to avoid redundant re-renders

    // UI Elements
    const evalFill = document.getElementById('eval-fill');
    const evalText = document.getElementById('eval-text');
    const historyList = document.getElementById('move-history');
    
    // Clocks
    const whiteClock = document.getElementById('white-clock');
    const blackClock = document.getElementById('black-clock');
    const thinkingIndicator = document.getElementById('engine-thinking');
    
    // Settings (Verified in HTML)
    const btnNewGame = document.getElementById('btn-new-game');
    const btnUndo = document.getElementById('btn-undo');
    const tcButtons = document.querySelectorAll('.tc-btn');
    
    // Modal
    const statusModal = document.getElementById('status-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const btnModalNewGame = document.getElementById('btn-modal-new-game');
    const btnModalClose = document.getElementById('btn-modal-close');

    let currentTimeControl = { time: 3, inc: 2 };

    // Initialize Board
    const config = {
        pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
        position: 'start',
        draggable: true,
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    };
    
    try {
        board = Chessboard('board', config);
    } catch (e) {
        console.error("Chessboard init error:", e);
    }

    // PV Mini Board (non-interactive)
    const pvMoveList = document.getElementById('pv-move-list');
    const pvConfig = {
        pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
        position: 'start',
        draggable: false,
        showNotation: false
    };
    try {
        pvBoard = Chessboard('pv-board', pvConfig);
    } catch (e) {
        console.error("PV Board init error:", e);
    }

    window.addEventListener('resize', () => {
        if (board) board.resize();
        if (pvBoard) pvBoard.resize();
    });

    // GameManager Callbacks
    manager.callbacks.onUpdate = (fen, history) => {
        if (board) board.position(fen, true); // Use true for smooth move animations
        renderHistory(history);
        
        // Hide thinking indicator when move received
        if (thinkingIndicator) thinkingIndicator.classList.add('hidden');

        // Reset PV board on new game (empty history)
        if (history.length === 0) {
            lastPvFen = null;
            if (pvBoard) pvBoard.position('start', false);
            if (pvMoveList) pvMoveList.innerHTML = '';
        }
    };

    manager.callbacks.onEngineMove = (from, to) => {
        // This is called just before onUpdate, we can use it for animations if we didn't use onUpdate
        // But since onUpdate jumps, let's make onUpdate NOT jump if it was an engine move?
        // Actually, we'll just let onUpdate handle it for now, but update the thinking indicator here.
    };
    manager.callbacks.onEvaluation = (evalObj) => {
        const cappedCp = evalObj.type === 'cp' ? Math.max(-10, Math.min(10, evalObj.value)) : (evalObj.raw > 0 ? 10 : -10);
        const heightPercent = 50 + (cappedCp / 10) * 50;
        evalFill.style.height = `${Math.max(0, Math.min(100, heightPercent))}%`;

        if (evalObj.type === 'cp') {
            let cp = evalObj.value;
            let textScore = cp.toFixed(1);
            if (cp > 0) textScore = '+' + textScore;
            evalText.textContent = textScore;
        } else if (evalObj.type === 'mate') {
            evalText.textContent = evalObj.value;
        }

        // Typographically clean positioning: top for white (+), bottom for black (-)
        if (cappedCp >= 0) {
            evalText.classList.remove('at-bottom');
            evalText.classList.add('at-top');
        } else {
            evalText.classList.remove('at-top');
            evalText.classList.add('at-bottom');
        }
    };

    manager.callbacks.onTimerTick = (wMs, bMs, turn) => {
        whiteClock.textContent = formatTime(wMs);
        blackClock.textContent = formatTime(bMs);

        // Active State
        whiteClock.classList.toggle('active', turn === 'w');
        blackClock.classList.toggle('active', turn === 'b');

        // Low Time Pulse (under 10s)
        whiteClock.classList.toggle('low-time', wMs < 10000);
        blackClock.classList.toggle('low-time', bMs < 10000);
    };

    manager.callbacks.onGameOver = (status, winner) => {
        statusModal.classList.remove('hidden');
        if (status === 'checkmate') {
            modalTitle.textContent = 'Checkmate!';
            modalDesc.textContent = `${winner} wins!`;
        } else if (status === 'timeout') {
            modalTitle.textContent = 'Time Out!';
            modalDesc.textContent = `${winner} wins!`;
        } else {
            modalTitle.textContent = 'Draw';
            modalDesc.textContent = `Game ended in a draw (${status}).`;
        }
    };

    // PV Update — simulate engine's best line on a temp board
    manager.callbacks.onPVUpdate = (pvString, currentFen) => {
        if (!pvBoard) return;

        const tempGame = new Chess();
        tempGame.load(currentFen);

        const moves = pvString.split(' ');
        const sanMoves = [];

        for (const uciMove of moves) {
            const from = uciMove.substring(0, 2);
            const to = uciMove.substring(2, 4);
            const promotion = uciMove.length > 4 ? uciMove[4] : undefined;

            const result = tempGame.move({ from, to, promotion });
            if (!result) break; // Stop on first invalid move
            sanMoves.push(result.san);
        }

        // Avoid redundant re-renders
        const newFen = tempGame.fen();
        if (newFen === lastPvFen) return;
        lastPvFen = newFen;

        pvBoard.position(newFen, false);

        // Render PV move text
        if (pvMoveList) {
            let html = '';
            for (let i = 0; i < sanMoves.length; i += 2) {
                const num = Math.floor(i / 2) + 1;
                html += `<span class="pv-move-num">${num}.</span>`;
                html += `<span class="pv-move">${sanMoves[i]}</span>`;
                if (sanMoves[i + 1]) {
                    html += `<span class="pv-move">${sanMoves[i + 1]}</span>`;
                }
            }
            pvMoveList.innerHTML = html;
        }
    };

    function formatTime(ms) {
        if (ms <= 0) return "00:00.0";
        const totalSeconds = ms / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        
        if (totalSeconds < 10) {
            const decis = Math.floor((ms % 1000) / 100);
            return `00:0${seconds}.${decis}`;
        }
        
        const padS = seconds.toString().padStart(2, '0');
        const padM = minutes.toString().padStart(2, '0');
        return `${padM}:${padS}`;
    }

    // Board Callbacks
    function onDragStart (source, piece) {
        // Block all interaction until "New Game" is clicked
        if (!manager.isGameStarted) return false;
        if (manager.isGameOver || manager.game.game_over()) return false;
        if (manager.isEngineThinking) return false; // Don't move while engine is thinking
        if ((manager.playerColor === 'w' && piece.search(/^b/) !== -1) ||
            (manager.playerColor === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    }

    function onDrop (source, target) {
        const result = manager.makeUserMove(source, target);
        if (result === 'snapback') return 'snapback';
        
        // Show thinking indicator if it's engine's turn
        if (thinkingIndicator) thinkingIndicator.classList.remove('hidden');
    }

    function onSnapEnd () {
        board.position(manager.game.fen());
    }

    function renderHistory(history) {
        historyList.innerHTML = '';
        let html = '';
        for (let i = 0; i < history.length; i += 2) {
            const moveNum = Math.floor(i / 2) + 1;
            html += `<span class="history-index">${moveNum}.</span>`;
            html += `<span class="history-move">${history[i]}</span>`;
            html += `<span class="history-move">${history[i+1] || ''}</span>`;
        }
        historyList.innerHTML = html;
        historyList.scrollTop = historyList.scrollHeight;
    }

    // Listeners
    tcButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tcButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTimeControl.time = parseInt(btn.dataset.time);
            currentTimeControl.inc = parseInt(btn.dataset.inc);
        });
    });


    if (btnNewGame) {
        btnNewGame.addEventListener('click', () => {
            manager.startNewGame(currentTimeControl.time * 60, currentTimeControl.inc);
        });
    }

    if (btnUndo) {
        btnUndo.addEventListener('click', () => {
            manager.undoMove();
        });
    }

    if (btnModalNewGame) {
        btnModalNewGame.addEventListener('click', () => {
            statusModal.classList.add('hidden');
            manager.startNewGame(currentTimeControl.time * 60, currentTimeControl.inc);
        });
    }
    
    if (btnModalClose) {
        btnModalClose.addEventListener('click', () => {
            statusModal.classList.add('hidden');
        });
    }
});
