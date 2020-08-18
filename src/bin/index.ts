#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

import inquirer, { QuestionCollection } from 'inquirer';
import { CliOptions, copyContent, TEMPLATES_PATH, commands } from '../lib/templates';

const args = process.argv.slice(2);
const CURRENT_DIR = process.cwd();
const cmd = args[0] || commands.GENERATE;



async function start() {

    if(cmd == commands.GENERATE) {
        await createProjectFromTemplate();
    } else if (cmd == commands.ADD) {
        await addProjectToTemplates();
    }
    

}

async function addProjectToTemplates(){
    const replace = args.find(a => a.toLowerCase().match(/\-r/)) || false;

    const answers = await inquirer.prompt([
        {
            name: "template-name",
            message: "Type the template-name",
            type: "input"
        }
    ]);

    const templateName = answers["template-name"] as string;

    const newTemplatePath = path.resolve(TEMPLATES_PATH, templateName);

    fs.mkdirSync(newTemplatePath);
    copyContent(CURRENT_DIR, newTemplatePath);
}

async function createProjectFromTemplate() {
    
    
    const CHOICES = fs.readdirSync(TEMPLATES_PATH);


    const QUESTIONS:QuestionCollection = [
        {
            name: 'template',
            type: 'list',
            message: 'What project template would you like to generate?',
            choices: CHOICES
        }
    ];

    const answers = await inquirer.prompt(QUESTIONS);
    const projectChoice = answers['template'];

    const templatePath = path.resolve(__dirname, "..", 'templates', projectChoice);

    const options: CliOptions = {
        templatePath,
    }

    copyContent(options.templatePath, CURRENT_DIR);
}



start();

