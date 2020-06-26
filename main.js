const { app, BrowserWindow } = require('electron')
var path = require('path')
function createWindow () {
  // Cria uma janela de navegação.
  
  let win = new BrowserWindow({
    title:"Robô Rocket v1.0",
    width: 1196,
    height: 659,
    minWidth: 1196,
    minHeight: 679,
    maxWidth: 1196,
    maxHeight: 679,
    maximizable: false,
    center:true,
    icon: path.join(__dirname, 'assets/icons/win/1024x1024.ico'),
    webPreferences: {
      nodeIntegration: true
    }
    
  })

  // e carregar o index.html do aplicativo.
  win.loadFile('login.html')
}

app.whenReady().then(createWindow)