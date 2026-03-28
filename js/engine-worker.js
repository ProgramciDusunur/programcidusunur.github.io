// =============================================================================
// Engine Worker — Loads Potential WASM from CDN (GitHub Potential-WASM@dist)
// Communication: SharedArrayBuffer STDIN bridge (Atomics.wait/notify)
// =============================================================================
let sabView;

const ENGINE_REPO = 'ProgramciDusunur/Potential-WASM';
const ENGINE_BRANCH = 'dist';
const CDN_BASE = `https://cdn.jsdelivr.net/gh/${ENGINE_REPO}@${ENGINE_BRANCH}`;

self.onmessage = function(e) {
    if (e.data.type === 'init') {
        console.log('[Worker] Initialization started');
        const sab = e.data.sab;
        sabView = new Int32Array(sab);

        console.log('[Worker] Fetching potential.js from CDN...');
        // Load the engine JS from jsDelivr CDN
        importScripts(`${CDN_BASE}/potential.js`);
        console.log('[Worker] potential.js loaded');

        // Emscripten Module Setup
        self.Module = {
            locateFile: (path) => {
                if (path.endsWith('.wasm')) return `${CDN_BASE}/potential.wasm`;
                return path;
            },
            print: (text) => self.postMessage({ type: 'stdout', msg: text }),
            printErr: (text) => self.postMessage({ type: 'stderr', msg: text }),
            onRuntimeInitialized: () => self.postMessage({ type: 'ready' }),
            stdin: () => {
                // SharedArrayBuffer STDIN bridge
                let r = Atomics.load(sabView, 1);
                let w = Atomics.load(sabView, 0);

                while (r >= w) {
                    Atomics.wait(sabView, 0, w);
                    w = Atomics.load(sabView, 0);
                }

                let char = sabView[2 + (r % 1000)];
                Atomics.store(sabView, 1, r + 1);
                return char;
            }
        };

        // Initialize the Emscripten factory
        PotentialEngine(self.Module).then(m => {
            self.postMessage({ type: 'stdout', msg: 'Potential Engine (CDN) Initialized.' });
        });
    }
};
