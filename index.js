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
    if (path) {
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
              console.log(`Se encontraron ${links.length} links en el archivo`);
              if (links.length > 0 && options.validate) {
                validarLinks(links).then((linksValidate) => {
                  if (options.stats) {
                    estadisticas(linksValidate);
                    resolve('');
                  } else {
                    console.log(
                      'Para obtener estadisticas agregre comando --stats',
                    );
                  }
                });
              } else if (links.length > 0 && !options.validate) {
                console.log(links);
                if (options.stats) {
                  estadisticas(links);
                  resolve(
                    'Si necesita validar los links agregue comando --validate',
                  );
                } else {
                  console.log(
                    'Para validar los links agrege comando --validate',
                  );
                  reject('Para Obtener estadisticas agregue comando --stats');
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
          console.log('Leyendo archivos...');
          const archivosDirectorio = leerDirectorio(pathToWork);
          if (archivosDirectorio) {
            if (archivosDirectorio.length) {
              console.log(
                `Se encontraron ${archivosDirectorio.length} archivos .md`,
              );
              const allLinks = [];
              const promises = archivosDirectorio.map((archivo) =>
                leerArchivoMD(archivo)
                  .then((contenido) => {
                    const html = convertirAHtml(contenido);
                    const links = extraerLinks(html, archivo);
                    const rutaRelativa = archivo.split('\\');
                    console.log(
                      `Se encontraron ${links.length} links en el archivo ${
                        rutaRelativa[rutaRelativa.length - 1]
                      }`,
                    );
                    allLinks.push(links);
                  })
                  .catch((error) => {
                    console.log(error);
                  }),
              );
              Promise.all(promises).then(() => {
                const links = allLinks.flat();
                console.log(
                  `Se encontraron ${links.length} links en total es este Directorio`,
                );
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
      } else if (path.includes('--validate') || path.includes('--stats')) {
        reject(
          'Debe ingresar una ruta antes de las Opciones --validate o --stats',
        );
      } else {
        reject('La ruta no existe.');
      }
    } else {
      console.log('Bienvenido a MdLinks');
      console.log('Esta es una libreria para obtener links de un archivo .md');
      console.log('Pasos:');
      console.log(
        '1- Ejecuta comando npx mdLinks + ruta (del archivo o carpeta) ',
      );
      console.log(
        'o bien solo mdLinks mas la ruta (si realizaste npm install global)',
      );
      console.log(
        '2- Obtendras el resultado de los links encontrados con sus propiedades text, href y file',
      );
      console.log(
        '3- Si deseas validar o recibir estadisticas ademas puedes ejecutar:',
      );
      console.log(
        'npx mdLinks <ruta> --validate o mdLinks <ruta> --validate (para validar los links) ',
      );
      console.log(
        'npx mdLinks <ruta> --stats o mdLinks <ruta> --stats (para recibir estadisticas) ',
      );
      reject('puedes usar --validate y --stats simultaneamente');
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
