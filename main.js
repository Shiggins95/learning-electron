/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const express = require('express');
const preload = require('electron-reload');
const {
  BrowserWindow,
  app,
  ipcMain,
  ipcRenderer,
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
      nativeWindowOpen: false,
    },
  });

  await window.loadFile('./index.html');

  window.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('about:blank')) {
      return { action: 'allow' };
    }
    return { action: 'deny' };
  });

  window.webContents.on('did-create-window', (childWindow) => {
    childWindow.on('closed', () => {});
  });
  ipcMain.on('test', () => 'test');
}

app.whenReady().then(createWindow);
