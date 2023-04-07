import {app, BrowserWindow} from 'electron'

function createMainWindow() {
    const window = new BrowserWindow({
        title: "MainWindow",
        width: 1080,
        height: 720,
        useContentSize: true, //这个设置为真时，设置的尺寸将会是不包括菜单栏的窗口大小
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        window.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        window.loadFile("dist/index.html");
    }

    if (!app.isPackaged) {
        window.webContents.openDevTools();
    }
}

app.whenReady().then(() => {
    createMainWindow();
    app.on('activate', () => {
       if (BrowserWindow.getAllWindows().length == 0) {
           createMainWindow();
       }
    });
});

app.on('window-all-closed', () => {
   if(process.platform !== 'darwin') {
       app.quit();
   }
});
