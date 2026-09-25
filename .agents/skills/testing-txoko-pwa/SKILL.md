---
name: testing-txoko-pwa
description: Run Txoko's local demo and verify PWA installation, subfolder deployment and offline behavior in Chrome.
---

# Txoko PWA runtime testing

## Devin Secrets Needed
None for the current local demo; it uses Zustand/localforage, not a remote authenticated backend.

## Environment
- Run commands from the repository root using `source ~/.nvm/nvm.sh && nvm use --lts` (Node 24 verified).
- Install dependencies with the repository lockfile, then `npm run dev -- --host 0.0.0.0 --port 5173`.
- PWA registration is production-only: `npm run build`, then `npm run preview -- --port 4173`.
- To test subfolders without modifying sources, copy `dist/` to a temporary directory ending in `hosting/txoko/`, then `python3 -m http.server 8080 --bind 127.0.0.1 --directory /absolute/path/to/hosting`. Browse `/txoko/`.
- Localhost is a secure context for service workers; remote hosting requires HTTPS.

## UI routes
- Navigation tabs are Tablón / Calendario / Mi Txoko; the header language selector switches Castellano/Euskara.
- Arqueo rápido generates a `wa.me` link from Comensales and newline-separated Faltas de despensa. Check the decoded summary and WhatsApp preview without sending a message.
- Calendar uses the current month and seeded dates; check the seed's actual dates before expecting a satellite event to be visible. Do not inject events and claim they came from the demo.

## PWA checks
- Inspect Application > Manifest and Service Workers, plus Chrome's `Page.getInstallabilityErrors` diagnostics. Verify real icon dimensions and resolved start URL/scope.
- A new worker target may be paused by browser automation infrastructure. If it stays “trying to install” with no executing state, inspect its CDP target and issue `Runtime.runIfWaitingForDebugger` before attributing the blockage to app code.
- Keep cold-cache and warm-cache offline results separate. First visit + activated worker does not guarantee a cached shell.
- DevTools Offline may not remain effective across address-bar navigations in automated environments. Confirm using server logs, or stop only your temporary static server and reload to prove the app cannot fetch from the origin.
- Check both the visited directory URL and an unvisited `index.html` URL. A cached `/txoko/` response does not establish that the index fallback exists.
- When index.html itself is precached, also navigate to an uncached query URL such as `/txoko/?offline=fallback` with the server stopped to exercise navigation fallback rather than an exact cache hit.
- Verify build invalidation with two real builds: create B in a temporary copy of the source, add a clearly labeled visible marker to change the JS hash, and replace the served directory so A's old JS no longer exists. After B activates, check only B's cache remains and both online/offline reloads use B's hashed JS. Do not alter the shared source checkout.
- Restore network/server state after tests. Treat browser-generated `/favicon.ico` and DevTools metadata 404s separately from app asset/manifest failures.
