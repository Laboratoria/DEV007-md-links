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
} from './funciones.js';

export default function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    if (existenciaDeLaRuta(path)) {
      const pathToWork = rutaAbsoluta(path)
        ? path
        : convirtiendoLaRutaAAbsoluta(path);
      if (rutaEsArchivoMD(pathToWork)) {
        // console.log('La ruta corresponde a un Archivo .md');
        leerArchivoMD(pathToWork)
          .then((contenido) => {
            // console.log(contenido);
            const html = convertirAHtml(contenido);
            // console.log(html);
            console.log(extraerLinks(html, pathToWork), 56);
          })
          .catch((error) => {
            console.log(error);
          });
        resolve(pathToWork);
      } else if (rutaEsDirectorio(pathToWork)) {
        console.log(pathToWork);
        console.log('La ruta corresponde a un Directorio');
        const archivosDirectorio = leerDirectorio(pathToWork);
        archivosDirectorio.forEach((archivo) => {
          leerArchivoMD(archivo)
            .then((contenido) => {
              const html = convertirAHtml(contenido);
              const links = extraerLinks(html, archivo);
              if (links.length > 0) {
                console.log(extraerLinks(html, archivo));
              } else {
                console.log('no se han encontrado archivos');
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
        resolve(archivosDirectorio);
      }
      reject('La ruta no es un Archivo .md ni un directorio.');
    }

    reject('La ruta no existe.');
  });
}

mdLinks(
  'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/DirectorioPrueba',
)
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
// ruta absoluta fuera de proyecto mdLinks 'C:/Users/Acer/Desktop/carpeta'
