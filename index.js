/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable max-len */
import {
  existenciaDeLaRuta,
  rutaAbsoluta,
  convirtiendoLaRutaAAbsoluta,
  rutaEsArchivoMD,
  rutaEsDirectorio,
  leerArchivoMD,
  convertirAHtml,
  extraerLinks,
  leerDirectorio,
  validarLinks,
  estadisticas,
} from './funciones.js';

export default function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    if (existenciaDeLaRuta(path)) {
      const pathToWork = rutaAbsoluta(path)
        ? path
        : convirtiendoLaRutaAAbsoluta(path);
      if (rutaEsArchivoMD(pathToWork)) {
        console.log('La ruta corresponde a un Archivo .md');
        leerArchivoMD(pathToWork)
          .then((contenido) => {
            // console.log(contenido);
            const html = convertirAHtml(contenido);
            // console.log(html);
            const links = extraerLinks(html, pathToWork);
            if (links.length > 0 && options.validate) {
              validarLinks(links).then((linksValidate) => {
                if (options.stats) {
                  estadisticas(linksValidate);
                }
              });
            } else if (links.length > 0 && !options.validate) {
              console.log(links);
              if (options.stats) {
                estadisticas(links);
              }
            } else {
              reject('No se encontraron Links');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (rutaEsDirectorio(pathToWork)) {
        console.log(pathToWork);
        console.log('La ruta corresponde a un Directorio');
        const archivosDirectorio = leerDirectorio(pathToWork);
        if (archivosDirectorio) {
          if (archivosDirectorio.length) {
            const allLinks = [];
            const promises = archivosDirectorio.map((archivo) =>
              leerArchivoMD(archivo)
                .then((contenido) => {
                  const html = convertirAHtml(contenido);
                  const links = extraerLinks(html, archivo);
                  allLinks.push(links);
                })
                .catch((error) => {
                  console.log(error);
                }),
            );
            Promise.all(promises).then(() => {
              const links = allLinks.flat();
              if (links.length > 0 && options.validate) {
                validarLinks(links).then((linksValidate) => {
                  if (options.stats) {
                    estadisticas(linksValidate);
                  }
                });
              } else if (links.length > 0 && !options.validate) {
                console.log(links);
                if (options.stats) {
                  estadisticas(links);
                }
              } else {
                reject('No se encontraron Links');
              }
            });
          } else {
            console.log('No se encontraron archivos .md');
          }
        } else {
          reject('El directorio esta vacio');
        }
      } else {
        reject('La ruta no es un Archivo .md ni un directorio.');
      }
    } else {
      reject('La ruta no existe.');
    }
  });
}

// ruta absoluta 'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/READMEE.md'
// ruta relativa 'READMEE.md'
// ruta no existe 'REAMEE.md'
// ruta RELATIVA DIRECTORIO 'DirectorioPrueba'
// ruta ABSOLUTA DIRECTORIO 'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/DirectorioPrueba'
// ruta absoluta fuera de proyecto mdLinks 'C:/Users/Acer/Desktop/carpeta'

// options --validate --start
