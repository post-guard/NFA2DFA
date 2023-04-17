import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as child_process from "child_process";

interface IGraphvizPacket {
    imgBuffer: Buffer | undefined;
    isSuccessful: boolean;
    message: string;
}

export async function RunGraphviz(dotString: string): Promise<IGraphvizPacket> {
    try {
        const tempFolder = await new Promise<string>((resolve, reject) => {
            fs.mkdtemp(path.join(os.tmpdir(), "graphviz"), (err, folder) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(folder);
                }
            });
        });

        await new Promise<void>((resolve, reject) => {
            fs.writeFile(path.join(tempFolder, "input.txt"), dotString, (err) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        let dotFile = "";
        switch (process.platform) {
            case "win32":
                dotFile = path.join("lib", process.platform, "dot.exe");
                break;
            default:
                dotFile = path.join("lib", process.platform, "dot");
        }

        // 初始化dot绘图插件
        await new Promise<void>((resolve, reject) => {
           child_process.execFile(dotFile, ["-c"], (error) => {
               if (error != null) {
                   reject(error);
               } else {
                   resolve();
               }
           })
        });

        await new Promise<void>((resolve, reject) => {
           child_process.execFile(dotFile, ["-Tsvg", path.join(tempFolder, "input.txt"),
                        "-o", path.join(tempFolder, "output.svg")],
               (error) => {
               if (error != null) {
                   reject(error);
               } else {
                   resolve();
               }
           });
        });

        return await new Promise<IGraphvizPacket>((resolve, reject) => {
            fs.readFile(path.join(tempFolder, "output.svg"), (err, data) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve({
                        imgBuffer: data,
                        isSuccessful: true,
                        message: "Success!"
                    });
                }
            });
        });
    } catch (err) {
        return {
            imgBuffer: undefined,
            isSuccessful: false,
            message: `${err}`
        }
    }
}

