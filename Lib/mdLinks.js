import { existsSync, statSync } from 'fs';
import { extname, resolve } from 'path';
import { processFile, processDirectory, processLinks } from './utils.js';
import chalk from 'chalk';

const mdFiles = [];
const extractedLinks = [];

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    try {
      if (existsSync(path)) {
        const stats = statSync(path);

        if (stats.isDirectory()) {
          console.log('Processing directory...');
          processDirectory(path, mdFiles, extractedLinks)
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
        } else if (stats.isFile() && extname(path) === '.md') {
          mdFiles.push(path);
          processFile(path, extractedLinks);
          if (options.validate) {
            processLinks(extractedLinks, options)
              .then((links) => {
                displayLinks(links); // Display the links
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
      }
    } catch (error) {
      console.error('An error occurred:', error);
      reject(error);
    }
  });
};

const displayLinks = async (links) => {
  for (const link of links) {
    const { href, text, file, status, ok } = link;
    console.log(
      `${file} ${chalk.blue(href)} ${ok ? chalk.green('ok') : chalk.red('fail')} ${chalk.gray(text)}`
    );
  }
};

export default mdLinks;
