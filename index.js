const { ExtractLinks } = require("markdown-link-extractor");
const fs = require("fs");
const path = require("path");

const mdLinks = (inputPath = process.argv[2]) => {
  return new Promise((resolve, reject) => {
    // DF 1
    // Check if the path exists.
    if (fs.existsSync(inputPath)) {
      // DF 2
      // Check if a path is absolute
      if (!path.isAbsolute(inputPath)) {
        // DF 3
        // Convert the path to an absolute path
        const absolutePath = path.resolve(inputPath);
        console.log(absolutePath);
        resolve(absolutePath);

        // DF 4
        // Check if it is a directory and read it
        const isDirectory = fs.statSync(absolutePath).isDirectory();
        if (isDirectory === true) {
          // aqui exploro el directorio
          const getMdFiles = (dirPath) => {
            // DF 5
            const files = fs.readdirSync(dirPath); // aqui tengo lista de archivos/subdirectorios(S/A)
            files.forEach((file) => {
              // recorro esa lista
              const filePath = path.join(dirPath, file); // aqui defino la ruta de cada archivo
              const isSubDirectory = fs.statSync(filePath).isDirectory();
              if (isSubDirectory) {
                getMdFiles(filePath); // aqui entra mi exploracion de sub directorios (recursividad)
              } else if (path.extname(filePath) === ".md") {
                // es un archivo .md?
                console.log(filePath);
              }
            });
          };
          getMdFiles(absolutePath);
        }
      } else if (path.extname(inputPath) === ".md") {
        console.log(inputPath);
      } else {
        reject("The path does not exist .md file");
      }
      resolve(inputPath); //aqui resuelvo la promesa de mi funcion mdLink
    } else {
      reject("The path doesn't exist");
    }
  }).catch((error) => {
    console.log(error);
  });
};

module.exports = {
  mdLinks,
};

mdLinks();



