import { extractLinksFromFile, extractLinksFromDirectory, countLinks, mdLinks } from '../src/library.js';

describe('extractLinksFromFile', () => {
  it('Devuelve una lista de 4 objetos con href, text, file, status y ok cuando options.validate es true', () => {
    const filePathTest = './test/files/prueba2.md';
    const validate = true;
    const expectedLinks = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: './test/files/prueba2.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://github.com/kenruizinouett-node-fetch-ejemplo/blob/app.js',
        text: 'Github fetch',
        file: './test/files/prueba2.md',
        status: 404,
        ok: 'fail'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: './test/files/prueba2.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: './test/files/prueba2.md',
        status: 200,
        ok: 'ok'
      }
    ];

    return extractLinksFromFile(filePathTest, validate).then(links => {
      expect(links).toEqual(expectedLinks);
    });
  });

   /*
  it('Devuelve una lista de 4 objetos con href, text, file cuando options.validate es false', () => {
    
  }
  */
});
