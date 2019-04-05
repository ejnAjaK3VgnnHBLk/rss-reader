const {app, BrowserWindow, Menu} = require('electron')
const url = require('url');
const path = require('path');
let window
//delet if non wokr
const template = [
  {
    label: 'Go home',
    click() {
      window.loadURL(`file://${__dirname}/src/index.html`)
    }
  },
  /*{
    label: 'Dev tools',
    click() {
      window.webContents.openDevTools();
    }
  }*/
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

//ree

function createWindow () {
  // Create the browser window.
  window = new BrowserWindow({width: 1150,height: 900,
    webPreferences: {
      nodeIntegration: true
    }
  })
  window.loadFile(`./src/index.html`)
  window.loadURL(url.format ({
    pathname: path.join(__dirname, `./src/index.html`),
    protocol: 'file',
    slashes: true
  }))
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
