'use strict';

const fs = require('fs');
const path = require('path');
const electron = require('electron');
const appMenu = require('./menu');
const storage = require('./storage');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
    const lastWindowBounds = storage.get('lastWindowBounds') || {width: 1000, height: 800};

    mainWindow = new BrowserWindow({
        title: app.getName(),
        x: lastWindowBounds.x,
        y: lastWindowBounds.y,
        width: lastWindowBounds.width,
        height: lastWindowBounds.height,
        minWidth: 500,
        minHeight: 300,
        webPreferences: {
            nodeIntegration: false
        }
    });

    mainWindow.loadURL('https://habitica.com/#/tasks');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0
}

app.on('ready', () => {
    if (!isEmptyObject(appMenu)) {
        electron.Menu.setApplicationMenu(appMenu);
    }

    createWindow();

    const page = mainWindow.webContents;
    page.on('dom-ready', () => {
        page.insertCSS(
            fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'));
    })
});

// Quit when all windows are closed, except on OS X
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    storage.set('lastWindowBounds', mainWindow.getBounds())
});

// On OS X, recreate app window if dock icon is clicked and no windows are open
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
