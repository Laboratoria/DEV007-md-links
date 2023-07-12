// Módulo path de Node.js
import path from "path";
// Módulo fs de Node.js
import { promises as fs } from "fs";
import {  extractLinksFromFile } from "./library.js";

const optionTerminal = {
  validate: process.argv.includes("--validate"), // Verifica si se proporcionó la opción --validate
  stats: process.argv.includes("--stats"), // Verifica si se proporcionó la opción --stats
};

const filePathTerminal = process.argv[2]; // Obtiene el primer argumento después del nombre del archivo

function mdLinks(filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath);

  return fs
    .stat(absolutePath)
    .then((metadata) => {
      //Falta directorio

      if (metadata.isFile() && path.extname(absolutePath) === ".md") {
        return extractLinksFromFile(absolutePath);
      } else {
        throw new Error("La ruta debe ser un archivo Markdown o un directorio.");
      }
    })
    .catch(() => {
      throw new Error("La ruta debe ser un archivo Markdown o un directorio.");
    });
}

// Ejecución principal del programa
mdLinks(filePathTerminal)
  .then((links) => {
      console.log("Links:", links);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
