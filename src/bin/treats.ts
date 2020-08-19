import { ParsedPath } from "path";
import ejs from "ejs";

export interface TreatmentProps {
    when: (projectPath: string, filePath: ParsedPath) => boolean;
    treat: (filePath: ParsedPath, content: Buffer | string, props: {}) => Buffer | string;
}

export const addTemplateTreat: Record<string, TreatmentProps> = {
    "package.json": {
        when: (projectPath, filePath) => {
            return filePath.dir == projectPath;
        },
        treat: (filePath, raw) => {
            const json = (JSON.parse(String(raw)) as PackageInterface);

            json.name = "<%= projectName %>";
            return JSON.stringify(json, null, 4);
        }
    }
}

export const generateProjectTreat: Record<string, TreatmentProps> = {
    "package.json": {
        when: (projectPath, filePath) => {
            return true;
        },
        treat: (path, raw, props) => {
            return ejs.render(String(raw), props);
            // return raw;
        }
    }
}

interface PackageInterface {
    name: string;
}