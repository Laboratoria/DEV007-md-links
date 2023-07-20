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
const isMD = (filePath) => {
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

// Validar el estado de los links encontrados
function validateLinks(link, filePath) {
  const text = link.text.length > 60 ? link.text.substring(0, 60) : link.text;

  return axios
    .head(link.href)
    .then((response) => ({
      href: link.href,
      text: text,
      file: filePath,
      status: response.status,
      ok: response.status >= 200 && response.status <= 299 ? "ok" : "fail",
    }))
    .catch((err) => ({
      href: link.href,
      text: text,
      file: filePath,
      status: err.response ? err.response.status : "unknown",
      ok: "fail",
    }));
}

// Función para contar los links
function countLinks(links, options) {
  const uniqueLinks = new Set();

  if (options.validate && options.stats) {
    let brokenLinks = 0;
    links.forEach((link) => {
      uniqueLinks.add(link.href);
      if (link.ok === "fail") {
        brokenLinks++;
      }
    });
    return {
      total: links.length,
      unique: uniqueLinks.size,
      broken: brokenLinks,
    };
  } else if (!options.validate && options.stats) {
    links.forEach((link) => {
      uniqueLinks.add(link.href);
    });
    return {
      total: links.length,
      unique: uniqueLinks.size,
    };
  }
}

// Función principal mdLinks
const mdLinks = (options, filePath) => {
  return new Promise((resolve, reject) => {
    const absolutePath = validatePath(filePath);
    fs.stat(absolutePath)
      .then((metadata) => {
        if (metadata.isDirectory()) {
          extractLinksFromDirectory(absolutePath, options.validate)
            .then((linksArray) => resolve(linksArray))
            .catch((err) => reject(err));
        } else if (metadata.isFile() && isMD(absolutePath)) {
          extractLinksFromFile(absolutePath, options.validate)
            .then((linksArray) => resolve(linksArray))
            .catch((err) => reject(err));
        } else {
          reject(new Error("La ruta debe ser un archivo Markdown o un directorio."));
        }
      })
      .catch(() => {
        reject(new Error("La ruta debe ser un archivo Markdown o un directorio."));
      });
  });
};

// Se exporta la función mdLinks para que pueda ser utilizada desde otro archivo.
export {
  mdLinks,
  extractLinksFromFile,
  validateLinks,
  countLinks,
};





