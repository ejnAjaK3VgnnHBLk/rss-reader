const {app, BrowserWindow, Menu} = require('electron')
let window
//delet if non wokr
const template = [
  {
    label: 'Go home',
    click() {
      window.loadURL(`file://${__dirname}/src/index.html`)
    }
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

//ree

function createWindow () {
  // Create the browser window.
  window = new BrowserWindow({width: 1000,height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })
  window.loadFile('./src/index.html')
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
