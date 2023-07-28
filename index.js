//  import node modules
const fs = require("fs");
const path = require("path");

const mdLinks = (path, options) => {
  //  identify if route exists
  return new Promise((resolve, reject) => {
    if (fs.existsSync(path)) {
      resolve("La ruta es válida");
    }
    //  reject promise if route doesnt exists
    else {
      reject("La ruta no existe");
    }
  });
};
//  export function mdLinks
module.exports = {
  mdLinks,
};
console.log("hola");
