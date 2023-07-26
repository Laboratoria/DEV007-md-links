<<<<<<< HEAD
import { program } from 'commander';
import mdLinks from './app.js';
=======
// CLI.js

import { program } from 'commander';
import mdLinks from './mdLinks.js';
import chalk from 'chalk';
>>>>>>> 283ae1946214c40752eb74c7f51f73fb2de99a35

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
        console.error('An error occurred:', error);
      });
  });

<<<<<<< HEAD
program.parse(process.argv);
=======
program.parse(process.argv);
>>>>>>> 283ae1946214c40752eb74c7f51f73fb2de99a35
