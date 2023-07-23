/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */

const fs = require('fs');
const path = require('path');
const axios = require('axios'); // node

// ________________1.- VERIFICAR SI LA RUTA EXISTE__________________________________________________
const checkPathExists = (ruta) => fs.existsSync(ruta);

// ________________2.- VERIFICAR SI ES RELATIVA O ABSOLUTA, CONVERTIR A ABSOLUTA ___________________
const convertToAbsolutePath = (ruta) => {
  // Verificar si la ruta es relativa
  if (!path.isAbsolute(ruta)) {
    // Convertir la ruta relativa a absoluta
    ruta = path.resolve(ruta);
  }
  return ruta;
};

// _________________3.- ES UN ARCHIVO O DIRECTORIO?_________________________________________________
const IsDirectory = (ruta) => {
  // función fs.statSync() para obtener información sobre la ruta
  const stats = fs.statSync(ruta);

  // Verificar si la ruta es un directorio
  return stats.isDirectory();
};

// ________________ 4.- ES DIRECTORIO, APLICAR RECURSIVIDAD Y DEJAR EN ARRAY []_____________________
const extractMarkdownFiles = (ruta) => {
  const archivosMarkdown = [];

  // Función recursiva para revisar los directorios internos
  const revisarDirectorio = (rutaActual) => {
    // para tener los archivos y directorios dentro de la primera ruta
    const archivos = fs.readdirSync(rutaActual);

    archivos.forEach((archivo) => {
      // generar ruta de cada uno de esos archivos y verificar si es arch o directorio
      const rutaArchivo = path.join(rutaActual, archivo);
      const stats = fs.statSync(rutaArchivo);

      if (stats.isDirectory()) {
        // Si es un directorio, aplicar recursividad rutaArchivo=rutaActual
        revisarDirectorio(rutaArchivo);
      } else if (path.extname(archivo) === '.md') {
        // Si es un archivo .md, agregarlo al array
        archivosMarkdown.push(rutaArchivo);
      }
    });
  };
  // esto es para iniciar el proceso de directorio interno// inicio de recursividad
  revisarDirectorio(ruta);

  return archivosMarkdown;
};

// __________________ 5.- ES ARCHIVO MD?, SI ES DEJAR EN ARRAY, SI NO DEJAR ARRAY VACIO_____________
const isMd = (ruta) => {
  if (path.extname(ruta) === '.md') {
    return [ruta];
  }
  return [];
};

// __________________6.- LEER ARCHIVO Y EXTRAER LINKS_______________________________________________

const ExtLinks = (route) => new Promise((resolve, reject) => {
  fs.readFile(route, 'utf8', (err, data) => {
    if (err) reject(err);
    const regex = /\[(.*?)\]\((?!#)(.*?)\)/g;
    const links = [];
    let match;
    while ((match = regex.exec(data)) !== null) {
      const text = match[1].slice(0, 50);
      const href = match[2];
      const file = route;
      links.push({ file, href, text });
    }
    resolve(links);
  });
});

// ___________________7.- CHECKEAR EL LINK Y VERIFICAR SU HTTP Y STATUS (VALIDATE)______________

const checkLink = (link) => new Promise((resolve) => {
  axios
    .get(link.href)
    .then((response) => {
      link.status = response.status;
      link.ok = response.status >= 200 && response.status < 400 ? 'ok' : 'fail';
      resolve(link);
    })
    .catch((error) => {
      link.status = error.response ? error.response.status : 'fail';
      link.ok = 'fail';
      resolve(link);
    });
});

// ___________________ 8.- STATS ________________________________________________________________

const linkStats = (array, uno) => new Promise((resolve) => {
  const stats = {
    total: array.length,
    unique: new Set(array.map((link) => link.href)).size,
  };
  if (uno === true) {
    stats.broken = array.filter((link) => link.ok === 'fail').length;
  }
  resolve(stats);
});

module.exports = {
  checkPathExists,
  convertToAbsolutePath,
  IsDirectory,
  extractMarkdownFiles,
  isMd,
  ExtLinks,
  checkLink,
  linkStats,
};
