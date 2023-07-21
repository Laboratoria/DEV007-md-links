/* eslint-disable max-len */
import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import * as cheerio from 'cheerio';
// import parse5 from 'parse5'

// existe la ruta

export function existenciaDeLaRuta(ruta){                         
    if (fs.existsSync(ruta)) {                              
      console.log(`la ruta ${ruta} SI existe`, 1);
    }else {
      console.log(`la ruta ${ruta} NO existe`, 2);
    }
}

// ruta absoluta o relativa

export function rutaAbsolutaRelativa(ruta){
    if (path.isAbsolute(ruta)) {                           
        console.log('la ruta es absoluta', 3);
        return ruta;
    }else{
        console.log('la ruta es relativa', 4);
    }
}

// convertir la ruta relativa a absoluta

export function convirtiendoLaRutaAAbsoluta(ruta){
    const absoluta = path.resolve(ruta);                 
    console.log(absoluta, 5)
    return  absoluta ;
}

// la ruta un archivo o un directorio

// eslint-disable-next-line max-len
const rutaDirectorio = 'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links'

function rutaArchivoDirectorio(ruta){
if (path.extname(ruta).includes('.')) {              
    console.log('la ruta es un archivo', 6);
}
else{
    console.log('la ruta es un directorio', 7);
}
}

// es un archivo .md
export function rutaEsArchivoMD(archivo){
    if (path.extname(archivo).includes('.md')) {
        console.log('la ruta SI es un archivo .md', 8);
    }else{
    console.log('la ruta NO es un archivo .md', 9);
    }
}


// leer archivo .md 

export function leerArchivoMD(archivoMD){
    return new Promise((resolve, rej)=>{
        fs.readFile(archivoMD, 'utf-8', (error, contenido) => {
            resolve (contenido)
            rej(error)
        })
    })
}

// convertir archivo .md a html

export function convertirAHtml(contenido){
    const html = marked(contenido, {mangle: false, headerIds: false })
    return html
}

// // extraer Links e informacion de Links de archivo Html

export function extraerLinks(html, file) {
  const $ = cheerio.load(html);

  const links = [];
  $("a").each((index, element) => {
    const text = $(element).text(); 
    const href = $(element).attr("href");
    const linkInfo = { TEXT: text, HREF: href, FILE: file }; 
    links.push(linkInfo);
  });

  return links;
}

//---------------------------------------------------------
// leer directorio y leer archivos y carpetas (recursividad)
const archivos = []
export function leerDirectorio(directorio) {
    
    const intoDir = fs.readdirSync(directorio);
    if (!intoDir.length) {
      console.log(`El directorio ${directorio} esta vacio`, 15);  
    } else {
        intoDir.forEach((element) => {
            // eslint-disable-next-line max-len
            const dir = path.join(directorio, element); // Utilizamos path.join() para obtener la ruta completa del archivo o carpeta
            if (fs.statSync(dir).isFile() && path.extname(element).includes('.md')) {
              archivos.push(dir); // Agregamos la ruta completa del archivo .md al arreglo de archivos
            } else if (fs.statSync(dir).isDirectory()) {
              leerDirectorio(dir); // Llamamos recursivamente a la funcion para leer los archivos y carpetas dentro de esta carpeta
            }
          });
        }
  }

  leerDirectorio('C:/Users/Acer/Desktop/carpeta')
  console.log(archivos)
  

