import {app, BrowserWindow} from 'electron'
import * as process from "process";

function createMainWindow() {
    const window = new BrowserWindow({
        title: "MainWindow",
        width: 800,
        height: 600
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        window.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        window.loadFile("dist/index.html");
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
