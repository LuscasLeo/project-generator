import path, { ParsedPath } from "path";
import fs from "fs";

export const IGNORE_FILE_NAME = ".pgignore";
export interface CliOptions {
    templatePath: string
}

export interface FileParsingProps {
    excluded: string[];
    origin: string;
    parseFile: (path: ParsedPath, content: Buffer | string) => Buffer | string;
}

export const TEMPLATES_PATH = path.resolve(__dirname, "..", "..", 'templates');


function isExcludedFile(filePathName: string, treat: FileParsingProps): boolean {
    
    for(const excluded of treat.excluded){
        const excludedFile = path.resolve(treat.origin, excluded);

        if(filePathName.toLowerCase().includes(excludedFile.toLowerCase()))
            return true;
    }

    const { name } = path.parse(filePathName);
    return name.toLowerCase() === IGNORE_FILE_NAME;
}


export function copyContent(from: string, to: string, treat: FileParsingProps = null) {
    const originFilesAndPaths = fs.readdirSync(from);

    for(const filePath of originFilesAndPaths) {
        const fileFullPath = path.resolve(from, filePath);

        if(treat && isExcludedFile(fileFullPath, treat))
            continue;

        const stat = fs.statSync(fileFullPath);

        if(stat.isFile()) {
            let content: string | Buffer =  fs.readFileSync(fileFullPath, 'utf8');
            if(treat)
                content = treat.parseFile(path.parse(fileFullPath), content);
            fs.writeFileSync(path.resolve(to, filePath), content, 'utf8');
        } else {
            fs.mkdirSync(path.resolve(to, filePath));
            copyContent(fileFullPath, path.resolve(to, filePath));
        }

    }
}

export function copyFileContent(origin: string, target: string) {
    
}
