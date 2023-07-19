import { program } from 'commander';
import mdLinks from './app.js';

program
  .command('mdlinks <path>')
  .option('-v, --validate', 'Validate if the path exists')
  .option('-s, --stats', 'Show statistics')
  .action((path, options) => {
    mdLinks(path, options)
      .then((links) => {
        console.log(links);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  });

program.parse(process.argv);