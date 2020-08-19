"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFileContent = exports.copyContent = exports.TEMPLATES_PATH = exports.IGNORE_FILE_NAME = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.IGNORE_FILE_NAME = ".pgignore";
exports.TEMPLATES_PATH = path_1.default.resolve(__dirname, "..", "..", 'templates');
function isExcludedFile(filePathName, treat) {
    for (const excluded of treat.excluded) {
        const excludedFile = path_1.default.resolve(treat.origin, excluded);
        if (filePathName.toLowerCase().includes(excludedFile.toLowerCase()))
            return true;
    }
    const { name } = path_1.default.parse(filePathName);
    return name.toLowerCase() === exports.IGNORE_FILE_NAME;
}
function copyContent(from, to, treat = null) {
    const originFilesAndPaths = fs_1.default.readdirSync(from);
    for (const filePath of originFilesAndPaths) {
        const fileFullPath = path_1.default.resolve(from, filePath);
        if (treat && isExcludedFile(fileFullPath, treat))
            continue;
        const stat = fs_1.default.statSync(fileFullPath);
        if (stat.isFile()) {
            let content = fs_1.default.readFileSync(fileFullPath, 'utf8');
            if (treat)
                content = treat.parseFile(path_1.default.parse(fileFullPath), content);
            fs_1.default.writeFileSync(path_1.default.resolve(to, filePath), content, 'utf8');
        }
        else {
            fs_1.default.mkdirSync(path_1.default.resolve(to, filePath));
            copyContent(fileFullPath, path_1.default.resolve(to, filePath));
        }
    }
}
exports.copyContent = copyContent;
function copyFileContent(origin, target) {
}
exports.copyFileContent = copyFileContent;
//# sourceMappingURL=templates.js.map