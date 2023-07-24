/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable max-len */
import {
  existenciaDeLaRuta,
  rutaAbsolutaRelativa,
  convirtiendoLaRutaAAbsoluta,
  rutaEsArchivoMD,
  rutaEsDirectorio,
  leerArchivoMD,
  convertirAHtml,
  extraerLinks,
} from './funciones.js';

export default function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    if (existenciaDeLaRuta(path)) {
      if (rutaAbsolutaRelativa(path)) {
        console.log('La ruta es absoluta.');
        if (rutaEsArchivoMD(path)) {
          console.log('La ruta corresponde a un Archivo .md');
          leerArchivoMD(path)
            .then((contenido) => {
              console.log(contenido);
              const html = convertirAHtml(contenido);
              console.log(html);
              console.log(extraerLinks(html, path));
            })
            .catch((error) => {
              console.log(error);
            });
          resolve(path);
        } else if (rutaEsDirectorio(path)) {
          console.log('La ruta corresponde a un Directorio');
          resolve(path);
        }
      } else {
        console.log('La ruta es relativa, conviertiendo la ruta a absoluta...');
        const absoluta = convirtiendoLaRutaAAbsoluta(path);
        console.log(absoluta);
        if (rutaEsArchivoMD(absoluta)) {
          console.log('La ruta corresponde a un Archivo .md');
          leerArchivoMD(absoluta)
            .then((contenido) => {
              console.log(contenido);
              const html = convertirAHtml(contenido);
              console.log(html);
              console.log(extraerLinks(html, absoluta));
            })
            .catch((error) => {
              console.log(error);
            });
          resolve(path);
        } else if (rutaEsDirectorio(absoluta)) {
          console.log('La ruta corresponde a un Directorio');
          resolve(absoluta);
        }
        reject('La ruta no es un Archivo .md ni un Directorio');
      }
    }
    reject('La ruta no existe.');
  });
}

mdLinks('C:/Users/Acer/Desktop/carpeta')
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// ruta absoluta 'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/READMEE.md'
// ruta relativa 'READMEE.md'
// ruta no existe 'REAMEE.md'
// ruta RELATIVA DIRECTORIO 'DirectorioPrueba'
// ruta ABSOLUTA DIRECTORIO 'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/DirectorioPrueba'
