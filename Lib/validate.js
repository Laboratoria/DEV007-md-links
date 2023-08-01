// validate.js
import http from 'http';
import https from 'https';
import { checkLinkStatus } from './stats.js';

// ===================================Validation
export const validateLink = (link) => {
  return new Promise((resolve) => {
    const httpModule = link.startsWith('https') ? https : http;
    const request = httpModule.request(link, { method: 'HEAD' }, (response) => {

      const status = response.statusCode;
      const ok = status >= 200 && status < 400;


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

export const validateLinks = async (links) => {
  const promises = []
  links.map(async (link) => {
    promises.push(checkLinkStatus(link))
  });
  return Promise.all(promises).then((responses) => {
    return responses.map((httpCode, index) => ({...links[index],
        status: httpCode,
        ok: httpCode >= 200 && httpCode < 400,
      }))
  })
};
//console.log(await validateLink('https://www.areatecnologia.com/diagramas-de-flujo.htm'));

export default {validateLinks, validateLink};
