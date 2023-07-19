import http from 'http';
import https from 'https';

const processLinks = (links, options, path, resolve, reject) => {
  const httpModule = (link) => (link.startsWith('https') ? https : http);

  const linksPromises = links.map((link) => {
    return new Promise((resolveLink) => {
      const httpModuleInstance = httpModule(link);
      const request = httpModuleInstance.request(link, { method: 'HEAD' }, (response) => {
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

export default processLinks;
