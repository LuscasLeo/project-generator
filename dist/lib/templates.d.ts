/// <reference types="node" />
import { ParsedPath } from "path";
export declare const IGNORE_FILE_NAME = ".pgignore";
export interface CliOptions {
    templatePath: string;
}
export interface FileParsingProps {
    excluded: string[];
    origin: string;
    parseFile: (path: ParsedPath, content: Buffer | string) => Buffer | string;
}
export declare const TEMPLATES_PATH: string;
export declare function copyContent(from: string, to: string, treat?: FileParsingProps): void;
export declare function copyFileContent(origin: string, target: string): void;
