/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const preload = require('electron-reload');
const {
  BrowserWindow,
  app,
  ipcMain,
  Notification,
} = require('electron');

const isDev = !app.isPackaged;

if (isDev) {
  preload(__dirname, {
    electron: path.join(
      __dirname,
      'node_modules',
      '.bin',
      'electron',
    ),
  });
}

async function createWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  await window.loadFile('./index.html');
}

ipcMain.on('notify', (event, message) => {
  new Notification({ title: 'Notification', body: message }).show();
});

app.whenReady().then(createWindow);
