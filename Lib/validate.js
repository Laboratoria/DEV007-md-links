// validate.js
import http from 'http';
import https from 'https';

export const validateLink = (link) => {
  return new Promise((resolve) => {
    const httpModule = link.startsWith('https') ? https : http;
    const request = httpModule.request(link, { method: 'HEAD' }, (response) => {
      const status = response.statusCode;
      const ok = status >= 200 && status < 400;

      const linkObj = {
        href: link,
        text: '',
        status,
        ok,
      };

      resolve(linkObj);
    });

    request.on('error', () => {
      const linkObj = {
        href: link,
        text: '',
        status: -1,
        ok: false,
      };

      resolve(linkObj);
    });

    request.end();
  });
};

export const validateLinks = async(links) => {
  const linkPromises = links.map((link) => {
    return validateLink(link);
  });

  return Promise.all(linkPromises);
};
//console.log(await (validateLink('https://example.com')));

export default {validateLinks, validateLink};
