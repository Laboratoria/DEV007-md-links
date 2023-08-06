/* eslint-disable */
import {
  existsRoute, 
  routeAbsolute, 
  aDirectory,  
  MdExtension, 
  filesRead, 
  readLinks, 
  falseLinks, 
  ptnHTTP, 
  statsofLinks
} from "../index.js";
import path from 'path'

describe('existsRoute', () => {
  it('deberia ser una funcion', () => {
    expect(typeof existsRoute).toBe('function');
  });
  it('Se deberia retornar true si la ruta existe', async () => {
    expect(existsRoute('./routes/routes2/prueba3.md')).toBe(true);
  });
  it('Se deberia retornar false si la ruta existe', async () => {
    expect(existsRoute('./routes/route2/prueba3.md')).toBe(false);
  })
});

describe('routeAbsolute', () => {
  it('deberia ser una funcion', () => {
    expect(typeof routeAbsolute).toBe('function');
  });
});

describe('routeAbsolute', () => {
  it('Se deberia retornar la ruta absoluta', async () => {
    const absolute = path.resolve('routes\routes2\prueba3.md')
    expect(routeAbsolute('routes\routes2\prueba3.md')).toEqual(absolute)
  });
  it('Se deberia retornar esa misma ruta ya que es absoluta', async () => {
    const archivo = '/Users/LENOVO/Desktop/DEV007-md-links/routes/routes2/prueba3.md'
    expect(routeAbsolute(archivo)).toEqual(archivo)
  });
});

describe('aDirectory', () => {
  it('deberia ser una funcion', () => {
    expect(typeof aDirectory).toBe('function');
  });
});

describe('aDirectory', () => {
  it('deberia emitir true si es un archivo', async () => {
    const archivo = 'routes\\routes2\\prueba3.md'
    const result = aDirectory(archivo)
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toBe(archivo);
  })
})

describe('MdExtension', () => {
  it('deberia ser una funcion', () => {
    expect(typeof MdExtension).toBe('function');
  });
});

describe('MdExtension', () => {
  it('Se deberia filtrar documentos .md', async () => {
    const filesArray = ['routes\\routes2\\prueba3.md', 'routes\\routes2\\prueba3.js']
    const filter = MdExtension(filesArray)
    expect(filter).toEqual(['routes\\routes2\\prueba3.md'])
  })
});

describe('filesRead', () => {
  it('deberia ser una funcion', () => {
    expect(typeof filesRead).toBe('function');
  });
});

describe('filesRead', () => {
  it('Se deberia leer el contenido del documento', async () => {
    const filesArray = ['routes\\routes2\\prueba3.md'];

    const resultsExpected = ['[enlace a facebook](https://www.facebook.com)'];
    
    const resultsActuals = await filesRead(filesArray);
    expect(resultsActuals).toEqual(resultsExpected);
  });
});

describe('readLinks', () => {
  it("Se debe retornar un array con los links de un archivo", async () => {
    const archivos = ['[enlace a facebook](https://www.facebook.com)'];
    const result = ['[enlace a facebook](https://www.facebook.com)'];
    expect(readLinks(archivos)).toStrictEqual(result);
  });
});

describe('falseLinks', () => {
  it('Se debe retornar un array con los links ya validados', async () => {
    const archivos = ['[enlace a facebook](https://www.facebook.com)', ]
    const result = [
      {
      href: 'https://www.facebook.com',
      text: 'enlace a facebook',
      file: 'C:\\Users\\LENOVO\\Desktop\\DEV007-md-links'
    }, 
  ]
  expect(falseLinks(archivos)).toStrictEqual(result)
  });
});

describe('ptnHTTP', () => {
  it('Es una funcion', () => {
    expect(typeof ptnHTTP).toBe('function');
  });
  it('Se deberia retornar un array de promesas', async () => {
    const objsArr = [{href: "https://www.facebook.com"}, ];
    const results = await ptnHTTP(objsArr).then(result => result);
    expect(results).toEqual([
      {
        href: "https://www.facebook.com",
        status: 200,
        mensaje: "OK",
      },
    ]);
  });
});
it('Se deberia arrojar un error', async () => {
  const url = [
    {href: "https://www.facebook.com"},
    {href: "https://www.example.com/404"},
  ];
  const results = await ptnHTTP(url);
  expect(results[0].status).toBe(200);
  expect(results[0].mensaje).toBe("OK");
  expect(results[1].status).toBe(404);
  expect(results[1].mensaje).toBe("Fail");
});

describe('statsofLinks', () => {
  it('Se deberia retornar la estadistica de los links', async () => {
    const objsArr = [
      {href: 'https://example.com/page1', mensaje: 'OK'},
      {href: 'https://example.com/page2', mensaje: 'OK'},
      {href: 'https://example.com/page3', mensaje: 'OK'},      
    ];
    const thisOptValidate = false;
    const statsExpected = {
      total: 3,
      unique: 3,
    };
    const stastActual = await statsofLinks(objsArr, thisOptValidate);
    expect(stastActual).toEqual(statsExpected);
  });
  it('Se deberia retornar las estadisticas correctas y validadas', async () => {
    const objsArr = [
      { href: 'https://example.com/page1', mensaje: 'OK' },
      { href: 'https://example.com/page2', mensaje: 'Fail' },
      { href: 'https://example.com/page3', mensaje: 'OK' },
      { href: 'https://example.com/page4', mensaje: 'OK' },
    ];
    const thisOptValidate = true;
    const statsExpected = {
      total: 4,
      unique: 4, 
      working: 3,
      broken: 1,
    };
    const stastActual = await statsofLinks(objsArr, thisOptValidate);
    expect(stastActual).toEqual(statsExpected);
  });
});












