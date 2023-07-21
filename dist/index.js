"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;
var fs = require('fs');
var mdLinks = function mdLinks(path, options) {
  return new Promise(function (resolve, reject) {
    // Primero le pasamos la ruta del archivo con o sin opcion
    // Revisamos si la ruta existe
    // Si no existe, devolvemos "la ruta no existe"
    // Si existe revisamos si la ruta es relativa o absoluta
    // Si la ruta es relativa tenemos que convertirla a absoluta
    // Si la ruta es absoluta Revisamos la opcion que se marco, y devuelve un arreglo de objetos
    // Si la opcion fue TRUE entonces se hace una consulta a HTTP para confirmar si la ruta sirve.
    // Si la ruta sirve devuelve OK en la informacion de la ruta dentro del objeto
    // Si la ruta no sirve devuelve FAIL en la informacion de la ruta dentro del objeto
    // Si se marco la opcion FALSE o no se marco opcion devuelve un arreglo de objetos con la informacion de las rutas sin verificar
    if (fs.existsSync(path)) {
      // resolve('la ruta existe');
    } else {
      reject('la ruta no existe');
    }
  });
};

// module.exports = () => {
//   // ...
// };
exports.mdLinks = mdLinks;
