#!/usr/bin/env node
const chalk = require('chalk');
const { mdLinks } = require('./lib');
const { linkStats } = require('./lib/function');

// Obtener el argumento pasado en la línea de comandos
const ruta = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];

const hola = (path, optionOne, optionTwo) => {
  if (!path) {
    console.log(chalk.bgMagenta.bold('Bienvenido/a a mdLinks'));
    console.log(chalk.magenta('Con esta herramienta podras revisar los links de tus archivos Markdown'));
    console.log(chalk.white.underline('¡Utilizarla es muy facil!'));
    console.log(chalk.white.bold('1) ') + chalk.gray(' Lo primero es agregar una ruta que deseas revisar despues del comando mdLinks'));
    console.log(chalk.white.bold('2) ') + chalk.gray(' Luego de eso puedes agregar las siguientes opciones segun lo necesites'));
    console.log(chalk.gray.bold('--validate:') + chalk.gray(' Para ver si el link funciona o no'));
    console.log(chalk.gray.bold('--stats:') + chalk.gray(' Para obtener texto de estadistica basica'));
    console.log(chalk.bgMagenta.bold('Ejemplo de uso') + chalk.gray.bold('    mdLink ruta/carpeta/o/archivo') + chalk.gray('--validate --stats'));
    return;
  }
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
