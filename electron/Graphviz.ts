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
        console.log("1");
        const tempFolder = await new Promise<string>((resolve, reject) => {
            fs.mkdtemp(path.join(os.tmpdir(), "graphviz"), (err, folder) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(folder);
                }
            });
        });

        console.log("2");
        await new Promise<void>((resolve, reject) => {
            fs.writeFile(path.join(tempFolder, "input.txt"), dotString, (err) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        const dotFile = path.join(__dirname, "lib", process.platform, "dot");
        console.log(dotFile);

        await new Promise<void>((resolve, reject) => {
           child_process.execFile(dotFile, ["-Tpng", path.join(tempFolder, "input.txt"),
                        "-o", path.join(tempFolder, "output.png")],
               (error) => {
               if (error != null) {
                   reject(error);
               } else {
                   resolve();
               }
           });
        });

        return await new Promise<IGraphvizPacket>((resolve, reject) => {
            fs.readFile(path.join(tempFolder, "output.png"), (err, data) => {
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

