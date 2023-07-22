// mdLinks.js

import { existsSync, statSync } from 'fs';
import { extname, resolve, isAbsolute } from 'path';
import { processFile, processDirectory, processLinks, convertToAbsolutePath } from './utils.js';
import chalk from 'chalk';
import pkg from 'terminal-kit';
const { terminal: term } = pkg; // Esto es para la tabla de colores

const mdFiles = [];
const extractedLinks = [];

const displayLinks = (links, path) => {
  links.forEach((link) => {
    console.log(link);
    const { href, text, status, ok } = link;
    console.log(`${path} ${chalk.inverse.magenta(href)} ${ok ? chalk.cyan('ok') : chalk.red('fail')} ${chalk.gray(text)}`);
  });

  term.slowTyping(
    'DONE!\n',
    { flashStyle: term.brightWhite },
    () => { process.exit(); },
  );
};

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    try {
      const absolutePath = convertToAbsolutePath(path);
      //console.log(absolutePath, 88888);

      if (!existsSync(absolutePath)) {
        console.log('The path does not exist');
        return resolve(null);
      }

      const stats = statSync(absolutePath);

      if (stats.isDirectory()) {
        //console.log('Processing directory...');
        processDirectory(absolutePath, mdFiles, extractedLinks)
          .then(() => {
            if (options.validate) {
              //console.log('mdFiles length:', mdFiles.length);
              console.log(extractedLinks)
              //extractedLinks.processLinks(extractedLinks, options)
              console.log(extractedLinks)
              const newextractedLinks = processLinks(extractedLinks, options);
              console.log(extractedLinks)

              return newextractedLinks
            } else {
              
              console.log(extractedLinks)
              return resolve(extractedLinks);
            }
          })
          .then((links) => {
            displayLinks(links, path); // Pass extractedLinks and path to displayLinks function
            resolve(links);
          })
          .catch((error) => {
            console.error('An error occurred during processing:', error);
            reject('Error occurred during processing');
          });
      } else if (stats.isFile() && extname(absolutePath) === '.md') {
        mdFiles.push(absolutePath);
        processFile(absolutePath, extractedLinks);
        if (options.validate) {
          processLinks(extractedLinks, options)
            .then((links) => {
              displayLinks(links, path); // Pass extractedLinks and path to displayLinks function
              resolve(links);
            })
            .catch((error) => {
              console.error('An error occurred during processing:', error);
              reject('Error occurred during processing');
            });
        } else {
          displayLinks(extractedLinks, path); // Pass extractedLinks and path to displayLinks function
          resolve(extractedLinks);
        }
      } else {
        console.log('The path is not a Markdown file');
        return resolve(null);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      reject('Error occurred');
    }
  });
};

export default mdLinks;
/*const customColor = term.rgb(100, 200, 50);
const customBackgroundColor = term.rgb(50, 100, 200);*/
/*const displayLinks = (links, path) => {
  links.forEach((link) => {
    console.log(link);
    const { href, text, status, ok } = link;
    console.log(`${path} ${chalk.inverse.magenta(href)} ${ok ? chalk.cyan('ok') : chalk.red('fail')} ${chalk.gray(text)}`);
  });
  term.slowTyping(
    'DONE!\n',
    { flashStyle: term.brightWhite },
    () => { process.exit(); },
  );
  
};*/
/*const data = [
  ['header #1', 'header #2', 'header #3'],
  ['row #1', 'a much bigger cell, a much bigger cell, a much bigger cell... ', 'cell'],
  ['row #2', 'cell', 'a medium cell'],
  ['row #3', 'cell', 'cell'],
  ['row #4', 'cell\'Hola'],
];

const tableOptions = {
  hasBorder: true,
  contentHasMarkup: true,
  borderChars: 'lightRounded',
  borderAttr: { color: 'cyan' },
  textAttr: { bgColor: 'default' },
  firstCellTextAttr: { bgColor: 'black' },
  firstRowTextAttr: { bgColor: 'green' },
  firstColumnTextAttr: { bgColor: 'yellow' },
  width: 60,
  fit: true,
};

term.table(data, tableOptions);*/



