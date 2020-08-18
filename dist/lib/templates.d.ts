export interface CliOptions {
    templatePath: string;
}
export declare const TEMPLATES_PATH: string;
export declare const commands: {
    GENERATE: string;
    ADD: string;
};
export declare function copyContent(from: string, to: string): void;
export declare function copyFileContent(origin: string, target: string): void;
