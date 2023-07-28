import http from 'http';
import https from 'https';

export const validateLink = (link, file) => {
  return new Promise((resolve) => {
    const httpModule = link.startsWith('https') ? https : http;
    const request = httpModule.request(link, { method: 'HEAD' }, (response) => {
      const status = response.statusCode;
      const ok = status >= 200 && status < 400;

      // Extraemos el texto del enlace del objeto response
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => {
        const text = chunks.join('').trim();

        const linkObj = {
          href: link,
          text, // Usamos la variable local 'text'
          file, // Usamos la variable local 'file'
          status,
          ok,
        };

        resolve(linkObj);
      });
    });

    request.on('error', () => {
      const linkObj = {
        href: link,
        text: '', // Texto vacío en caso de error
        file, // Usamos la variable local 'file'
        status: -1,
        ok: false,
      };

      resolve(linkObj);
    });

    request.end();
  });
};

export const validateLinks = async (links, file) => {
  const linkPromises = links.map((link) => {
    return validateLink(link, file);
  });

  return Promise.all(linkPromises);
};

export default { validateLinks, validateLink };
