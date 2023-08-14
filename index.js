//---------IMPORTAMOS-----------------
// const fs = require("fs");
import fs from "fs";
// const path = require("path");
import path from "path";
import { pathIsAbsolute } from "./functions.js";
import chalk from "chalk";
import axios from "axios";

// ----------agregamos rutas--------------
// SABER SI UN ARCHIVO EXISTE EN NODE.JS (Módulo FS)
export const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    let userPath;
    // resolve (callback, son funciones): Cuando se resuelve la promesa-then, reject: es rechazada la promesa-catch
    // -----------la ruta existe------------
    if (fs.existsSync(ruta)) {
      // resolve es para retornar algo.--------
      resolve("La ruta sí existe");
      // checar o Convertir a una ruta absoluta.
      // ------------Convertimos la ruta relativa en absoluta.------------------
      if (!pathIsAbsolute(ruta)) {
        userPath = path.resolve(ruta);
        console.log(chalk.magenta(userPath), 1);
      } else {
        userPath = ruta;
      }
      // ---------Es archivo?----------
      var stats = fs.statSync(userPath);
      if (stats.isFile()) {
        console.log(chalk.blue("es un archivo: " + stats.isFile()), 2);
        // ---------Es un archivo .md?-----------
        // ---------Extname
        if (path.extname(userPath) === ".md") {
          console.log(
            chalk.green("es un archivo tipo .md: " + stats.isFile()),
            3
          );
          // ---------Extraemos links del archivo--------------------
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
              if (!options.validate && !options.stats) {
                console.log(links);
                return;
              }
              // -------------iniciamos con la validación de Options-----------
              const axiosPromises = links.map((link) => {
                return axios
                  .get(link.href)
                  .then(function (response) {
                    return {
                      ...link,
                      status: response.status,
                      ok: response.status === 200 ? "ok✔" : "fail",
                    };
                  })
                  .catch(() => {
                    return { ...link, status: 400, ok: "fail" };
                  });
              });
              // ------------se define una variable de links y se imprime en la promesa-------
              Promise.all(axiosPromises)
                .then((results) => {
                  const getLinks = results;
                  if (options.validate && !options.stats) {
                    console.log(options, 88);
                  }
                  // console.table(getLinks);
                  // -----------------Iniciamos con stats------------------
                  let totalLinks = 0;
                  getLinks.forEach((link) => {
                    if (link) {
                      totalLinks++;
                    }
                    // console.log(`Links totales: ${totalLinks}`, 6.1);
                    // Links totales
                  });
                  let brokenLinks = 0;
                  getLinks.forEach((link) => {
                    if (link.ok === "fail") {
                      brokenLinks++;
                    }
                    // console.log(`Links rotos: ${brokenLinks}`, 6.2);
                    // Links rotos
                  });
                  // -------------------Mostrar Links que únicos--------------
                  /*let uniqueLinks = 0;
                  getLinks.forEach((link) => {
                    if (link) {
                      uniqueLinks++;
                    }
                  });*/
                  const uniqueLinks = new Set(getLinks.map((link) => link.href))
                    .size;
                  console.log(getLinks);
                  if (!options.validate && options.stats) {
                    console.table({
                      Total: totalLinks,
                      Unique: uniqueLinks,
                    });
                  }
                  if (options.validate && options.stats) {
                    console.table({
                      Total: totalLinks,
                      Unique: uniqueLinks,
                      Broken: brokenLinks,
                    });
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
              return;
            }
          });
        }
      }
    } else {
      // Si no existe la ruta rechaza la promesa.
      reject("¡ERROR! La ruta no existe");
    }
  });
};
