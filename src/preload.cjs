const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  send: (message) => {
    ipcRenderer.send('mainchannel', message);
  },
  onrecieve: (callback) => {
    ipcRenderer.on('mainchannel', (event, response) => callback(response));
  },
});
