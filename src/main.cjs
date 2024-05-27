const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile(path.join(__dirname, 'index.html'));
});

ipcMain.on('command-from-frontend', (event, arg) => {
  console.log('Command received from frontend:', arg);
  event.reply('command-response', 'Command processed successfully');
});
