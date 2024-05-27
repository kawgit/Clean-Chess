const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
app.on('ready', () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      backgroundThrottling: false,
    },
  });

  win.loadFile(path.join(__dirname, 'index.html'));
});

ipcMain.on('mainchannel', (event, arg) => {
  console.log(new Date(), 'Command received from frontend:', arg);
  // event.reply('mainchannel', 'Command processed successfully');
});
