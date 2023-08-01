import { existsSync, lstatSync } from 'fs';
import { extname, resolve, isAbsolute } from 'path';
import { extractedMD } from './getFiles.js';
import { readMdFiles, extractLinks } from './getLinks.js';
import { stats } from './stats.js';
import { validateLinks } from './validate.js';
import chalk from 'chalk';
import path from 'path';

const displayLinks = (links, path) => {
  links.forEach((link) => {
    const { href, text, status, ok } = link;
    console.log(`${chalk.inverse.magenta(path)} ${chalk.cyan(href)} ${ok ? chalk.bgCyan('ok') : chalk.red('fail')}`);
  });
};

export function convertAbsolute(pathUser) {
  if (path.isAbsolute(pathUser)) {
    return pathUser;
  }
  return path.resolve(pathUser);
}

const mdLinks = async (elPath, options = {}) => {
  const absolutePath = convertAbsolute(elPath);
  if (existsSync(absolutePath)) {
    if (lstatSync(absolutePath).isDirectory()) {
      const files = extractedMD(absolutePath);
      const links = await Promise.all(files.map(file => readMdFiles([file])));
      console.log(links, 1111);

      if (options.validate && options.stats) {
        const validatedLinks = await Promise.all(links.map(link => validateLinks(link)));
        const statedLinks = await stats(validatedLinks);
        return { validatedLinks, statedLinks };
      } else if (options.validate) {
        const validatedLinks = await Promise.all(links.map(link => validateLinks(link)));
        return validatedLinks;
      } else if (options.stats) {
        const statedLinks = await stats(links);
        return { statedLinks };
      } else {
        return links;
      }
    } else if (extname(absolutePath) === '.md') {
      const readenLinks = await readMdFiles([absolutePath]);
      const extractedLinksObj = extractLinks(readenLinks);

      if (extractedLinksObj.length === 0) {
        throw new Error('No links found');
      } else {
        if (options.stats) {
          const statedLinks = await stats(extractedLinksObj);
          return { statedLinks };
        }

        if (options.validate) {
          const validatedLinks = await validateLinks(extractedLinksObj);
          return { validatedLinks };
        }

        if (Object.keys(options).length === 0) {
          return extractedLinksObj;
        }
      }
    } else {
      throw new Error('Invalid file type. Only Markdown files are supported.');
    }
  } else {
    throw new Error('Path does not exist.');
  }
};

//export default mdLinks;

mdLinks('./Example/Subexample/', {stats: true })
  .then((links) => {
    console.log("links", links);
    
   /* term.slowTyping(
      'DONE!\n',
      { flashStyle: term.brightWhite },
      () => { process.exit(); },
    );*/
  })
  .catch((error) => {
    console.error(error);
  });

export default mdLinks;
