#!/usr/bin/env node
import { program } from 'commander';
import mdLinks from './mdLinks.js';
import chalk from 'chalk';
// ----------------Command
  /*const done = term.slowTyping(
    'DONE!\n',
    { flashStyle: term.brightWhite },
    () => { process.exit(); },
  );*/
program
  .command('mdlinks <path>')
  .option('-v, --validate', 'Validate if the path exists')
  .option('-s, --stats', 'Show statistics')
  .action(async (path, options) => {
    if (!path) {
      console.log('Path needed')
      program.help();
    } else {
      const {
        validate,
        stats,
      } = options;
      // ============================RESULTS
      try {
        const result = await mdLinks(path, options);

        if (stats && !validate) {
          console.log("Links Stats result")
          Object.keys(result).forEach((key) => key.toLowerCase() != 'broken' ? console.log(`${key}: ${result[key]}`) : null)
        }
        if (validate && !stats) {
          console.log("Links Validate result")
          result.forEach((LinkObj) => {
            console.log(`${chalk.inverse.magenta(path)} | ${chalk.grey(LinkObj.text)}| ${chalk.cyan(LinkObj.href)} | ${chalk.yellow(LinkObj.status)} | ${LinkObj.ok ? chalk.green('OK') : chalk.green("Fail")}`);
          })
        }

        if (validate && stats) {
          console.log("Links Validate result")
            result.validatedLinks.forEach((LinkObj) => {
              console.log(`${chalk.inverse.magenta(path)} | ${chalk.grey(LinkObj.text)}| ${chalk.cyan(LinkObj.href)} | ${chalk.yellow(LinkObj.status)} | ${LinkObj.ok ? chalk.green('OK') : chalk.green("Fail")}`);
            })
          console.log("======================")
          console.log("Links Stats result")
            Object.keys(result.statedLinks).forEach((key) => console.log(chalk.yellow(`${key}: ${result.statedLinks[key]}`)))

        }
        if (!stats && !validate) {
          console.log('No options found')
          result.forEach((LinkObj) => {
            console.log(`${chalk.inverse.magenta(path)} | ${chalk.grey(LinkObj.text)} | ${chalk.cyan(LinkObj.href)}`);
          })
        }
      } catch (error) {
        console.error(error.message)
      }
    }
  });

program.parse(process.argv);
