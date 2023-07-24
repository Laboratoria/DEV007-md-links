import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import * as cheerio from 'cheerio';
// import parse5 from 'parse5'

// existe la ruta

// eslint-disable-next-line consistent-return
export function existenciaDeLaRuta(ruta) {
  if (fs.existsSync(ruta)) return ruta;
}

// ruta absoluta o relativa

// eslint-disable-next-line consistent-return
export function rutaAbsolutaRelativa(ruta) {
  if (path.isAbsolute(ruta)) return ruta;
}

// convertir la ruta relativa a absoluta

export function convirtiendoLaRutaAAbsoluta(ruta) {
  return path.resolve(ruta);
}

// // la ruta un archivo o un directorio

// // eslint-disable-next-line consistent-return
// // export function rutaArchivoDirectorio(ruta) {
// //   if (path.extname(ruta).includes('.')) return ruta;
// // }

// es un archivo .md
// eslint-disable-next-line consistent-return
export function rutaEsArchivoMD(archivo) {
  if (path.extname(archivo).includes('.md')) return archivo;
}

// la ruta es un directorio
// eslint-disable-next-line consistent-return
export function rutaEsDirectorio(directorio) {
  if (fs.statSync(directorio).isDirectory()) return directorio;
}

// leer archivo .md
export function leerArchivoMD(archivoMD) {
  return new Promise((resolve, reject) => {
    fs.readFile(archivoMD, 'utf-8', (error, contenido) => {
      resolve(contenido);
      reject(error);
    });
  });
}
// convertir archivo .md a html

export function convertirAHtml(contenido) {
  return marked(contenido, { mangle: false, headerIds: false });
}

// extraer Links y devolver links e informacion de Links de archivo Html

export function extraerLinks(html, file) {
  const $ = cheerio.load(html);

  const links = [];
  $('a').each((index, element) => {
    const text = $(element).text();
    const href = $(element).attr('href');
    const linkInfo = { TEXT: text, HREF: href, FILE: file };
    links.push(linkInfo);
  });

  return links;
}

//---------------------------------------------------------
// leer directorio y leer archivos y carpetas (recursividad)
const archivos = [];
export function leerDirectorio(directorio) {
  const intoDir = fs.readdirSync(directorio);
  if (!intoDir.length) {
    console.log(`El directorio ${directorio} esta vacio`, 15);
  } else {
    intoDir.forEach((element) => {
      // eslint-disable-next-line max-len
      const dir = path.join(directorio, element); // Utilizamos path.join() para obtener la ruta completa del archivo o carpeta
      if (fs.statSync(dir).isFile() && path.extname(element).includes('.md')) {
        // eslint-disable-next-line max-len
        archivos.push(dir); // Agregamos la ruta completa del archivo .md al arreglo de archivos
      } else if (fs.statSync(dir).isDirectory()) {
        // eslint-disable-next-line max-len
        leerDirectorio(dir); // Llamamos recursivamente a la funcion para leer los archivos y carpetas dentro de esta carpeta
      }
    });
  }
}
