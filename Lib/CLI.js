import {
  existsSync, statSync, readdirSync, readFileSync,
} from 'fs';
import { extname, join } from 'path';
import http from 'http';
import https from 'https';
import chalk from 'chalk';
import { program } from 'commander';

// ==============================================MDLINK=============================================
const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    try {
      const mdFiles = [];
      const extractedLinks = [];
      const validLinks = [];
      const brokenLinks = [];
      // ======================================PROCESS FILE=========================================
      const processFile = (file) => {
        const fileContent = readFileSync(file, 'utf8');
        const regex = /\[.*?\]\(((?:https?|ftp):\/\/.*?)\)/g;
        let match;

        while ((match = regex.exec(fileContent)) !== null) {
          extractedLinks.push(match[1]);
        }
        console.log('Extracted Links', extractedLinks);
      };
      // ======================================PROCESS DIRECTORY====================================
      const processDirectory = (dir) => {
        console.log('Processing directory:', dir);
        const files = readdirSync(dir);
        console.log('Files:', files);
        files.forEach((file) => {
          const filePath = join(dir, file);
          console.log('File path:', filePath);
          const stats = statSync(filePath);

          if (stats.isDirectory()) {
            processDirectory(filePath);
          } else if (stats.isFile() && extname(filePath) === '.md') {
            mdFiles.push(filePath);
          }
        });
      };
      // ==========================================OPTIONS==========================================
      if (options.validate) {
        if (existsSync(path)) {
          const stats = statSync(path);
          if (stats.isDirectory()) {
            console.log('Processing directory...');
            processDirectory(path);
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
      // ==========================================RECURSIVITY======================================
      mdFiles.forEach((file) => {
        processFile(file);
      });
      // ========================================HTTP/HTTPS STATUS==================================
      const linksPromises = extractedLinks.map((link) => {
        return new Promise((resolveLink) => {
          const httpModule = link.startsWith('https') ? https : http;
          const request = httpModule.request(link, { method: 'HEAD' }, (response) => {
            const status = response.statusCode;
            const ok = status >= 200 && status < 400;
            const linkObj = {
              href: link,
              text: '',
              file: path,
              status,
              ok: ok ? chalk.blue('ok') : chalk.red('fail'),
            };

            if (options.validate) {
              if (ok) {
                validLinks.push(linkObj);
              } else {
                brokenLinks.push(linkObj);
              }
            } else {
              validLinks.push(linkObj);
            }

            resolveLink(linkObj);
          });
            // ======================================ERRORS HANDELER================================
          request.on('error', () => {
            const linkObj = {
              href: link,
              text: '',
              file: path,
              status: -1,
              ok: 'fail',
            };

            if (options.validate) {
              brokenLinks.push(linkObj);
            }

            resolveLink(linkObj);
          });

          request.end();
        });
      });
      // ======================================RETURN RESULTS=======================================
      Promise.all(linksPromises)
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


// =========================================COMMANDER CREATER=======================================
program
  .command('mdlinks <path>')
  .option('-v, --validate', 'Validate if the path exists')
  .option('-s, --stats', 'Show statistics')
  .action((path, options) => {
    mdLinks(path, options)
      .then((links) => {
        console.log(links);
      })
      .catch((error) => {
        console.error(error);
      });
  });

program.parse(process.argv);

// =========================================END=======================================
