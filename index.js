//  import node modules
const fs = require("fs");
const path = require("path");
const functions = require("./functions.js");
//  Create function
const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //  identify if route exists, method is synchronized, boolean
    if (fs.existsSync(path)) {
      // resolve para retornar algo
      resolve("La ruta sí existe");
      //  Check type of route(boolean) with .isAbsolute, only if path exists
      if (!functions.pathIsAbsolute(path)) {
        //  transform in absolute path if the return is false(relative)
        userPath = path.resolve(path);
        console.log(userPath);
      } else {
        //  else:keep original path
        userPath = path;
      }
      //  check if it is file or directory
      var stats = fs.statSync(userPath);
      console.log(stats.isFile);
      //  check if it is a file and if it is a file.md
      if (stats.isFile() && path.extname(userPath) === ".md") {
        console.log("es un archivo válido" + stats.isFile());
        //  md file goes to an array with de md files
        const saveFiles = [];
        saveFiles.push(userPath);
        //  read file to check if md file contains Link
        // este método lee el texto, es asíncrono, devuelve string con el resultado
        // acá hay que buscar la manera de identificar los links
        //  método de un vídeo
        const readText = async (res) => {
          await fs.readFile(userPath, "utf-8");
          console.log(res);
        };
        // método de Chris
        fs.readFile(userPath, "utf-8", (res, data) => {
          console.log(data);
        });
        //  save the links in an array
      } else {
        //  open directory to iterate and filter md files
      }
    } else {
      //  reject promise if route doesnt exists
      reject("¡ERROR! La ruta no existe");
    }
  });
};
console.log(path.extname("README.md"));
//  export function mdLinks
module.exports = {
  mdLinks,
};
console.log(mdLinks("./README.md"));
