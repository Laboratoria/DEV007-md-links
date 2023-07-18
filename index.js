const { ExtractLinks } = require("markdown-link-extractor");
const fs = require("fs"); // para los archivos
const path = require("path"); //para las rutas
const colors = require('colors'); // para el estilo (color)

// Mdlink Function
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
        // console.log(colors.grey(absolutePath));
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
                // console.log(colors.magenta(filePath));
                readMarkdownFile(filePath);
              }
            });
          };
          getMdFiles(absolutePath);
        }
      } else if (path.extname(inputPath) === ".md") {
        readMarkdownFile(absolutePath);
        // console.log(inputPath);
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



// DF 7 read md.links 
const readMarkdownFile = (filePath) => {
  console.log(colors.green.underline(filePath)); 
  const fileContent = fs.readFileSync(filePath, "utf-8"); 
  const regex = /\[([^\]]+)\]\(([^\)]+)\)/g; // declaro una expresion regular para los Links MD
  const links = []; // donde quiero almacenar
  let match;
  while ((match = regex.exec(fileContent)) !== null) { // ciclo de busqueda de links con el metodo .exe
    const text = match[1];
    const href = match[2];
    links.push({ text, href }); // pucheo cada links en mi arreglo
  }

  // [Markdown](https://es.wikipedia.org/wiki/Markdown) 
  // 1 text ([^\]]+)          href ([^\)]+)

  const filteredLinks = links.filter((link) => !/\d+/.test(link.text)); // dejo o filtro los enlases quitando los que tiene numeros
  filteredLinks.forEach((link) => {
    console.log(colors.cyan(link.href)); //aqui solo estosy imprimiendo el URL para ver en consola
  });
};


module.exports = {
  mdLinks,
};

mdLinks();





