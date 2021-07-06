// Modules to control application life and create native browser window
const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')
const config = require('./config');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: '#303030',
    icon: './icon.png',
    width: 800,
    height: 600,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadURL(config.url)
};

const toggleDevTools = () => mainWindow.webContents.toggleDevTools();

const createShortCuts = () => globalShortcut.register('CmdOrCtrl+J', toggleDevTools);

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}).then(() => createShortCuts());

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
