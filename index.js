//  import node modules
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const axios = require("axios");

//  Create function
const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    //  identify if route exists, method is synchronized, boolean
    if (fs.existsSync(route)) {
      console.log(
        chalk.green("la ruta sí existe "),
        chalk.gray("(", route, ")"),
        1.0
      );
      //  Check type of route(boolean) with .isAbsolute, only if path exists
      if (!path.isAbsolute(route)) {
        // if (!path.isAbsolute(path)) {
        //  transform in absolute path if the return is false(relative)
        userPath = path.resolve(route);
        console.log(chalk.blueBright("la ruta asboluta es: "), userPath, 1.1);
      } else {
        //  else:keep original path
        this.userPath = path;
        console.log(chalk.blueBright("la ruta asboluta es: "), userPath, 1.2);
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
            //  start with validate logic
            // asyncronic response, define getlinks in a promise, to console after
            const axiosPromises = links.map((link) => {
              return axios
                .get(link.href)
                .then(function (response) {
                  return {
                    ...link,
                    status: response.status,
                    ok: response.status === 200 ? "ok" : "fail",
                  };
                })
                .catch(() => {
                  return { ...link, status: 400, ok: "fail" };
                });
            });
            Promise.all(axiosPromises)
              .then((results) => {
                const getLinks = results;
                console.log(getLinks), 4;
                // start with stats logic
                let totalLinks = 0;
                getLinks.forEach((link) => {
                  if (link) {
                    totalLinks++;
                  }
                  console.log("Links totales => ", totalLinks, 19);
                });
                let brokenLinks = 0;
                getLinks.forEach((link) => {
                  if (link.ok === "fail") {
                    brokenLinks++;
                  }
                  console.log("Links rotos => ", brokenLinks, 9);
                });
              })
              .catch((err) => {
                console.error(err);
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

module.exports = {
  mdLinks,
};
/*console.log(chalk.magenta.bgGreen.bold(path.extname("README.md")));
console.log(chalk.blue(mdLinks("./README.md")));
console.log(chalk.bgYellow("yellow"));
console.log(linkify);*/
/*           const brokenLinks = [];
                  if (getLinks.status === "fail") {
                    brokenLinks.push(getLinks.href);
                    console.log(brokenLinks, 65);
                  }*/
