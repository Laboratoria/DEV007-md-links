// ver si la ruta existe ()
const fs = require('fs');
const path = require('path');

// 1.- Verificar si la ruta existe
const checkPathExists = (ruta) => {
  return fs.existsSync(ruta)}

// 2.- cambiar a absoluta
const convertToAbsolutePath = (ruta) => {
  // Verificar si la ruta es relativa
  if (!path.isAbsolute(ruta)) {
    // Convertir la ruta relativa a absoluta
    ruta = path.resolve(ruta);
  }
  return ruta;
};


// es un archivo o es directorio (true directorio)
const isDirectory = (ruta) => {
  // Utilizar la función fs.statSync() para obtener información sobre la ruta
  const stats = fs.statSync(ruta);

  // Verificar si la ruta es un directorio
  return stats.isDirectory();
};

// es directorio =  aplicar recursividad- extraer archivos .md, dejar en array y si esta vacio TERMINAR
const extractMarkdownFiles = (ruta) => {
  let archivosMarkdown = [];

  // Función recursiva para revisar los directorios internos
  const revisarDirectorio = (rutaActual) => {
    const archivos = fs.readdirSync(rutaActual);

    archivos.forEach((archivo) => {
      const rutaArchivo = path.join(rutaActual, archivo);
      const stats = fs.statSync(rutaArchivo);

      if (stats.isDirectory()) {
        // Si es un directorio, aplicar recursividad
        revisarDirectorio(rutaArchivo);
      } else if (path.extname(archivo) === '.md') {
        // Si es un archivo .md, agregarlo al array
        archivosMarkdown.push(rutaArchivo);
      }
    });
  };

  revisarDirectorio(ruta);

  return archivosMarkdown;
};

// Es archivo revisar si es .md si no dejar en un array vacio para posteriormente TERMINAR...
const isMd = (ruta) =>{
  if( path.extname(ruta) === '.md'){
    return [ruta];
  }else {
    return [];
  }
}


module.exports = {
  checkPathExists,
  convertToAbsolutePath,
  isDirectory,
  extractMarkdownFiles,
  isMd,
};