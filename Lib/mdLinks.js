import { existsSync, lstatSync } from 'fs';
import { extname, resolve, isAbsolute } from 'path';
import { extractedMD } from './getFiles.js';
import { readMdFiles, readedfiles } from './getLinks.js';
import { stats } from './stats.js';
import { validateLinks } from './validate.js';
//import mdLinks from './mdLinks.js';
import chalk from 'chalk';
import pkg from 'terminal-kit';
import path from 'path'

//const readme = 'C:\Users\Javiera\Desktop\Laboratoria\MDLinks\DEV007-md-links\README.md';
const { terminal: term } = pkg;

const displayLinks = (links, path) => {
  links.forEach((link) => {
    const { href, text, status, ok } = link;
    console.log(`${chalk.inverse.magenta(path)} ${chalk.cyan(href)} ${ok ? chalk.bgCyan('ok') : chalk.red('fail')}`);
  });

  term.slowTyping(
    'DONE!\n',
    { flashStyle: term.brightWhite },
    () => { process.exit(); },
  );
};

//==================================MDLinks============================================
export function convertAbsolute(pathUser) {
  console.log('aaa', pathUser)
  if (path.isAbsolute(pathUser)) {
    return pathUser;
  }
  return path.resolve(pathUser);
}
const elPath = process.argv[2];
//console.log('elPath', elPath);
const mdLinks = async (elPath, options = {}) => {
  const absolutePath = convertAbsolute(elPath);
  //console.log(absolutePath);
 // console.log(absolutePath, 1111);
  if (existsSync(absolutePath)) {

    // -----------------Directory process
    if (lstatSync(absolutePath).isDirectory()) {
      const files = extractedMD(absolutePath);
      console.log(files, 2222);
      const links = await Promise.all(files.map(file => readMdFiles(file)));
      console.log(links, 3333);

      // -----------------Validate Links
      if (options.validate) {
        const validatedLinks = await Promise.all(links.map(link => validateLinks(link)));
        //console.log(validatedLinks, 3333);
        resolve(validatedLinks);
      } else {
        resolve(null);
      }

      //---------------------Process MD file
    } else if (extname(absolutePath) === '.md') {
      console.log(absolutePath);
      const readenLinks = await readMdFiles([absolutePath]);
      console.log(readenLinks);
      const extractedLinksObj = extractLinks(links);
      console.log(extractedLinksObj, 3333);

      //const extractedLinks = extractLinks(links);
      //console.log(extractedLinks, 4444)
      if (options.stats && options.validate) {
        const statedLinks = (await stats(links));
        console.log(statedLinks, 5555);
        const validatedLinks = await validateLinks(links);
        console.log(validatedLinks, 666);
        return { validatedLinks, statedLinks }
      }

      //1.- Extraer los links
      //2.- Preguntar, si el usario NO pasó validate hay que devolver los links, sin hacerles nada.
      //3.- Si sí se le pasó validate hay que validar los link y devolverlos.

      if (options.validate) {
        const validatedLinks = await validateLinks(links);
        return validatedLinks;
      } else {
        
        return statedLinks
      }

      /* CODIGO DE JAVI

      // -----------------------Statistics
      if (options.stats && !options.validate) {
        const statedLinks = (await stats(links));
        //aqui link disvalido
        return { statedLinks }// retornar tambie disvalid link
        //objeto, href, text
        //objeto con stats
      }
      // ---------------------Validate Links
      if (options.validate && !options.stats) {
        const validatedLinks = await validateLinks(links);
        return validatedLinks;
      }

      */
    } else {
      throw new Error('Invalid file type. Only Markdown files are supported.');
    }
  } else {
    throw new Error('Path does not exist.');
  }
};

mdLinks('C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\README.md')
  .then((links) => {
    console.log(links);
    term.slowTyping(
      'DONE!\n',
      { flashStyle: term.brightWhite },
      () => { process.exit(); },
    );
  })
  .catch((error) => {
    console.error(error);
  });

export default mdLinks;

