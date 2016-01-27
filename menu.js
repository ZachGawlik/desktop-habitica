'use strict';

const electron = require('electron');
const app = electron.app;
const shell = electron.shell;

const appName = app.getName();

const macTemplate = [
    {
        label: appName,
        submenu: [
            {
                label: `About ${appName}`,
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                label: 'Services',
                role: 'services',
                submenu: []
            },
            {
                type: 'separator'
            },
            {
                label: `Hide ${appName}`,
                accelerator: 'Cmd+H',
                role: 'hide'
            },
            {
                label: 'Hide Others',
                accelerator: 'Cmd+Shift+H',
                role: 'hideothers'
            },
            {
                label: 'Show All',
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                label: `Quit ${appName}`,
                accelerator: 'Cmd+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectall'
            }
        ]
    },
    {
        label: 'Window',
        role: 'window',
        submenu: [
            {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            },
            {
                type: 'separator'
            },
            {
                label: 'Bring All to Front',
                role: 'front'
            }
        ]
    },
    {
        label: 'Help',
        role: 'help',
        submenu: [
            {
                label: `Habitica Website...`,
                click() {
                    shell.openExternal('https://habitica.com/');
                }
            }
        ]
    }
];

if (process.platform === 'darwin') {
    module.exports = electron.Menu.buildFromTemplate(macTemplate);
} else {
    module.exports = {}
}
