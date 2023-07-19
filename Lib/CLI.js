import { program } from 'commander';
import mdLinks from './mdLinks.js'; // Asegúrate de que la ruta sea correcta

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
        console.error(error);
      });
  });

program.parse(process.argv);
