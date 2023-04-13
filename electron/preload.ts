import {contextBridge, ipcRenderer} from "electron";

contextBridge.exposeInMainWorld('electronAPI', {
    invokeGraphviz: async (dotString: string) => {
        return await ipcRenderer.invoke("invokeGraphviz", dotString);
    },
    ping: async (value: string) => {
        return await ipcRenderer.invoke("ping", value);
    }
});


