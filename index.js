// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// TODO: Create an array of questions for user input
const questions = 
    ["Please enter the title of your project.",
    "Please enter a description for your project.",
    "Please enter a set of instructions for installing your project.",
    "Please enter usage information.",
    "Please enter contribution guidelines.",
    "Please enter testing instructions.",
    "Please select a license for your project.",
    "Please enter your GitHub username.",
    "Please enter your email address."
    ];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    
    let dir = "./generated-readme";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const { 
        item0: title, 
        item1: desc, 
        item2: install, 
        item3: usage, 
        item4: contr, 
        item5: test, 
        item6: license, 
        item7: user, 
        item8: email } = data;
    
    fs.writeFile(
        `./generated-readme/${fileName}`, 
`# ${title}

## Description

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

${desc}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation <a name="installation"></a>

${install}

## Usage <a name="usage"></a>

${usage}

## License <a name="license"></a>

Licensed under the ${license} license.

## Contributing <a name="contributing"></a>

${contr}

## Tests <a name="tests"></a>

${test}

## Questions <a name="questions"></a>

For additional questions, I can be reached at:

GitHub: [https://github.com/${user}](https://github.com/${user}) <br>
Email: ${email}`, 
        (err) => err ? console.log(err) : console.log('README.md successfully generated in /generated-readme')
    );
}

// TODO: Create a function to initialize app
function init() {
    console.log(`\x1b[36m### Professional README.md Generator ###\x1b[0m\n`)
    
    let prompts = [];
    for (let i in questions) {
        prompts.push({
            type: "input",
            message: questions[i],
            name: `item${i}`,
        })
    }

    prompts[6].type = 'list';
    prompts[6].choices = ["MIT", "GPLv2", "Apache"];

    inquirer
    .prompt(prompts)
    .then((data) => {
        const fileName = `README_${data.item0.toLowerCase().split(' ').join('_')}.md`
        writeToFile(fileName, data); 
    })

}

// Function call to initialize app
init();
