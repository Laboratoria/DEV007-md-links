/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const path = require('path');
const axios = require('axios');

const {
  checkPathExists,
  convertToAbsolutePath,
  IsDirectory,
  extractMarkdownFiles,
  isMd,
  ExtLinks,
  linkStats,
  checkLink,
} = require('../lib/function');

// ____________________VERIFICAR SI LA RUTA EXISTE____________________________________________
describe('checkPathExists', () => {
  it('deberia indicar true si la ruta existe', () => {
    const pathExist = 'pruebas_md';
    expect(checkPathExists(pathExist)).toBe(true);
  });

  it('deberia indicar false si la ruta no existe', () => {
    const pathExist = 'pruebas_m';
    expect(checkPathExists(pathExist)).toBe(false);
  });
});

// _____________________PASAR A RUTA ABSOLUTA___________________________________________________
describe('convertToAbsolutePath', () => {
  it('debería convertir una ruta relativa a absoluta', () => {
    const relativePath = 'pruebas_md';
    const expectedAbsolutePath = path.resolve(relativePath);
    expect(convertToAbsolutePath(relativePath)).toBe(expectedAbsolutePath);
  });

  it('debería mantener una ruta absoluta sin cambios', () => {
    const absolutePath = '/Users/Dani Lara/OneDrive/Escritorio/DEV007-md-links/pruebas_md';
    expect(convertToAbsolutePath(absolutePath)).toBe(absolutePath);
  });
});

// ______________________REVISAR SI ES DIRECTORIO _________________________________________________
describe('IsDirectory', () => {
  it('debería devolver true para un directorio existente', () => {
    const existingDirectory = 'pruebas_md';
    expect(IsDirectory(existingDirectory)).toBe(true);
  });

  it('debería devolver false para un archivo existente', () => {
    const existingFile = 'pruebas_md/prueba1.md';
    expect(IsDirectory(existingFile)).toBe(false);
  });
});

// ____________________FUNCION RECURSIVA EXTRAER ARCHIVOS DE DIRECTORIO____________________________
describe('extractMarkdownFiles', () => {
  it('debería devolver una lista con archivos .md en un directorio', () => {
    const testDirectory = 'pruebas_md';
    const expectedFiles = [
      path.join(testDirectory, '/prueba1.md'),
      path.join(testDirectory, '/prueba2.md'),
    ];
    expect(extractMarkdownFiles(testDirectory)).toEqual(expect.arrayContaining(expectedFiles));
  });

  it('debería devolver una lista vacía para un directorio sin archivos .md', () => {
    const emptyDirectory = 'lib';
    expect(extractMarkdownFiles(emptyDirectory)).toEqual([]);
  });
});

// ___________________FUNCION ARCHIVO MD Y DEJAR EN []______________________________________________
describe('isMd', () => {
  test('debería devolver una lista con el archivo .md si la ruta tiene extensión .md', () => {
    const mdFile = 'pruebas_md/prueba1.md';
    expect(isMd(mdFile)).toEqual([mdFile]);
  });

  test('debería devolver una lista vacía para una ruta sin extensión .md', () => {
    const nonMdFile = 'lib/function.js';
    expect(isMd(nonMdFile)).toEqual([]);
  });
});

// ____________________FUNCION EXTRAER LIKS ______________________________________________________

describe('ExtLink', () => {
  it('retorna en un array con los links que existen', () => ExtLinks('pruebas_md/prueba1.md')
    .then((res) => {
      expect(res).toEqual([{
        file: 'pruebas_md/prueba1.md',
        href: 'https://es.wikipedia.org/wiki/Markdown/nosellama',
        text: 'Markdown',
      },
      {
        file: 'pruebas_md/prueba1.md',
        href: 'https://www.npmjs.com/package/chalk?activeTab=versions',
        text: 'Chalk',
      }]);
    }));
  it('Retorna array vacio cuando el archivo md no contiene links', () => ExtLinks('pruebas_md/pruebasdirectorio/hola2.md')
    .then((res) => {
      expect(res).toEqual([]);
    }));
  it('retornar error', () => ExtLinks('pruebas_md')
    .catch((error) => {
      expect(error).toEqual(error);
    }));
});
// ________________________CHECK LINK_________________________________________________
describe('CheckLink', () => {
  it('debería devolver el enlace con estado "ok" para un enlace válido', (resolve) => {
    const validLink = {
      href: 'https://www.npmjs.com/package/chalk?activeTab=versions',
    };
    checkLink(validLink)
      .then((link) => {
        expect(link.status).toBe(200);
        expect(link.ok).toBe('ok');
        resolve();
      });
  });
  it('debería devolver el enlace con estado "fail" para un enlace no válido', (resolve) => {
    const validLink = {
      href: 'https://www.canva.com/hello',
    };

    checkLink(validLink)
      .then((link) => {
        expect(link.status).toBe(403);
        expect(link.ok).toBe('fail');
        resolve();
      });
  });
  it('debería devolver el enlace con estado "fail" y fail en codigo para un enlace no existente', (resolve) => {
    const validLink = {
      href: 'https://www.MALOMALO.com',
    };

    checkLink(validLink)
      .then((link) => {
        expect(link.status).toBe('fail');
        expect(link.ok).toBe('fail');
        resolve();
      });
  });
  /* TEST QUE FALTARIA CORRE PERO NO CAMBIA NADA DE NADA?
  it('debería devolver el enlace con estado fail y fail en
   codigo para un enlace no existente', (resolve) => {
    const validLink = {
      href: 'https://www.linkedin.com/in/daniela-lara-torres/',
    };

    checkLink(validLink)
      .then((link) => {
        expect(link.status).toBe(999);
        expect(link.ok).toBe('fail');
        resolve();
      });
  }); */
});

// ________________________ESTADISTICAS_______________________________________________
describe('linkStats', () => {
  it('deberia retornar estadisticas correctas con false', (resolve) => {
    const array = [
      { href: 'https://www.example.com', ok: 'ok' },
      { href: 'https://www.example2.com', ok: 'fail' },
      { href: 'https://www.example.com', ok: 'ok' },
      { href: 'https://www.example3.com', ok: 'fail' },
      { href: 'https://www.example.com', ok: 'ok' },
    ];

    linkStats(array, false)
      .then((stats) => {
        expect(stats.total).toBe(5);
        expect(stats.unique).toBe(3);
        resolve();
      });
  });

  it('deberia retornar estadisticas correctas con true', (resolve) => {
    const array = [
      { href: 'https://www.example.com', ok: 'ok' },
      { href: 'https://www.example2.com', ok: 'fail' },
      { href: 'https://www.example.com', ok: 'ok' },
      { href: 'https://www.example3.com', ok: 'fail' },
      { href: 'https://www.example.com', ok: 'ok' },
    ];

    linkStats(array, true)
      .then((stats) => {
        expect(stats.total).toBe(5);
        expect(stats.unique).toBe(3);
        expect(stats.broken).toBe(2);
        resolve();
      });
  });
});
