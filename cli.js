const chalk = require('chalk');
const { mdLinks } = require('./lib');
const { linkStats } = require('./lib/function');

// Obtener el argumento pasado en la línea de comandos
const ruta = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];

const hola = (path, optionOne, optionTwo) => {
  if (optionOne === '--validate' || optionTwo === '--validate') {
    mdLinks(path, { validate: true })
      .then((results) => {
        const arrayLinks = results;
        if (optionOne === '--stats' || optionTwo === '--stats') {
          console.log(chalk.bgMagenta.bold('estadisticas'));
          return linkStats(arrayLinks, true);
        }
        return '';
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    mdLinks(path, { validate: false })
      .then((results2) => {
        const arrayLinks = results2;
        if (optionOne === '--stats' || optionTwo === '--stats') {
          console.log(chalk.bgMagenta.bold('estadisticas'));
          return linkStats(arrayLinks, false);
        }
        return '';
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

hola(ruta, option1, option2);
