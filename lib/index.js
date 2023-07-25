/* eslint-disable no-unused-vars */
const chalk = require('chalk');
const {
  checkPathExists,
  convertToAbsolutePath,
  extractMarkdownFiles,
  IsDirectory,
  isMd,
  ExtLinks,
  checkLink,
} = require('./function');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (checkPathExists(path)) {
    const absolutePath = convertToAbsolutePath(path);
    let arrayMd = [];
    if (IsDirectory(path)) {
      arrayMd = extractMarkdownFiles(path);
    } else {
      arrayMd = isMd(path);
    }

    if (arrayMd.length !== 0) {
      const linksPromises = arrayMd.map((route) => ExtLinks(route));

      Promise.all(linksPromises)
        .then((results) => {
          const linksResults = results.flat();
          console.log(chalk.bgMagenta.bold('Los links disponibles son:'));
          if (options.validate === true) {
            const linkPromises = linksResults.map((link) => checkLink(link));
            Promise.all(linkPromises).then((Links) => {
              console.table(Links, ['file', 'href', 'text', 'status', 'ok']);
              resolve(Links);
            }).catch((error) => {
              console.error(error);
              reject(error);
            });
          } else {
            console.table(linksResults, ['file', 'href', 'text']);
            resolve(linksResults);
          }
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    } else {
      console.log(chalk.bgRed.bold('error no existen documentos .md en la ruta'));
      resolve([]);
    }
  } else {
    console.log(chalk.bgRed.bold('la ruta no existe'));
    resolve([]);
  }
});

module.exports = {
  mdLinks,
};
