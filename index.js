//  import node modules
const fs = require("fs");
const path = require("path");
const functions = require("../Isa-mdLinks/functions");
//const chalk = require("chalk");
const axios = require("axios");
//const table = require("table");
const colors = require("colors");

//  Create function
const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    //  identify if route exists, method is synchronized, boolean
    if (fs.existsSync(route)) {
      console.log("la ruta sí existe ".rainbow, "(", route.green, ")");
      //  Check type of route(boolean) with .isAbsolute, only if path exists
      if (!functions.pathIsAbsolute(route)) {
        // if (!path.isAbsolute(path)) {
        //  transform in absolute path if the return is false(relative)
        userPath = functions.absoluteRoute(route);
        //  console.log("la ruta asboluta es: ", userPath, 1.1);
      } else {
        //  else:keep original path
        this.userPath = path;
        //   console.log("la ruta asboluta es: ", userPath, 1.2);
      }
      //  return path info
      var stats = fs.statSync(userPath);
      //  check if it is a file and if it is a file.md
      if (stats.isFile() && path.extname(userPath) === ".md") {
        /*  console.log(
          "¿Es un archivo? => ",
          stats.isFile(),
          "Es un archivo tipo =>",
          path.extname(userPath),
          1.3
        );*/
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
                console.log(getLinks);
                // start with stats logic
                let totalLinks = 0;
                getLinks.forEach((link) => {
                  if (link) {
                    totalLinks++;
                  }
                });
                let uniqueLinks = 0;
                getLinks.forEach((link) => {
                  if (link) {
                    uniqueLinks++;
                  }
                });
                let brokenLinks = 0;
                getLinks.forEach((link) => {
                  if (link.ok === "fail") {
                    brokenLinks++;
                  }
                });
                console.log(
                  "Total:".green,
                  totalLinks,
                  "Unique".blue,
                  uniqueLinks,
                  "Broken:".red,
                  brokenLinks
                );
                console.log({
                  Total: totalLinks,
                  Unique: uniqueLinks,
                  Broken: brokenLinks,
                });
                console.table({
                  Total: totalLinks,
                  Unique: uniqueLinks,
                  Broken: brokenLinks,
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
      resolve(console.log("La ruta sí existe".green), 1.7);
    } else {
      //  reject promise if route doesnt exists
      reject(console.log("La ruta no existe".red));
    }
  });
};

module.exports = {
  mdLinks,
};
