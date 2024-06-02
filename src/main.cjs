const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');
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

  const engine = spawn(`src/engines/torch`);

  engine.stdout.on('data', (data) => {
    console.log(data.toString());
    win.webContents.send('mainchannel', data.toString());
  });

  ipcMain.on('mainchannel', (event, message) => {
    console.log(message);
    engine.stdin.write(message);
  });
});
