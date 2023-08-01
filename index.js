//  import node modules
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const functions = require("./functions.js");
const MarkdownIt = require("markdown-it")();
const linkify = require("linkify-it");
const markdownLinkExtractor = require("markdown-link-extractor");
//  Create function
const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    //  identify if route exists, method is synchronized, boolean
    if (fs.existsSync(ruta)) {
      // resolve para retornar algo
      //  Check type of route(boolean) with .isAbsolute, only if path exists
      if (!functions.pathIsAbsolute(ruta)) {
        // if (!path.isAbsolute(path)) {
        //  transform in absolute path if the return is false(relative)
        userPath = path.resolve(ruta);
        console.log(userPath, 1);
      } else {
        //  else:keep original path
        this.userPath = path;
        resolve(console.log(userPath));
      }
      //  return path info
      var stats = fs.statSync(userPath);
      resolve(console.log(stats.isFile));
      //  check if it is a file and if it is a file.md
      if (stats.isFile() && path.extname(userPath) === ".md") {
        resolve(console.log("es un archivo válido" + stats.isFile()));
        //  md file goes to an array with de md files
        //  read file to check if md file contains Link
        // readFile lee el texto, es asíncrono, devuelve string con el resultado
        // método de Chris
        fs.readFile(userPath, "utf-8", (res, data) => {
          console.log(data);
        });
        // se debe usar librerias para identificar https
        var md = require("markdown-it")({
          linkify: false,
        });
        //  extract file links
        const { links } = markdownLinkExtractor(markdown);
        links.forEach((link) => console.log(link));
      } else {
        //  open directory to iterate and filter md files
      }
      resolve("La ruta sí existe");
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
console.log(chalk.bgYellow("yellow"));
console.log(linkify);
