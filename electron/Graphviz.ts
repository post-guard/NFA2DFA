import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as child_process from "child_process";

interface IGraphvizPacket {
    imgBuffer: Buffer | undefined;
    isSuccessful: boolean;
    message: string;
}
export function RunGraphviz(dotString: string): IGraphvizPacket {
    let result: IGraphvizPacket = {
            imgBuffer: undefined,
            isSuccessful: false,
            message: "eeee"
        };

        fs.mkdtemp(path.join(os.tmpdir(), "graphviz"), (err, folder) => {
            if (err != null) {
                result = {
                    imgBuffer: undefined,
                    isSuccessful: false,
                    message: `Create temp directory failed: ${err.message}`
                };
                return;
            } else {
                // 首先写入dot字符串
                fs.writeFile(path.join(folder, "input.txt"), dotString, (err) => {
                   if (err != null) {
                       result = {
                           imgBuffer: undefined,
                           isSuccessful: false,
                           message: `Write input file failed: ${err.message}`
                       };
                       return;
                   } else {
                       const dotFile = path.join("lib", process.platform, "dot");

                       child_process.execFile(dotFile, ["-Tpng", path.join(folder, "input.txt"),
                           "-o", path.join(folder, "output.png")], (err, stdout, stderr) => {
                           if (err != null) {
                               result = {
                                   imgBuffer: undefined,
                                   isSuccessful: false,
                                   message: `Run dot failed: ${stderr}`
                               };
                               return;
                           }
                       });

                       fs.readFile(path.join(folder, "output.ong"), (err, data) => {
                           if (err != null) {
                               result = {
                                   imgBuffer: undefined,
                                   isSuccessful: false,
                                   message: `Read output picture failed: ${err.message}`
                               };
                               return;
                           } else {
                               result = {
                                   imgBuffer: data,
                                   isSuccessful: true,
                                   message: "Generate successful"
                               };
                               return;
                           }
                       })
                   }
                });
            }
        });

        return result;
}

