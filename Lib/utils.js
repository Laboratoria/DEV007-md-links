// utils.js
import { statSync, readdirSync, readFileSync } from 'fs';
import http from 'http';
import https from 'https';
import { join, extname } from 'path';
import chalk from 'chalk';

// Función para procesar un archivo y extraer los enlaces
const processFile = (file, extractedLinks) => {
  const fileContent = readFileSync(file, 'utf8');
  const regex = /\[.*?\]\(((?:https?|ftp):\/\/.*?)\)/g;
  let match;

  while ((match = regex.exec(fileContent)) !== null) {
    extractedLinks.push(match[1]);
  }
};

// Función para procesar un directorio y encontrar archivos .md
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

// Función para validar un enlace
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

// Función para procesar los enlaces y validarlos si es necesario
const processLinks = (extractedLinks, options) => {
  const linksPromises = extractedLinks.map((link) => {
    if (options.validate) {
      return validateLink(link);
    } else {
      const linkObj = {
        href: link,
        text: '',
      };
      return Promise.resolve(linkObj);
    }
  });

  return Promise.all(linksPromises);
};

export { processFile, processDirectory, processLinks };
