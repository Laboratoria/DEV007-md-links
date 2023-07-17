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
    console.log('La ruta existe');
    const absolutePath = convertToAbsolutePath(path);
    console.log('la ruta absoluta es: ', absolutePath);

    let arrayMd = [];
    if (IsDirectory(path)) {
      arrayMd = extractMarkdownFiles(path);
      console.log('es un directorio', arrayMd);
    } else {
      arrayMd = isMd(path);
      console.log('es un archivo md?: ', arrayMd);
    }

    if (arrayMd.length !== 0) {
      const linksPromises = arrayMd.map((route) => ExtLinks(route));

      Promise.all(linksPromises)
        .then((results) => {
          const linksResults = results.flat();
          console.log('Los links disponibles son:');
          if (options.validate === true) {
            const linkPromises = linksResults.map((link) => checkLink(link));
            Promise.all(linkPromises).then((validatedLinks) => {
              console.table(validatedLinks, ['file', 'href', 'text', 'status', 'ok']);
            }).catch((error) => {
              console.error(error);
              reject(error);
            });
          } else {
            console.table(linksResults, ['file', 'href', 'text']);
            resolve();
          }
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    } else {
      console.log('error no existen documentos .md en la ruta');
      resolve();
    }
  } else {
    console.log('la ruta no existe');
    resolve();
  }
});

// Obtener el argumento pasado en la línea de comandos
const path = process.argv[2];
const validateOption = process.argv[3] === 'true';

const options = { validate: validateOption };
// Llamar a la función mdLinks con el argumento pasado
mdLinks(path, options);

module.exports = {
  mdLinks,
};
