import { existsSync, statSync, readdirSync, readFileSync } from 'fs';
import { extname, join } from 'path';
import http from 'http';
import https from 'https';
import chalk from 'chalk';
import { program } from 'commander';

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    try {
      const mdFiles = [];
      const extractedLinks = [];
      const validLinks = [];
      const brokenLinks = [];

      const processFile = (file) => {
        const fileContent = readFileSync(file, 'utf8');
        const regex = /\[.*?\]\(((?:https?|ftp):\/\/.*?)\)/g;
        let match;

        while ((match = regex.exec(fileContent)) !== null) {
          extractedLinks.push(match[1]);
        }
      };

      const processDirectory = (dir) => {
        const files = readdirSync(dir);
        files.forEach((file) => {
          const filePath = join(dir, file);
          const stats = statSync(filePath);

          if (stats.isDirectory()) {
            processDirectory(filePath); // Recursive call for subdirectories
          } else if (stats.isFile() && extname(filePath) === '.md') {
            mdFiles.push(filePath);
          }
        });
      };

      if (options.validate) {
        if (existsSync(path)) {
          const stats = statSync(path);
          if (stats.isDirectory()) {
            console.log('Processing directory...');
            processDirectory(path);
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
        processFile(file);
      });

      const linksPromises = extractedLinks.map((link) => {
        return new Promise((resolveLink) => {
          const httpModule = link.startsWith('https') ? https : http;
          const request = httpModule.request(link, { method: 'HEAD' }, (response) => {
            const status = response.statusCode;
            const ok = status >= 200 && status < 400;
            const linkObj = {
              href: link,
              text: '', // You can extract the text if necessary
              file: path,
              status,
              ok: ok ? chalk.green('ok') : chalk.red('fail'),
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

          request.on('error', () => {
            const linkObj = {
              href: link,
              text: '', // You can extract the text if necessary
              file: path,
              status: -1, // Connection error
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

export default mdLinks;