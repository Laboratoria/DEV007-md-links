const fs = require("fs");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // identificar si la ruta existe
    if (fs.existsSync(path)) {
      // las sgtes llaves son para ejecutar alguna acción si es que existe que sería chequear y ocnvertir en absoluta
      resolve("La ruta es válida");
      //  chequear si la ruta es archivo o directorio
      //directorio se abre y se chequea su contenido para filtrar archivos md
      // archivo pasa  a un array con todos los archivos md
    }
    // si la ruta no existe se rechaza la promesa
    else {
      reject("La ruta no existe");
    }
  });
};
module.exports = {
  mdLinks,
};
