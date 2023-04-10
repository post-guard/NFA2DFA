export interface IElectronAPI {
    hello: string;
}

declare global {
    interface Window {
        electronAPI : IElectronAPI
    }
}