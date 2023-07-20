import * as fs from 'node:fs';

// import * as path from 'node:path';
import searchlinks from '../src/extractLinks';


jest.mock('node:fs');

describe('extractLinksFromFile function', () => {
  beforeEach(() => {
    fs.readFile.mockReset();
  });

  test('debería retornar un array de objetos con links extraídos', () => {
    const pathFiles = [
      'C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta\\ejemplo1.m2',
      'C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta\\ejemplo2.m2',
    ];

    const fileContents = [
      'probando si por aquí encuentro algún link [Colesgios de arquitectos - MDN](http://cdalp.org.bo/encuentro-bi-nacional-de-arquitectos-bolivia-peru)',
      'probando si por aquí encuentro algún link [Readme](https://coda.io/d/DEV005-Estudiantes_dg-3pfedXpq/Retrospectiva_sudTh)',
    ];

    fs.readFile.mockImplementation((path, encoding, callback) => {
      const index = pathFiles.indexOf(path);
      const fileContent = fileContents[index];

      expect(pathFiles).toContain(path);
      expect(encoding).toBe('utf8');
      callback(null, fileContent);
    });

    const expectedResult = [
      {
        href: 'http://cdalp.org.bo/encuentro-bi-nacional-de-arquitectos-bolivia-peru',
        text: 'Colesgios de arquitectos - MDN',
        file: pathFiles[0],
      },
      {
        href: 'https://coda.io/d/DEV005-Estudiantes_dg-3pfedXpq/Retrospectiva_sudTh',
        text: 'Readme',
        file: pathFiles[1],
      },
    ];

    return searchlinks(pathFiles)
      .then((result) => {
        expect(result).toEqual(expectedResult);
      });
  });
});