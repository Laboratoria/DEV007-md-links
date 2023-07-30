//  import node modules
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const functions = require("./functions.js");
//  Create function
const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //  identify if route exists, method is synchronized, boolean
    if (fs.existsSync(path)) {
      // resolve para retornar algo
      resolve("La ruta sí existe");
      //  Check type of route(boolean) with .isAbsolute, only if path exists
      //if (!functions.pathIsAbsolute(path)) {
      if (!path.isAbsolute(path)) {
        //  transform in absolute path if the return is false(relative)
        userPath = path.resolve(path);
        resolve(console.log(userPath));
      } else {
        //  else:keep original path
        userPath = path;
        console.log(userPath);
      }
      //  check if it is file or directory
      //  return path info
      var stats = fs.statSync(userPath);
      resolve(console.log(stats.isFile));
      //  check if it is a file and if it is a file.md
      if (stats.isFile() && path.extname(userPath) === ".md") {
        resolve(console.log("es un archivo válido" + stats.isFile()));
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
        const saveLinks = [];
      } else {
        //  open directory to iterate and filter md files
      }
    } else {
      //  reject promise if route doesnt exists
      reject("La ruta no existe");
    }
  });
};

//  export function mdLinks
module.exports = {
  mdLinks,
};
console.log(chalk.magenta.bgGreen.bold(path.extname("README.md")));
console.log(chalk.blue(mdLinks("./README.md")));
console.log(chalk.yellow("yellow"));
