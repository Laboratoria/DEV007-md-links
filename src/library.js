import { promises as fs } from "fs";   
import { marked } from "marked";
import { load } from "cheerio";

//Extraer los links del archivo markdown
function extractLinksFromFile(absolutePath) {
  return fs.readFile(absolutePath, "utf8").then((fileContent) => {
    const htmlContent = marked(fileContent);
    const dom = load(htmlContent);

    const links = dom("a").map((_,element) => {
        const link = dom(element).attr("href");
        const text = dom(element).text();
        return {  href: link, text: text ,  file: absolutePath};
      }).get(); 

      //Me falta validar links

      return links    
  });
}


// Se exporta la función mdLinks para que pueda ser utilizada desde otro archivo.
export {
  extractLinksFromFile
};
