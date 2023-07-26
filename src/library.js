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

//Aquí esperamos que las promesas se resuelvan
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

//la ruta de un directorio y se encarga de extraer todos link archivos Markdown.
function extractLinksFromDirectory(directoryPath, validate) {
  return fs.readdir(directoryPath).then((filesArray) => {
    const promises = filesArray.map((file) => {
      const filePath = path.join(directoryPath, file);
      return fs.stat(filePath).then((metadata) => {
        if (metadata.isDirectory()) {
          return extractLinksFromDirectory(filePath, validate);
        } else if (metadata.isFile() && fileMd(file)) {
          return extractLinksFromFile(filePath, validate);
        } else {
          return Promise.resolve([]);
        }
      });
    });

    //Aquí esperamos que las promesas se resuelvan
    return Promise.all(promises).then((linksArray) => [].concat(...linksArray));
  });
}

// Función principal mdLinks
const mdLinks = (options, filePath) => {
  return new Promise((resolve, reject) => {
    const absolutePath = validatePath(filePath);
    fs.stat(absolutePath)
      .then((metadata) => {
        if (metadata.isDirectory()) {
          extractLinksFromDirectory(absolutePath, options.validate)
            .then((linksArray) => resolve(linksArray,absolutePath))
            .catch((err) => reject(err));
        } else if (metadata.isFile() && fileMd(absolutePath)) {
          extractLinksFromFile(absolutePath, options.validate)
            .then((linksArray) => resolve(linksArray,absolutePath))
            .catch((err) => reject(err));
        } else {
          reject(new Error(`La ruta ingresada debe ser un archivo markdown(.md) o un directorio existente.\nRuta: ${absolutePath}`));
        }
      })
      .catch(() => {
        reject(new Error(`La ruta ingresada debe ser un archivo markdown(.md) o un directorio existente.\nRuta: ${absolutePath}`));
      });
  });
};

// Se exporta la función mdLinks para que pueda ser utilizada desde otro archivo.
export {
  mdLinks,
  countLinks,
  extractLinksFromFile,
  extractLinksFromDirectory
};





