//  import node modules
const fs = require("fs");
const path = require("path");
const functions = require("../Isa-mdLinks/functions");
const axios = require("axios");
const colors = require("colors");
//  Create principal function
const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    //  identify if route exists, method is synchronized, boolean
    if (fs.existsSync(route)) {
      resolve;
      console.log("La ruta sí existe".green);
      //  Check type of route(boolean) with .isAbsolute, only if path exists
      if (!functions.pathIsAbsolute(route)) {
        //  transform in absolute path if the return is false(relative)
        userPath = functions.absoluteRoute(route);
      } else {
        //  keep original path
        this.userPath = path;
      }
      //  return path info
      var stats = fs.statSync(userPath);
      //  check if it is a file and if it is a file.md
      if (stats.isFile() && path.extname(userPath) === ".md") {
        //  read file to check if md file contains Link
        fs.readFile(userPath, "utf-8", (err, data) => {
          if (err) {
            console.error(err);
          } else {
            //  !validate!stats logic
            const regex = /\[(.*?)\]\((?!#)(.*?)\)/g;
            const links = [];
            let match;
            while ((match = regex.exec(data)) !== null) {
              const text = match[1].slice(0, 50);
              const href = match[2];
              const file = userPath;
              links.push({ file, href, text });
            }
            if (!options.validate && !options.stats) {
              console.log(
                links,
                "Puedes ingresar el comando --validate para evaluar el estado de los links en el archivo "
              );
            }
            //  Validate logic asyncronic response, define getlinks in a promise, to console after
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
                if (options.validate && !options.stats) {
                  console.log(getLinks);
                }
                // Stats logic
                let totalLinks = 0;
                getLinks.forEach((link) => {
                  if (link) {
                    totalLinks++;
                  }
                });
                let uniqueLinks = 0;
                getLinks.forEach((link) => {
                  // en este links buscar algún repetido
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
                if (options.validate && options.stats) {
                  console.log({
                    Total: totalLinks,
                    Unique: uniqueLinks,
                    Broken: brokenLinks,
                  });
                }
                if (!options.validate && options.stats) {
                  console.log({
                    Total: totalLinks,
                    Unique: uniqueLinks,
                  });
                }
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
    } else {
      //  reject promise if route doesnt exists
      reject;
      console.log("La ruta no existe".red);
    }
  });
};

module.exports = {
  mdLinks,
};
