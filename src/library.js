#!/usr/bin/env node

import path from "path";
import { promises as fs } from "fs";
import axios from "axios";
import { marked } from "marked";
import { load } from "cheerio";



// Validar la ruta y convertirla a absoluta
const validatePath = (filePath) => {
  if (path.isAbsolute(filePath)) {
    return filePath;
  } else {
    return path.resolve(filePath);
  }
};

// Validar si es un archivo Markdown (.md)
const fileMd = (filePath) => {
  return path.extname(filePath) === ".md";
};

// Leer el contenido de un archivo
const readDoc = (filePath) => {
  return fs.readFile(filePath, "utf-8");
};

// Extraer los links del archivo markdown
function extractLinksFromFile(filePath, validate) {
  return readDoc(filePath).then((fileContent) => {
    const htmlContent = marked(fileContent);
    const dom = load(htmlContent);

    const links = dom("a").map((_, element) => {
      const href = dom(element).attr("href");
      const text = dom(element).text();
      return { href, text };
    }).get();

    if (validate) {
      const linkPromises = links.map((link) => {
        return validateLinks(link, filePath);
      });

      return Promise.all(linkPromises);
    } else {
      return links.map((link) => ({
        href: link.href,
        text: link.text,
        file: filePath,
      }));
    }
  });
}

// Se exporta la función mdLinks para que pueda ser utilizada desde otro archivo.
export {
  extractLinksFromFile,
};






