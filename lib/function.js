/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */

const fs = require('fs');
const path = require('path');
const axios = require('axios'); // node

// 1.- Verificar si la ruta existe--------------------------------------
const checkPathExists = (ruta) => fs.existsSync(ruta);

// 2.- cambiar a absoluta-----------------------------------------------
const convertToAbsolutePath = (ruta) => {
  // Verificar si la ruta es relativa
  if (!path.isAbsolute(ruta)) {
    // Convertir la ruta relativa a absoluta
    ruta = path.resolve(ruta);
  }
  return ruta;
};

// 3.- es un archivo o es directorio (true directorio)------------------
const IsDirectory = (ruta) => {
  // función fs.statSync() para obtener información sobre la ruta
  const stats = fs.statSync(ruta);

  // Verificar si la ruta es un directorio
  return stats.isDirectory();
};

/* 4.- es directorio =  aplicar recursividad- extraer archivos .md,
dejar en array y si esta vacio TERMINAR */
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

// 5.- Es archivo = revisar si es .md, si no, dejar en un array vacio y TERMINAR...
const isMd = (ruta) => {
  if (path.extname(ruta) === '.md') {
    return [ruta];
  }
  return [];
};

// Leer archivo:

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

// Checkear el link y verificar su HTTP y status

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



module.exports = {
  checkPathExists,
  convertToAbsolutePath,
  IsDirectory,
  extractMarkdownFiles,
  isMd,
  ExtLinks,
  checkLink,
};
