"use strict";
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
exports.confirm = exports.promptMode = exports.COMMANDS = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
exports.COMMANDS = {
    GENERATE: "g",
    ADD: "a",
    DELETE: "d"
};
exports.promptMode = () => __awaiter(void 0, void 0, void 0, function* () {
    const answers = yield inquirer_1.default.prompt([
        {
            name: "mode",
            type: "list",
            message: "What you want to do? ",
            choices: [
                {
                    name: "Add template",
                    value: exports.COMMANDS.ADD
                },
                {
                    name: "Generate template",
                    value: exports.COMMANDS.GENERATE
                },
                {
                    name: "Delete template",
                    value: exports.COMMANDS.DELETE
                }
            ]
        }
    ]);
    return answers["mode"];
});
exports.confirm = (message, confirm = "Yes", reject = "No") => __awaiter(void 0, void 0, void 0, function* () {
    const answers = yield inquirer_1.default.prompt([
        {
            name: "confirm",
            type: "list",
            choices: [
                {
                    name: confirm,
                    value: true,
                },
                {
                    name: reject,
                    value: false,
                }
            ]
        }
    ]);
    return answers["confirm"];
});
//# sourceMappingURL=prompts.js.map