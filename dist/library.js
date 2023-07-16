"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractLinksFromFile = extractLinksFromFile;
var _fs = require("fs");
var _marked = require("marked");
var _cheerio = require("cheerio");
//Extraer los links del archivo markdown
function extractLinksFromFile(absolutePath) {
  return _fs.promises.readFile(absolutePath, "utf8").then(fileContent => {
    const htmlContent = (0, _marked.marked)(fileContent);
    const dom = (0, _cheerio.load)(htmlContent);
    const links = dom("a").map((_, element) => {
      const link = dom(element).attr("href");
      const text = dom(element).text();
      return {
        href: link,
        text: text,
        file: absolutePath
      };
    }).get();

    //Me falta validar links

    return links;
  });
}

// Se exporta la función mdLinks para que pueda ser utilizada desde otro archivo.