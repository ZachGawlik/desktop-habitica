'use strict';

const electron = require('electron');
const appMenu = require('./menu');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        title: app.getName(),
        width: 1000,
        height: 800,
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
});

// Quit when all windows are closed, except on OS X
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// On OS X, recreate app window if dock icon is clicked and no windows are open
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
