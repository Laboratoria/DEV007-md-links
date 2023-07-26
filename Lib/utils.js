// utils.js

import { statSync, readdirSync, readFileSync } from 'fs';
import http from 'http';
import https from 'https';
import { join, extname, resolve, isAbsolute  } from 'path';
import chalk from 'chalk';

// .....................FUNCTIONS..........................

// ================================CONVERT TO ABSOLUTE PATH
const convertToAbsolutePath = (filePath) => {
  if(isAbsolute(filePath)){
    return filePath
  }
  return resolve(filePath);
};

// ============================================PROCESS FILE

const processFile = (file, extractedLinks) => {
  const fileContent = readFileSync(file, 'utf8');
  const regex = /\[.*?\]\(((?:https?|ftp):\/\/.*?)\)/g;
  let match;

  while ((match = regex.exec(fileContent)) !== null) {
    extractedLinks.push(match[1]);
  }
};

// =========================================PROCESS DIRECTORY

const processDirectory = (dir, mdFiles, extractedLinks) => {

  console.log('Processing directory:', dir);
  const files = readdirSync(dir);
  let newLinks = [];

  const promises = files.map((file) => {
    const filePath = join(dir, file);
    const stats = statSync(filePath);
    if (stats.isDirectory()) {
      return processDirectory(filePath, mdFiles, extractedLinks);
    } else if (stats.isFile() && extname(filePath) === '.md') {
      processFile(filePath, extractedLinks)
      mdFiles.push(filePath);

      console.log(mdFiles, 1)
      for(let i = 0; mdFiles.length; i++){
        let newLinks = mdFiles.readFileSync[i]
        console.log(mdFiles.processFile(filePath, extractedLinks));

        for(let i=0; newLinks.length; i++){
          resolve (newLinks.push(), 3)
        }
        //console.log(newLinks.push(), 3)
        //.processFile(filePath, extractedLinks);
        return newLinks
      }
      console.log(newLinks, 2)
    }
  });

  return Promise.all(promises);
};

// ==============================================VALIDATE LINK

const validateLink = (link) => {
  return new Promise((resolve) => {
    const httpModule = link.startsWith('https') ? https : http;
    const request = httpModule.request(link, { method: 'HEAD' }, (response) => {
      const status = response.statusCode;
      const ok = status >= 200 && status < 400;

      const linkObj = {
        href: link,
        text: '',
        status,
        ok,
      };

      resolve(linkObj);
    });

    request.on('error', () => {
      const linkObj = {
        href: link,
        text: '',
        status: -1,
        ok: false,
      };

      resolve(linkObj);
    });

    request.end();
  });
};


// =======================================PROCESS LINKS

const processLinks = (extractedLinks, options) => {
  if (options.validate) {
    const linksPromises = extractedLinks.map((link) => {
      return validateLink(link);
    });

    return Promise.all(linksPromises);
  } else {
    const links = extractedLinks.map((link) => {
      return {
        href: link,
        text: '',
      };
    });
    return Promise.resolve(links);
  }
};

const displayLinks = (links, path) => {
  links.forEach((link) => {
    console.log(link);
    const { href, text, status, ok } = link;
    //conole.log(`${path} ${chalk.inverse.magenta(href)} ${ok ? chalk.cyan('ok') : chalk.red('fail')} ${chalk.gray(text)}`);
  })};
export { processFile, processDirectory, processLinks, convertToAbsolutePath, displayLinks };
