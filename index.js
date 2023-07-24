//  import node modules
const fs = require("fs");
const path = require("path");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //  identify if route exists
    if (fs.existsSync(path)) {
      resolve("La ruta es válida");
      //  Check type of route, only if route exists
      const relativePath = process.argv[0];
      //  route absolute with [0] is C:\Program Files\nodejs\node.exe
      //  transforme in absoluteroute
      const absolutePath = path.resolve(relativePath);
      console.log("ruta relativa:", relativePath);
      console.log("ruta absoluta:", absolutePath);
      //  check if is file or directory
      //  open directory to iterate and filter md files
      //  md file goes to an array with de md files
    }
    //  reject promise if route doesnt exists
    else {
      reject("La ruta no existe");
    }
  });
};
//  export of function mdLinks
module.exports = {
  mdLinks,
};
