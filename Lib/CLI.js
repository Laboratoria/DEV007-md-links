// CLI.js
import { program } from 'commander';
import mdLinks from './mdLinks.js';

// ----------------Command
program
  .command('mdlinks <path>')
  .option('-v, --validate', 'Validate if the path exists')
  .option('-s, --stats', 'Show statistics')
  .action(async (path, options) => {
    if (!path) {
      console.log('Path needed')
      program.help();
    } else {
      const mdLinksOptions = {
        validate: options.validate,
        stats: options.stats,
      };
      // ============================RESULTS
      try {
        const result = await mdLinks(path, mdLinksOptions);
        //const resultV = await mdLinks(path, mdLinksOptions);

        // ------------------Validate & Stats
        if (mdLinksOptions.validate && mdLinksOptions.stats) {
          const {statedLinks, validatedLinks} = result;
          console.log(validatedLinks); // Mostrar enlaces validados
          //console.log(result, 777);
          console.log("Total:", statedLinks.Total);
          console.log("Únicos:", statedLinks.Unique);
          console.log("Rotos:", statedLinks.Broken);
          //console.log("Broken:", statedLinks.Broken);
          // ----------------- Just Validate
        } else if (mdLinksOptions.validate) {
          const { validatedLinks } = result;
          console.log(validatedLinks); // Mostrar enlaces validados
          //console.log(result);
          
          // ----------------- Just Validate
        } else if (mdLinksOptions.stats) {
          // Mostrar resultados solo con estadísticas
          const { statedLinks } = result;
          console.log("Total:", statedLinks.Total);
          console.log("Únicos:", statedLinks.Unique);
        } else {
          // ------------------ No option
          const linksWithoutStatus = result.map(({ href, text, file }) => ({ href, text, file }));
          console.log(linksWithoutStatus);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  });
  /*term.slowTyping(
    'DONE!\n',
    { flashStyle: term.brightWhite },
    () => { process.exit(); },
  );*/
program.parse(process.argv);
