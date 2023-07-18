#!/usr/bin/env node

import { program } from 'commander';
import { existsSync } from 'fs';

const mdLinks = (path, options) => {
  if (options.validate) {
    if (existsSync(path)) {
      console.log('La ruta sí existe');
    } else {
      console.log('La ruta no existe');
    }
  }
};

program
  .command('mdlinks <path>')
  .option('-v, --validate', 'Validate if the path exists')
  .action((path, options) => {
    mdLinks(path, options);
  });

program.parse(process.argv);
export default mdLinks;

/*const saludar = (nombre) => {
  console.log(`hola, ${nombre}`);
};
// module.exports.saludar = saludar;

// saludar('jorge');
export default saludar;
// console.log(saludar('freeCodeCamp'), 2);*/
