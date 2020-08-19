#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import yargs from 'yargs';

import inquirer, { QuestionCollection } from 'inquirer';
import { CliOptions, copyContent, TEMPLATES_PATH, IGNORE_FILE_NAME } from '../lib/templates';
import colors from 'colors';
import { promptMode, COMMANDS, confirm } from './prompts';
import { env } from 'process';
import LineReader from 'n-readlines'
import ejs from 'ejs';
import { addTemplateTreat, generateProjectTreat } from './treats';


const args = process.argv.slice(2).map(s => s.toLowerCase());
const CURRENT_DIR = getCurrentPath();

function getCurrentPath() {
    return process.cwd();
}

if(env["debug"])
    console.log(`Working directory: ${CURRENT_DIR}`);


async function start() {

    const cmd = args[0] || await promptMode();

    
    if(cmd === COMMANDS.GENERATE) {
        await createProjectFromTemplate();
    } else if (cmd === COMMANDS.ADD) {
        await addProjectToTemplates();
    } else if (cmd == COMMANDS.DELETE) {
        await deleteTemplate();
    }
}

async function deleteTemplate() {
    const CHOICES = fs.readdirSync(TEMPLATES_PATH);


    const answers = await inquirer.prompt([
        {
            name: 'template',
            type: 'list',
            message: `What project template would you like to ${colors.bold(colors.red("delete"))}`,
            choices: CHOICES
        }
    ]);

    const templateName = answers["template"];

    if(!(await confirm(`Do you really want to delete the template ${templateName}?`)))
        return;

    console.log(colors.red("Deleting..."));
    fs.rmdirSync(path.resolve(TEMPLATES_PATH, templateName), {
        recursive: true
    });
    console.log(colors.red("Done."));
}

async function addProjectToTemplates(){

    const answers = await inquirer.prompt([
        {
            name: "template-name",
            message: "Type the template-name",
            type: "input"
        }
    ]);

    const templateName = answers["template-name"] as string;

    const newTemplatePath = path.resolve(TEMPLATES_PATH, templateName);

    if(fs.existsSync(newTemplatePath)){
        if(!(await confirm("This template name already exists, would you like to replace?")))
            return;

        console.log(colors.red("Deleting..."));
        fs.rmdirSync(newTemplatePath, {
            recursive: true
        });
    }

    fs.mkdirSync(newTemplatePath);
    console.log(colors.red("Copying files..."));

    const ignoreFiles = readFileLines(CURRENT_DIR);

    

    copyContent(CURRENT_DIR, newTemplatePath, {
        excluded: ignoreFiles,
        origin: CURRENT_DIR,
        parseFile: (path, raw) => {
            const t = addTemplateTreat[path.base];
            if(t && t.when(CURRENT_DIR, path)){
                return t.treat(path, raw, {});
            }

            return raw;
        }
    });

    console.log(colors.blue("Done!"));
}

function readFileLines(projectPath: string): string[] {
    const filePath = path.resolve(projectPath, IGNORE_FILE_NAME);
    if(!fs.existsSync(filePath))
        return [];
    const excludes: string[] = [];
    const liner = new LineReader(filePath);
    let line: string;
    while((line = String((liner.next() || "\t"))) != "\t")
        excludes.push(line);
    return excludes;
}

async function createProjectFromTemplate() {
    const CHOICES = fs.readdirSync(TEMPLATES_PATH);

    const QUESTIONS:QuestionCollection = [
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

    const answers = await inquirer.prompt(QUESTIONS);
    const projectChoice = answers['template'];
    const projectName = answers['template'];

    const templatePath = path.resolve(__dirname, "..", "..", 'templates', projectChoice);

    const options: CliOptions = {
        templatePath,
    }

    console.log(colors.red("Copying files..."));
    copyContent(options.templatePath, CURRENT_DIR, {
        excluded: [],
        origin: CURRENT_DIR,
        parseFile: (path, raw) => {
            const t = generateProjectTreat[path.base];
            if(t && t.when(CURRENT_DIR, path))
                return t.treat(path, raw, {
                    projectName
                });

            return raw;
        }
    });
    console.log(colors.blue("Done!"));
}


(async function() {
    await start();
    process.exit(0);
})();


