// mdLinks.js

import { existsSync, statSync } from 'fs';
import { extname, resolve, isAbsolute } from 'path';
import { processFile, processDirectory, processLinks, convertToAbsolutePath } from './utils.js';
import chalk from 'chalk';

const mdFiles = [];
const extractedLinks = [];

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    try {
      const absolutePath = convertToAbsolutePath(path);
      console.log(absolutePath, 88888); // Check if the path is relative and convert to absolute

      if (existsSync(absolutePath)) {
        const stats = statSync(absolutePath);

        if (stats.isDirectory()) {
          console.log('Processing directory...');
          processDirectory(absolutePath, mdFiles, extractedLinks)
            .then(() => {
              if (options.validate) {
                console.log('mdFiles length:', mdFiles.length);
                return processLinks(extractedLinks, options);
              } else {
                resolve(extractedLinks);
              }
            })
            .then((links) => {
              displayLinks(links); // Display the links
              resolve(links);
            })
            .catch((error) => {
              reject(error);
            });
        } else if (stats.isFile() && extname(absolutePath) === '.md') {
          mdFiles.push(absolutePath);
          processFile(absolutePath, extractedLinks);
          if (options.validate) {
            processLinks(extractedLinks, options)
              .then((links) => {
                displayLinks(links, path); // Display the links
                resolve(links);
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            displayLinks(extractedLinks); // Display the links
            resolve(extractedLinks);
          }
        } else {
          console.log('The path is not a Markdown file');
        }
      } else {
        console.log('The path does not exist');
        reject('The path does not exist');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      reject(error);
    }
  });
};

const displayLinks = (links, path) => {
  links.forEach((link) => {
    console.log(link);
    const { href, text, status, ok } = link;
    console.log(`${path} ${chalk.blue(href)} ${ok ? chalk.red('ok') : chalk.red('fail')} ${chalk.gray(text)}`);
  });
};

export default mdLinks;
