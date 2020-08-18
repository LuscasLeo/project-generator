import path from "path";
import fs from "fs";


export interface CliOptions {
    templatePath: string
}

export const TEMPLATES_PATH = path.resolve(__dirname, "..", "..", 'templates');

export const commands = {
    GENERATE: "g",
    ADD: "a"
}

export function copyContent(from: string, to: string) {
    const originFilesAndPaths = fs.readdirSync(from);

    for(const filePath of originFilesAndPaths) {
        const fileFullPath = path.resolve(from, filePath);

        const stat = fs.statSync(fileFullPath);

        if(stat.isFile()) {
            copyFileContent(fileFullPath, path.resolve(to, filePath));
        } else {
            fs.mkdirSync(path.resolve(to, filePath));
            copyContent(fileFullPath, path.resolve(to, filePath));
        }

    }
}

export function copyFileContent(origin: string, target: string) {
    const content = fs.readFileSync(origin, 'utf8');

    fs.writeFileSync(target, content, 'utf8');
}
