"use strict";

var _path = _interopRequireDefault(require("path"));
var _fs = require("fs");
var _library = require("./library.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Módulo path de Node.js

// Módulo fs de Node.js

const optionTerminal = {
  validate: process.argv.includes("--validate"),
  // Verifica si se proporcionó la opción --validate
  stats: process.argv.includes("--stats") // Verifica si se proporcionó la opción --stats
};

const filePathTerminal = process.argv[2]; // Obtiene el primer argumento después del nombre del archivo

function mdLinks(filePath) {
  const absolutePath = _path.default.resolve(process.cwd(), filePath);
  return _fs.promises.stat(absolutePath).then(metadata => {
    //Falta directorio

    if (metadata.isFile() && _path.default.extname(absolutePath) === ".md") {
      return (0, _library.extractLinksFromFile)(absolutePath);
    } else {
      throw new Error("La ruta debe ser un archivo Markdown o un directorio.");
    }
  }).catch(() => {
    throw new Error("La ruta debe ser un archivo Markdown o un directorio.");
  });
}

// Ejecución principal del programa
mdLinks(filePathTerminal).then(links => {
  console.log("Links:", links);
}).catch(error => {
  console.log("Error:", error);
});