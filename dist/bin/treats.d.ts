/// <reference types="node" />
import { ParsedPath } from "path";
export interface TreatmentProps {
    when: (projectPath: string, filePath: ParsedPath) => boolean;
    treat: (filePath: ParsedPath, content: Buffer | string, props: {}) => Buffer | string;
}
export declare const addTemplateTreat: Record<string, TreatmentProps>;
export declare const generateProjectTreat: Record<string, TreatmentProps>;
