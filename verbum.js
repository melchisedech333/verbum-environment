
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
    frame: false,
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


/**
 * Native App interface.
 */

ipcMain.on('native-app-start', (ev, settings) => {
  var command =  __dirname +'/ui/native-app/container/start-container.sh "'+ 
    settings.resolution +'" "'+ settings.id +'" "'+ settings.program +'" "'+ settings.rfbport +'"'
  var program = __dirname +'/ui/native-app/container/start-container.sh'
  var parameters = []
  
  parameters.push(settings.resolution)
  parameters.push(settings.id)
  parameters.push(settings.program)
  parameters.push(settings.rfbport)

  console.log('directory:', directory)
  console.log(JSON.stringify(param))

  var child = require('child_process').execFile;

  child(program, parameters, function(err, data) {
    console.log(err)
    console.log(data.toString());
  });
})


