'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        title: app.getName(),
        webPreferences: {
            nodeIntegration: false
        }
    });

    mainWindow.loadURL('https://habitica.com/#/tasks');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

// Quit when all windows are closed, except on OS X
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// On OS X, recreate app window if dock icon is clicked and no windows are open
app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
});
