const { ipcRenderer, contextBridge } = require('electron');

const state = { test: 'hello world' };
contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send('notify', message);
    },
  },
  batteryApi: {},
  filesApi: {
    openFile(key, value) {
      state[key] = value;
    },
  },
  get(key) {
    return state[key];
  },
});
