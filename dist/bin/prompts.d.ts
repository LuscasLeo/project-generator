export declare const COMMANDS: {
    GENERATE: string;
    ADD: string;
    DELETE: string;
};
export declare const promptMode: () => Promise<string>;
export declare const confirm: (message: string, confirm?: string, reject?: string) => Promise<boolean>;
