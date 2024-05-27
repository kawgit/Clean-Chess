const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  sendCommand: (command) => ipcRenderer.send('command-from-frontend', command),
  onCommandResponse: (callback) =>
    ipcRenderer.on('command-response', (event, response) => callback(response)),
});
