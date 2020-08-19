#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const templates_1 = require("../lib/templates");
const colors_1 = __importDefault(require("colors"));
const prompts_1 = require("./prompts");
const process_1 = require("process");
const n_readlines_1 = __importDefault(require("n-readlines"));
const treats_1 = require("./treats");
const args = process.argv.slice(2).map(s => s.toLowerCase());
const CURRENT_DIR = getCurrentPath();
function getCurrentPath() {
    return process.cwd();
}
if (process_1.env["debug"])
    console.log(`Working directory: ${CURRENT_DIR}`);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const cmd = args[0] || (yield prompts_1.promptMode());
        if (cmd === prompts_1.COMMANDS.GENERATE) {
            yield createProjectFromTemplate();
        }
        else if (cmd === prompts_1.COMMANDS.ADD) {
            yield addProjectToTemplates();
        }
        else if (cmd == prompts_1.COMMANDS.DELETE) {
            yield deleteTemplate();
        }
    });
}
function deleteTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        const CHOICES = fs.readdirSync(templates_1.TEMPLATES_PATH);
        const answers = yield inquirer_1.default.prompt([
            {
                name: 'template',
                type: 'list',
                message: `What project template would you like to ${colors_1.default.bold(colors_1.default.red("delete"))}`,
                choices: CHOICES
            }
        ]);
        const templateName = answers["template"];
        if (!(yield prompts_1.confirm(`Do you really want to delete the template ${templateName}?`)))
            return;
        console.log(colors_1.default.red("Deleting..."));
        fs.rmdirSync(path.resolve(templates_1.TEMPLATES_PATH, templateName), {
            recursive: true
        });
        console.log(colors_1.default.red("Done."));
    });
}
function addProjectToTemplates() {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer_1.default.prompt([
            {
                name: "template-name",
                message: "Type the template-name",
                type: "input"
            }
        ]);
        const templateName = answers["template-name"];
        const newTemplatePath = path.resolve(templates_1.TEMPLATES_PATH, templateName);
        if (fs.existsSync(newTemplatePath)) {
            if (!(yield prompts_1.confirm("This template name already exists, would you like to replace?")))
                return;
            console.log(colors_1.default.red("Deleting..."));
            fs.rmdirSync(newTemplatePath, {
                recursive: true
            });
        }
        fs.mkdirSync(newTemplatePath);
        console.log(colors_1.default.red("Copying files..."));
        const ignoreFiles = getIgnoreFiles(CURRENT_DIR);
        templates_1.copyContent(CURRENT_DIR, newTemplatePath, {
            excluded: ignoreFiles,
            origin: CURRENT_DIR,
            parseFile: (path, raw) => {
                const t = treats_1.addTemplateTreat[path.base];
                if (t && t.when(CURRENT_DIR, path)) {
                    return t.treat(path, raw, {});
                }
                return raw;
            }
        });
        console.log(colors_1.default.blue("Done!"));
    });
}
function getIgnoreFiles(projectPath) {
    const filePath = path.resolve(projectPath, templates_1.IGNORE_FILE_NAME);
    if (!fs.existsSync(filePath))
        return [];
    const excludes = [];
    const liner = new n_readlines_1.default(filePath);
    let line;
    while ((line = String((liner.next() || "\t"))) != "\t")
        excludes.push(line);
    return excludes;
}
function createProjectFromTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        const CHOICES = fs.readdirSync(templates_1.TEMPLATES_PATH);
        const QUESTIONS = [
            {
                name: 'template',
                type: 'list',
                message: 'What project template would you like to generate?',
                choices: CHOICES
            },
            {
                name: "project-name",
                type: "input",
                message: "Type the project name",
            }
        ];
        const answers = yield inquirer_1.default.prompt(QUESTIONS);
        const projectChoice = answers['template'];
        const projectName = answers['template'];
        const templatePath = path.resolve(__dirname, "..", "..", 'templates', projectChoice);
        const options = {
            templatePath,
        };
        console.log(colors_1.default.red("Copying files..."));
        templates_1.copyContent(options.templatePath, CURRENT_DIR, {
            excluded: [],
            origin: CURRENT_DIR,
            parseFile: (path, raw) => {
                const t = treats_1.generateProjectTreat[path.base];
                if (t && t.when(CURRENT_DIR, path))
                    return t.treat(path, raw, {
                        projectName
                    });
                return raw;
            }
        });
        console.log(colors_1.default.blue("Done!"));
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield start();
        process.exit(0);
    });
})();
//# sourceMappingURL=index.js.map