import {contextBridge} from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    hello: "Hello from Electron!",
});

