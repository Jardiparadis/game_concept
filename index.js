const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow (width, height) {
  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true
    }
  });
  return win.loadFile('index.html');
}

fs.readFile(path.join(__dirname, 'config.json'), (err, data) => {
  const appConfig = JSON.parse(data.toString());
  ipcMain.on('screen-size', (event) => {
    event.sender.send('screen-size', [appConfig.width, appConfig.height]);
  });
  app.whenReady().then(() => {
    createWindow(appConfig.width, appConfig.height)
      .catch(() => {
        //handle error
      });
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
