import inquirer from "inquirer";

export const COMMANDS = {
    GENERATE: "g",
    ADD: "a",
    DELETE: "d"
}

export const promptMode = async () => {
    const answers = await inquirer.prompt([
        {
            name: "mode",
            type: "list",
            message: "What you want to do? ",
            choices: [
                {
                    name: "Add template",
                    value: COMMANDS.ADD
                },
                {
                    name: "Generate template",
                    value: COMMANDS.GENERATE
                },
                {
                    name: "Delete template",
                    value: COMMANDS.DELETE
                }
            ]
        }
    ]);

    return answers["mode"] as string;
}

export const confirm = async(message: string, confirm: string = "Yes", reject: string = "No") => {
    const answers = await inquirer.prompt([
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

    return answers["confirm"] as boolean;
}