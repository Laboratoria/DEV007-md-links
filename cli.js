require('@babel/register');
const chalk = require('chalk');
const { mdLinks } = require('./validate.js');

const documents = process.argv[2];

const thisoptionValidate = process.argv.includes('--validate');
const thisoptionStats = process.argv.includes('--stats');

const options = {
    validate: thisoptionValidate,
    stats: thisoptionStats,
}

mdLinks(documents, options)
.then((links) => {
    if(options.validate && options.stats){
        console.log(chalk.bold.bgWhiteBright('La ejecucion es exitosa --validate y --stats'));
        console.log(chalk.bold.blue('Total: ' + links.total))
        console.log(chalk.bold.blue('Unique: ' + links.unique))
        console.log(chalk.bold.green('Working: ' + links.working))
        console.log(chalk.bold.red('Broken: ' + links.broken))
    }
    else if(options.validate){
        console.log(chalk.bold.bgWhiteBright('La ejecucion es exitosa --validate, no --stats'));
        links.forEach(link => {
            console.log(chalk.bold.gray(link.file + ' ' + link.href + ' ' + link.mensaje + ' ' + link.status + ' ' + link.text))
        });
    }
    else if(options.stats){
        console.log(chalk.bold.bgWhiteBright('La ejecucion es exitosa --stats, no --validate'));
        console.log(chalk.bold.green('Total: ' + links.total))
        console.log(chalk.bold.green('Unique: ' + links.unique))
    }
    else{
        console.log(chalk.bold.bgWhiteBright('Se obtuvo la ruta'));
        links.forEach(link => {
            console.log(chalk.bold.yellow(link.file + ' ' + link.href + ' ' + link.text))
        });
    }
})
.catch((errors) => {
    console.log(errors, 22)
})