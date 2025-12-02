const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            // preload: path.join(__dirname, 'preload.js'), // Optional: Add if needed later
        },
        backgroundColor: '#000000',
        titleBarStyle: 'hidden', // Makes it look more like a native app (Mac style, but works on Win)
        titleBarOverlay: {
            color: '#000000',
            symbolColor: '#ffffff',
        },
    });

    // Load the local Next.js server
    // In production, this would point to the Vercel URL or a static file
    const startUrl = process.env.ELECTRON_START_URL || 'http://localhost:3000';
    mainWindow.loadURL(startUrl);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // ---------------------------------------------------------------------------
    // CRITICAL: AD BLOCKER LOGIC
    // ---------------------------------------------------------------------------
    // This handler is called whenever the page (or an iframe inside it) tries
    // to open a new window (popup).
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        // 1. Allow our own internal navigation or specific trusted domains if needed
        // (For now, we assume ANY popup from the player is an ad)

        // 2. Check if the URL is "safe" (e.g., an OAuth login, or a link we explicitly want)
        // If it's a known ad provider or just a random popup from vidsrc, BLOCK IT.

        console.log('Blocked Popup:', url);

        // ACTION: DENY ALL POPUPS
        // This effectively kills the "click to play" ads.
        return { action: 'deny' };
    });

    // Also block navigation within the iframe itself if it tries to redirect the whole page
    mainWindow.webContents.on('will-navigate', (event, url) => {
        const currentUrl = mainWindow.webContents.getURL();
        const urlObj = new URL(url);

        // If we are on localhost and the new URL is NOT localhost, it might be a hijack
        if (currentUrl.includes('localhost') && !url.includes('localhost')) {
            // Allow legitimate external links if the USER clicked them (hard to distinguish)
            // But for now, let's be strict or just log it.
            // event.preventDefault(); 
        }
    });
    // ---------------------------------------------------------------------------

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
