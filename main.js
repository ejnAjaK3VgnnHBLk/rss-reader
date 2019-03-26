const {app, BrowserWindow} = require('electron')
let window

function createWindow () {
  // Create the browser window.
  window = new BrowserWindow({width: 1000,height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })
  window.loadFile('index.html')
  window.on('closed', function () {
    window = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
