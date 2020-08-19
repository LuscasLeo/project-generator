"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProjectTreat = exports.addTemplateTreat = void 0;
const ejs_1 = __importDefault(require("ejs"));
exports.addTemplateTreat = {
    "package.json": {
        when: (projectPath, filePath) => {
            return filePath.dir == projectPath;
        },
        treat: (filePath, raw) => {
            const json = JSON.parse(String(raw));
            json.name = "<%= projectName %>";
            return JSON.stringify(json, null, 4);
        }
    }
};
exports.generateProjectTreat = {
    "package.json": {
        when: (projectPath, filePath) => {
            return true;
        },
        treat: (path, raw, props) => {
            return ejs_1.default.render(String(raw), props);
            // return raw;
        }
    }
};
//# sourceMappingURL=treats.js.map