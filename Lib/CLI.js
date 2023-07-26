// CLI.js

import { program } from 'commander';
import mdLinks from './mdLinks.js';
import chalk from 'chalk';

program
  .command('mdlinks <path>')
  .option('-v, --validate', 'Validate if the path exists')
  .option('-s, --stats', 'Show statistics')
  .action((path, options) => {
    mdLinks(path, options)
      .then((links) => {
        if (options.stats) {
          const total = links.length;
          const unique = new Set(links.map((link) => link.href)).size;
          const broken = links.filter((link) => link.ok === false).length;

          console.log(chalk.cyan(`Total: ${total}`));
          console.log(chalk.blueBright(`Unique: ${unique}`));
          console.log(chalk.magenta(`Broken: ${broken}`));
        } else {
          links.forEach((link) => {
            console.log(link);
            console.log(
              chalk.blue(link),
              link.href,
             // link.ok === 'ok' ? chalk.green(link.ok) : chalk.green(link.ok),
              link.text
            );
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

program.parse(process.argv);
