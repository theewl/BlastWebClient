
/*
const { app, BrowserWindow } = require('electron')
 // Keep a global reference of the window object, if you don't, the window will
 // be closed automatically when the JavaScript object is garbage collected.
let win

    function createWindow () {
     // Create the browser window.
     win = new BrowserWindow({ width: 900, height: 600, minWidth:900, icon:"./images/icon.ico",
     webPreferences: {nodeIntegration: true}}) // this allows me to run import js scripts in index

     // Remove  menu
     win.setMenu(null)

     // and load the index.html of the app.
     win.loadFile('index.html')

     // Open the DevTools.
     win.webContents.openDevTools()

     // Emitted when the window is closed.
     win.on('closed', () => {
         // Dereference the window object, usually you would store windows
         // in an array if your app supports multi windows, this is the time
         // when you should delete the corresponding element.
         win = null
     })
 }

 // This method will be called when Electron has finished
 // initialization and is ready to create browser windows.
 // Some APIs can only be used after this event occurs.
 app.on('ready', createWindow)

 // Quit when all windows are closed.
 app.on('window-all-closed', () => {
     // On macOS it is common for applications and their menu bar
     // to stay active until the user quits explicitly with Cmd + Q
     if (process.platform !== 'darwin') {
         app.quit()
     }
 })

 app.on('activate', () => {
     // On macOS it's common to re-create a window in the app when the
     // dock icon is clicked and there are no other windows open.
     if (win === null) {
         createWindow()
     }
 })

 */
//
//
// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and require them here.
// //const conn = require('./db_connection.js');
// //var PythonShell = require('python-shell');



const {app,BrowserWindow,ipcMain}=require('electron')
const path=require('path')
const url=require('url')


let win
let child

function createWindows() 
{

    win =new BrowserWindow({minHeight:900, minWidth:900, webPreferences: {nodeIntegration: true}, icon:"assets/images/icon.ico", show: false})

    win.loadURL(url.format({
        pathname:path.join(__dirname,'index.html'),
        protocol:'file',
        slashes:true
    }))

    child = new BrowserWindow({parent: win,width:420,height:450, webPreferences: {nodeIntegration: true},
})
    child.loadURL(url.format({
        pathname:path.join(__dirname,'login.html'),
        protocol:'file',
        slashes:true
    }))

    child2 = new BrowserWindow({width:200,height:200, webPreferences: {nodeIntegration: true}, show: false})

    child2.loadURL(url.format({
        pathname:path.join(__dirname,'loading.html'),
        protocol:'file',
        slashes:true
    }))

    // child.openDevTools()
}

ipcMain.on('entry-accepted', (event, arg) => {
    if(arg=='ping'){
        win.reload()
        win.show()
        win.maximize()
        child.hide()

    }
    if(arg=='ping2'){
        win.hide()
        child.reload()
        child.show()
    }
    
    if(arg == 'ping3')
    {
        win.destroy()
        child.destroy()
        createWindows()
        win.show()
        win.maximize()
        child.hide()
        child2.hide()

    }
    if(arg == 'ping4')
    {
        child2.show()
    }

    
  })

app.on('ready',createWindows)
