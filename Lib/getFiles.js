import fs from 'fs';
import path from 'path';

export const extractedMD = (route) => {
    const thisRoute = route;
    console.log(thisRoute);
    const arrayMD = [];

    // Función recursiva para revisar los directorios internos
    const checkDirectory = (thisRoute) => {
        //console.log(thisRoute, 4444);
        // para tener los archivos y directorios dentro de la primera ruta
        const filesMD = fs.readdirSync(thisRoute);
        //console.log(archivos, 2222);

        filesMD.forEach((file) => {
            // generar ruta de cada uno de esos archivos y verificar si es archivo o directorio
            const fileRoute = path.join(thisRoute, file);
            const stats = fs.statSync(fileRoute);

            if (stats.isDirectory()) {
                // Si es un directorio, aplicar recursividad rutaArchivo=rutaActual
                checkDirectory(fileRoute);
            } else if (path.extname(file) === '.md') {
                // Si es un archivo .md, agregarlo al array
                arrayMD.push(fileRoute);
            }
        });
    };

    // Inicia la función recursiva
    checkDirectory(thisRoute);

    // Retorna el array de archivos Markdown
    return arrayMD;
};

//console.log(extractedMD('C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\Lib\\Example'));
