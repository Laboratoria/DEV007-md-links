import { existsSync, statSync, readdirSync, readFileSync } from 'fs';
import { extname, join } from 'path';
import http from 'http';
import https from 'https';
import chalk from 'chalk';
import { processFile, processDirectory, processLinks } from './functions.js';

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    try {
      const mdFiles = [];
      const extractedLinks = [];
      const validLinks = [];
      const brokenLinks = [];

      if (options.validate) {
        if (existsSync(path)) {
          const stats = statSync(path);
          if (stats.isDirectory()) {
            console.log('Processing directory...');
            processDirectory(path, mdFiles);
            console.log('mdFiles length:', mdFiles.length);
          } else if (stats.isFile() && extname(path) === '.md') {
            mdFiles.push(path);
          } else {
            console.log('The path is not a Markdown file');
          }
        } else {
          console.log('The path does not exist');
        }
      }

      mdFiles.forEach((file) => {
        processFile(file, extractedLinks);
      });

      processLinks(extractedLinks, path, options, validLinks, brokenLinks)
        .then((links) => {
          if (options.stats) {
            const stats = {
              Total: links.length,
              Unique: extractedLinks.length,
            };

            if (options.validate) {
              stats.Broken = brokenLinks.length;
            }

            console.log(chalk.bold('Statistics:'));
            console.log(stats);
          }

          resolve(validLinks);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      console.error('An error occurred:', error);
      reject(error);
    }
  });
};

export default mdLinks;