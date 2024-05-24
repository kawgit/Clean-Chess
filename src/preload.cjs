const { contextBridge, ipcRenderer } = require('electron');

let currentCallback = (message) => {};

ipcRenderer.on('mainchannel', (event, response) => {
  currentCallback(response);
});

contextBridge.exposeInMainWorld('api', {
  send: (message) => {
    ipcRenderer.send('mainchannel', message);
  },
  setCallback: (callback) => {
    currentCallback = callback;
  },
});
