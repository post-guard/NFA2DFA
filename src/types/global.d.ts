export interface IGraphvizPacket {
    imgBuffer: Buffer | undefined;
    isSuccessful: boolean;
    message: string;
}

export interface IElectronAPI {
    invokeGraphviz: (dotString: string) => Promise<IGraphvizPacket>;
    ping: (value: string) => Promise<string>;
}

declare global {
    interface Window {
        electronAPI : IElectronAPI
    }
}
