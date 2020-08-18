"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFileContent = exports.copyContent = exports.commands = exports.TEMPLATES_PATH = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.TEMPLATES_PATH = path_1.default.resolve(__dirname, "..", "..", 'templates');
exports.commands = {
    GENERATE: "g",
    ADD: "a"
};
function copyContent(from, to) {
    const originFilesAndPaths = fs_1.default.readdirSync(from);
    for (const filePath of originFilesAndPaths) {
        const fileFullPath = path_1.default.resolve(from, filePath);
        const stat = fs_1.default.statSync(fileFullPath);
        if (stat.isFile()) {
            copyFileContent(fileFullPath, path_1.default.resolve(to, filePath));
        }
        else {
            fs_1.default.mkdirSync(path_1.default.resolve(to, filePath));
            copyContent(fileFullPath, path_1.default.resolve(to, filePath));
        }
    }
}
exports.copyContent = copyContent;
function copyFileContent(origin, target) {
    const content = fs_1.default.readFileSync(origin, 'utf8');
    fs_1.default.writeFileSync(target, content, 'utf8');
}
exports.copyFileContent = copyFileContent;
//# sourceMappingURL=templates.js.map