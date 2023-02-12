
const {app, BrowserWindow, ipcMain} = require('electron') 
const path = require('path') 
const url = require('url')

let win = null
app.allowRendererProcessReuse = true
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

app.once('ready', () => {
  win = new BrowserWindow({
    width: 900,
    height: 600,
    show: false,
    // frame: false,
    webPreferences: {
      sandbox: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false,
      devTools: true,
      contextIsolation: true,
      enableRemoteModule: true,
      webviewTag: true,
      preload: path.join(__dirname, "ui-interface.js"), 
    }
  })
  
  win.setMenuBarVisibility(false)
  win.center()
  // win.maximize()
  win.loadFile(path.join(__dirname, 'ui/main.html'))
  win.webContents.openDevTools();  
  // win.setAlwaysOnTop(true, 'screen');

  win.once('ready-to-show', () => {
    win.show()
  })
})


/**
 * General interface.
 */

ipcMain.on('quit-application', (ev, param) => {
  if (process.platform !== 'darwin')
    app.quit()
})

ipcMain.on('restart-application', (ev, param) => {
  win.reload()
})

ipcMain.on('open-dev-tools', (ev, param) => {
  win.webContents.openDevTools()
})


