//  import node modules
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const functions = require("./functions.js");
const markdownLinkExtractor = require("markdown-link-extractor");
const axios = require("axios");
const { get } = require("http");
//  Create function
const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    //  identify if route exists, method is synchronized, boolean
    if (fs.existsSync(ruta)) {
      console.log(
        chalk.green("la ruta sí existe "),
        chalk.gray("(", ruta, ")"),
        1.0
      );
      // resolve para retornar algo
      //  Check type of route(boolean) with .isAbsolute, only if path exists
      if (!functions.pathIsAbsolute(ruta)) {
        // if (!path.isAbsolute(path)) {
        //  transform in absolute path if the return is false(relative)
        userPath = path.resolve(ruta);
        console.log(chalk.blueBright("la ruta asboluta es: "), userPath, 1.1);
      } else {
        //  else:keep original path
        this.userPath = path;
        console.log(chalk.blueBright("la ruta asboluta es: "), userPath, 1.12);
      }
      //  return path info
      var stats = fs.statSync(userPath);
      //  check if it is a file and if it is a file.md
      if (stats.isFile() && path.extname(userPath) === ".md") {
        console.log(
          chalk.blueBright("¿Es un archivo? => "),
          chalk.greenBright(stats.isFile()),
          chalk.blueBright("Es un archivo tipo =>"),
          chalk.gray(path.extname(userPath)),
          1.3
        );
        //  read file to check if md file contains Link
        fs.readFile(userPath, "utf-8", (err, data) => {
          if (err) {
            console.error(err);
          } else {
            const regex = /\[(.*?)\]\((?!#)(.*?)\)/g;
            const links = [];
            let match;
            while ((match = regex.exec(data)) !== null) {
              const text = match[1].slice(0, 50);
              const href = match[2];
              const file = userPath;
              links.push({ file, href, text });
            }
            //  start with validate functions
            const getLinks = [];
            links.forEach((link) => {
              axios
                .get(link.href)
                .then(function (response) {
                  getLinks.push({
                    ...link,
                    status: response.status,
                    ok: response.status === 200 ? "ok" : "fail",
                  });
                  console.log(getLinks, 4);
                  //  start with stats function
                  const brokenLinks = [];
                  if (getLinks.status === "fail") {
                    brokenLinks.push(getLinks.href);
                    console.log(brokenLinks, 65);
                  }
                })
                .catch((err) => {
                  getLinks.push({ ...link, status: 400, ok: "fail" });
                });
            });
          }
        });
      } else {
        //  open directory to iterate and filter md files
        //  md file goes to an array with de md files
        // return to read file
      }
      resolve(console.log(chalk.green("La ruta sí existe"), 1.7));
    } else {
      //  reject promise if route doesnt exists
      reject(console.log(chalk.red("La ruta no existe"), 2.0));
    }
  });
};

//  export function mdLinks
module.exports = {
  mdLinks,
};
/*console.log(chalk.magenta.bgGreen.bold(path.extname("README.md")));
console.log(chalk.blue(mdLinks("./README.md")));
console.log(chalk.bgYellow("yellow"));
console.log(linkify);*/
