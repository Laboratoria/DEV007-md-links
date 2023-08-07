import { existsSync, link, lstatSync } from 'fs';
import { extname, resolve, isAbsolute } from 'path';
import { extractedMD } from './getFiles.js';
import { readMdFiles, extractLinks } from './getLinks.js';
import { checkStats, stats, statsOffline } from './stats.js';
import { validateLinks } from './validate.js';
import path from 'path';

const displayLinks = (links, filePath) => {
  links.forEach((link) => {
    const { href, text, status, ok } = link;
    console.log(`${chalk.inverse.magenta(filePath)} ${chalk.cyan(href)} ${ok ? chalk.bgCyan('ok') : chalk.red('fail')}`);
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
  let files = []
  if (existsSync(absolutePath)) {

    /* Validate use cases */
    if (!lstatSync(absolutePath).isDirectory() && extname(absolutePath) !== '.md') {
      throw new Error('The path is not a Markdown File or Folder');
    }
    if (lstatSync(absolutePath).isDirectory()) {
      files = extractedMD(absolutePath)

      if (files.length === 0) {
        throw new Error('No Markdown files found in folder');
      }
    }

    if (extname(absolutePath) === '.md') {
      files = [absolutePath]
    } 

    /* Execute mdLinks checks */
    const links = readMdFiles(files);
    const extractedLinks = extractLinks(links);
    if (options.validate && options.stats) {
      const validatedLinks = await validateLinks(extractedLinks);
      const statedLinks = await checkStats(validatedLinks, false)
      return { validatedLinks, statedLinks };
    } else if (options.validate) {
      const validatedLinks = await validateLinks(extractedLinks)
      return validatedLinks;
    } else if (options.stats) {
      const statedLinks = await checkStats(extractedLinks);
      return statedLinks;
    } else {
      return extractedLinks;
    }
  } else {
    throw new Error('Path does not exist.');
  }
};

export default mdLinks;
