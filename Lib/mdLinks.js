import { existsSync, lstatSync } from 'fs';
import { extname, resolve, isAbsolute } from 'path';
import { extractedMD } from './getFiles.js';
import { readMdFiles, extractLinks } from './getLinks.js';
import { stats } from './stats.js';
import { validateLinks } from './validate.js';
//import mdLinks from './mdLinks.js';
import chalk from 'chalk';
//import pkg from 'terminal-kit';
import path from 'path'

//const readme = 'C:\Users\Javiera\Desktop\Laboratoria\MDLinks\DEV007-md-links\README.md';
const { terminal: term } = pkg;

const displayLinks = (links, path) => {
  links.forEach((link) => {
    const { href, text, status, ok } = link;
    console.log(`${chalk.inverse.magenta(path)} ${chalk.cyan(href)} ${ok ? chalk.bgCyan('ok') : chalk.red('fail')}`);
  })};

//==================================MDLinks============================================
export function convertAbsolute(pathUser) {
  if (path.isAbsolute(pathUser)) {
    return pathUser;
  }
  return path.resolve(pathUser);
}
const elPath = process.argv[2];
//console.log('elPath', elPath);
const mdLinks = async (elPath, options = {}) => {
  const absolutePath = convertAbsolute(elPath);
  if (existsSync(absolutePath)) {
    // -----------------Directory process
    if (lstatSync(absolutePath).isDirectory()) {
      const files = extractedMD(absolutePath);
      const links = await Promise.all(files.map(file => readMdFiles(file)));

      // -----------------Validate Links
      if (options.validate) {
        const validatedLinks = await Promise.all(links.map(link => validateLinks(link)));
        resolve(validatedLinks);
      } else {
        resolve(null);
      }

      //---------------------Process MD file
    } else if (extname(absolutePath) === '.md') {
      const readenLinks = await readMdFiles([absolutePath]);
      const extractedLinksObj = extractLinks(readenLinks);

      if (extractedLinksObj.length === 0) {
        throw new Error('No links found');
      } else {
        if (options.stats) {
          const statedLinks = (await stats(extractedLinksObj));
          return { statedLinks }
        }

        if (options.validate) {
          const validatedLinks = await validateLinks(extractedLinksObj);
          return { validatedLinks }
        }

        if (Object.keys(options).length === 0) {
          return extractedLinksObj
        }
      }
    } else {
      throw new Error('Invalid file type. Only Markdown files are supported.');
    }
  } else {
    throw new Error('Path does not exist.');
  }
};

mdLinks('./Example/Subexample/READ.md')
  .then((links) => {
    console.log("links", links);
    
    /*term.slowTyping(
      'DONE!\n',
      { flashStyle: term.brightWhite },
      () => { process.exit(); },
    );*/
  })
  .catch((error) => {
    console.error(error);
  });

export default mdLinks;
