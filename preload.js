const { ipcRenderer, contextBridge } = require('electron');
const fs = require('fs');

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send('notify', message);
    },
  },
  batteryApi: {},
  filesApi: {
    openFile(path) {
      try {
        const data = fs.readFileSync(path, 'utf8');
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    },
  },
});
