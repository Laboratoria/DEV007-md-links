import { existsSync, statSync, readdirSync, readFileSync } from 'fs';
import { extname, join } from 'path';
import http from 'http';
import https from 'https';
import chalk from 'chalk';

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    try {
      const mdFiles = [];
      const extractedLinks = [];
      const validLinks = [];
      const brokenLinks = [];

      // ==============================================PROCESS FILE=============================================
      const processFile = (file) => {
        const fileContent = readFileSync(file, 'utf8');
        const regex = /\[.*?\]\(((?:https?|ftp):\/\/.*?)\)/g;
        let match;

        while ((match = regex.exec(fileContent)) !== null) {
          extractedLinks.push(match[1]);
        }
        console.log('Extracted Links', extractedLinks);
      };

      // ==============================================PROCESS DIRECTORY========================================
      const processDirectory = (dir) => {
        console.log('Processing directory:', dir);
        const files = readdirSync(dir);
        console.log('Files:', files);

        const promises = files.map((file) => {
          const filePath = join(dir, file);
          console.log('File path:', filePath);
          const stats = statSync(filePath);

          if (stats.isDirectory()) {
            return processDirectory(filePath);
          } else if (stats.isFile() && extname(filePath) === '.md') {
            mdFiles.push(filePath);
            processFile(filePath);
          }
        });

        return Promise.all(promises);
      };

      // ==========================================OPTIONS=====================================================
      if (options.validate) {
        if (existsSync(path)) {
          const stats = statSync(path);
          if (stats.isDirectory()) {
            console.log('Processing directory...');
            processDirectory(path).then(() => {
              console.log('mdFiles length:', mdFiles.length);
              processLinks();
            });
          } else if (stats.isFile() && extname(path) === '.md') {
            mdFiles.push(path);
            processFile(path);
            processLinks();
          } else {
            console.log('The path is not a Markdown file');
          }
        } else {
          console.log('The path does not exist');
        }
      } else {
        processLinks();
      }

      // ========================================HTTP/HTTPS STATUS===========================================
      const processLinks = () => {
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

            // ======================================ERRORS HANDLER=============================================
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

        // ======================================RETURN RESULTS==============================================
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
      };
    } catch (error) {
      console.error('An error occurred:', error);
      reject(error);
    }
  });
};

export default mdLinks;
