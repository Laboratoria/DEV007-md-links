// app.js
import { existsSync, statSync } from 'fs';
import { extname } from 'path';
import { processFile, processDirectory, processLinks } from './utils.js';

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    try {
      const mdFiles = [];
      const extractedLinks = [];

      if (options.validate) {
        if (existsSync(path)) {
          const stats = statSync(path);
          if (stats.isDirectory()) {
            console.log('Processing directory...');
            processDirectory(path, mdFiles, extractedLinks)
              .then(() => {
                console.log('mdFiles length:', mdFiles.length);
                return processLinks(extractedLinks, options);
              })
              .then((links) => {
                resolve(links);
              })
              .catch((error) => {
                reject(error);
              });
          } else if (stats.isFile() && extname(path) === '.md') {
            mdFiles.push(path);
            processFile(path, extractedLinks);
            processLinks(extractedLinks, options)
              .then((links) => {
                resolve(links);
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            console.log('The path is not a Markdown file');
          }
        } else {
          console.log('The path does not exist');
        }
      } else {
        if (existsSync(path)) {
          const stats = statSync(path);
          if (stats.isDirectory()) {
            console.log('Processing directory...');
            processDirectory(path, mdFiles, extractedLinks)
              .then(() => {
                console.log('mdFiles length:', mdFiles.length);
                resolve(extractedLinks);
              })
              .catch((error) => {
                reject(error);
              });
          } else if (stats.isFile() && extname(path) === '.md') {
            mdFiles.push(path);
            processFile(path, extractedLinks);
            resolve(extractedLinks);
          } else {
            console.log('The path is not a Markdown file');
          }
        } else {
          console.log('The path does not exist');
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
      reject(error);
    }
  });
};

export default mdLinks;
