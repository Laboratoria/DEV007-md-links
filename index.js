const { ExtractLinks } = require("markdown-link-extractor");
const fs = require("fs"); // para los archivos
const path = require("path"); // para las rutas
const colors = require("colors"); // para el estilo (color)
const axios = require("axios"); // para hacer solicitudes HTTP

// Mdlink Function
const mdLinks = (inputPath = process.argv[2], options = { validate: false, stats: false }) => {
  return new Promise((resolve, reject) => {
    // DF 1
    // Check if the path exists.
    if (!fs.existsSync(inputPath)) {
      reject("The path doesn't exist");
      return;
    }

    // DF 2
    // Check if a path is absolute
    if (!path.isAbsolute(inputPath)) {
      // DF 3
      // Convert the path to an absolute path
      inputPath = path.resolve(inputPath);
    }

    // DF 4
    // Check if it is a directory and read it
    const isDirectory = fs.statSync(inputPath).isDirectory();
    if (isDirectory === true) {
      // aqui exploro el directorio
      const getMdFiles = (dirPath) => {
        // DF 5 Read a directory (recursivity)
        const files = fs.readdirSync(dirPath); // aqui tengo lista de archivos/subdirectorios(S/A)
        const promises = [];
        files.forEach((file) => {
          // recorro esa lista
          const filePath = path.join(dirPath, file); // aqui defino la ruta de cada archivo
          const isSubDirectory = fs.statSync(filePath).isDirectory();
          if (isSubDirectory) {
            promises.push(getMdFiles(filePath)); // aqui entra mi exploracion de sub directorios (recursividad)
            // DF 6 Does is a md file?
          } else if (path.extname(filePath) === ".md") {
            promises.push(readMarkdownFile(filePath, options));
          }
        });
        return Promise.all(promises);
      };

      getMdFiles(inputPath)
        .then((links) => {
          const allLinks = links.flat();
          if (options.validate) {
            const linkPromises = allLinks.map((link) => validateLink(link));
            return Promise.all(linkPromises);
          } else {
            return allLinks;
          }
        })
        .then((result) => {
          if (options.stats && options.validate) {
            printValidateAndStats(result, resolve);
          } else if (options.stats) {
            printStats(result);
          } else if (options.validate) {
            resolve(result);
          } else {
            resolve(result);
          } 
        })
        .catch((error) => {
          reject(error);
        });
      } else if (path.extname(inputPath) === ".md"){ 
        readMarkdownFile(inputPath, options)
          .then((links) => {
            if (options.stats && options.validate) {
              printValidateAndStats(result, resolve);
            } else if (options.stats && !options.validate) {
              printStats(links);
            } else if (options.validate) {
              resolve(result);
            } else {
              resolve(links);
            }
          }) 
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("The path does not exist .md file");
      }
    });
  };

// DF 7 read md.links
const readMarkdownFile = (filePath, options) => {
  return new Promise((resolve, reject) => {
    //console.log(colors.green.underline(filePath));
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const regex = /\[([^\]]+)\]\(([^\)]+)\)/g; // declaro una expresion regular para los Links MD
    const links = []; // donde quiero almacenar
    let match;
    while ((match = regex.exec(fileContent)) !== null) {
      // ciclo de busqueda de links con el metodo .exec
      const text = match[1];
      const href = match[2];
      // links.push({ text, href }); // pucheo cada link en mi arreglo
      links.push({ text, href, file: filePath }); // pucheo cada link en mi arreglo
    }
    // console.log(links);

    // DF 8
    const filteredLinks = links.filter((link) => !/\d+/.test(link.text)); // dejo o filtro los enlaces quitando los que tienen números
    // console.log(filteredLinks);
    if (options.validate) {  // Validate
      const linkPromises = filteredLinks.map((link) => validateLink(link));
      Promise.all(linkPromises)
        .then((validatedLinks) => {
          if (options.stats) {  // Stats
            printStatsWithBroken(validatedLinks);
          } else {
            resolve(validatedLinks);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } else if (options.stats) {  // Stats
      printStats(filteredLinks);
    } else {
      resolve(filteredLinks);
    }
  });
};

// DF 8 Validate links
const validateLink = (link) => {
  return new Promise((resolve, reject) => {
    axios
      .get(link.href)
      .then((response) => {
        link.status = response.status;
        link.ok = response.statusText === "OK" ? "ok" : "fail";
        resolve(link);
      })
      .catch((error) => {
        link.status = "Unknown";
        link.ok = "fail";
        resolve(link);
      });
  });
};

// DF 9 StatsLinks Function
const statsLinks = (links) => {
  return {
    Total: links.length,
    Unique: new Set(links.map((link) => link.href)).size,
  };
};

// DF 10 StatsLinks & ValidateLinks Function
const statsValidatelinks = (links) => {
  const fails = links.filter(link => link.ok === 'fail').length;
  return {
    Total: links.length,
    Unique: new Set(links.map((link) => link.href)).size,
    Broken: fails
  };
};

// DF 11 PrintStats Functions
const printStats = (links) => {
  const stats = statsLinks(links);
  console.log(`Total: ${stats.Total}`);
  console.log(`Unique: ${stats.Unique}`);
};

const printStatsWithBroken = (links) => {
  const stats = statsValidatelinks(links);
  console.log(`Total: ${stats.Total}`);
  console.log(`Unique: ${stats.Unique}`);
  console.log(`Broken: ${stats.Broken}`);
};

//
 const printValidateAndStats = (links, resolve) => {
  resolve(links);
  printStatsWithBroken(links);
 }

module.exports = {
  mdLinks,
  statsLinks,
  statsValidatelinks,
};

