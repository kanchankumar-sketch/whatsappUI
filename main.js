const { app, BrowserWindow ,Menu} = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1500,
    height: 600,
  })
  //win.webContents.openDevTools();
  win.loadFile('index.html')
}
Menu.setApplicationMenu(null)
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
