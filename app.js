const { mdLinks, statsLinks, statsValidatelinks } = require("./index.js");
const colors = require('colors');

const command = process.argv[2];
const validateOption = process.argv.includes("--validate");
const statsOption = process.argv.includes("--stats");

const options = { validate: validateOption, stats: statsOption };

if (command) {
  // console.log(command);
  mdLinks(command, options)
    .then((result) => {
      // console.log(options);
      if (result.length > 0) {
        console.log(result);
        if (options.validate && options.stats) {
          // console.log(options.validate && options.stats);
          result.flat().forEach((link) => {
            console.log(colors.cyan(`(${link.file}, ${link.href}, ${link.text}, ${link.ok}, ${link.status})`));
          });
          const stats = statsValidatelinks(result.flat());
          console.log(colors.blue(`Total: ${stats.Total}, Unique: ${stats.Unique}, Broken: ${stats.Broken}`));
        } else if (options.stats) {
          const stats = statsLinks(result.flat());
          console.log(colors.magenta(`Total: ${stats.Total}, Unique: ${stats.Unique}`));
        } else if (options.validate) {
          result.flat().forEach((link) => {
            const statusColor = link.ok === "ok" ? colors.green : colors.red;
            console.log(`(${link.file}, ${link.href}, ${link.text}, ${statusColor(link.ok)}, ${link.status})`);
          });
        } else {
          result.flat().forEach((link) => {
            console.log(colors.red(`(${link.text}, ${link.href})`));
          });
        }
      } else {
        console.log(colors.red("No se encontraron enlaces en el archivo"));
      }
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  console.log(colors.red("Introdujo un comando no válido, por favor intente nuevamente"));
}



