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
  console.log('Files:', files);

  const promises = files.map((file) => {
    const filePath = join(dir, file);
    console.log('File path:', filePath);
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      return processDirectory(filePath, mdFiles, extractedLinks);
    } else if (stats.isFile() && extname(filePath) === '.md') {
      mdFiles.push(filePath);
      processFile(filePath, extractedLinks);
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
        ok: ok ? chalk.blue('ok') : chalk.red('fail'),
      };

      resolve(linkObj);
    });

    request.on('error', () => {
      const linkObj = {
        href: link,
        text: '',
        status: -1,
        ok: 'fail',
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

export { processFile, processDirectory, processLinks, convertToAbsolutePath };
