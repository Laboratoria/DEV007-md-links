//este llamarlo en donde realizaremos las funciones separadas y llamaremos aca app.js
const fs = require("fs");
const path = require("path");
const { checkPathExists, convertToAbsolutePath, extractMarkdownFiles, isDirectory, isMd } = require("./function");


const mdLinks = (path, options) =>{
  //esta funcion debe crear una nueva promesa 
return new Promise((resolve, reject)=>{
  //1.-identificar si la ruta existe
  if(checkPathExists(path)){
    console.log('La ruta existe');
    //2.-Verificar que sea ruta absoluta, si no lo es convertir en absoluta. 
    const absolutePath = convertToAbsolutePath(path);
    console.log('la ruta absoluta es: ', absolutePath);
    //3.-es directorio? 
    let arrayMd=[];
    if(isDirectory(path)){
    // recursividad y extraer archivos .md en un array [];
      arrayMd = extractMarkdownFiles(path);
      console.log('es un directorio', arrayMd);}
      // si es un archivo, es .md? y si es dejar en un array []
      else { arrayMd = isMd(path);
        console.log('es un archivo md?: ', arrayMd)}   
        //4.- Existen archivos .md en la ruta si existen revisar, si no TERMINAR 
    if(arrayMd.length !== 0){
      //revisar los archivos 
      console.log('aqui va a ir funcion para revisar los archivos')
    } else {
      console.log('error no existen documentos .md en la ruta')
    }
  } else{
    console.log('la ruta no existe');
  }
});
};

const route = 'pruebas_md/prueba1.md'

mdLinks(route)


module.exports = {
  mdLinks,
};