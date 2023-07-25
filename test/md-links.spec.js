/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable max-len */
import {
  existenciaDeLaRuta,
  rutaAbsoluta,
  convirtiendoLaRutaAAbsoluta,
  rutaEsArchivoMD,
  rutaEsDirectorio,
  leerArchivoMD,
  convertirAHtml,
  extraerLinks,
  leerDirectorio,
  validarLinks,
} from '../funciones.js';

describe('existenciaDeLaRuta', () => {
  it('Deberia devolver una funcion', () => {
    expect(typeof existenciaDeLaRuta).toBe('function');
  });
  it('Deberia devolver la ruta', () => {
    expect(existenciaDeLaRuta('README.md')).toEqual('README.md');
  });
  // eslint-disable-next-line max-len
  it('Deberia arrojar un error', () =>
    existenciaDeLaRuta('/c/v/lalala.md').catch((error) => {
      expect(error).toEqual(false);
    }));
});

describe('rutaAbsoluta', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof rutaAbsoluta).toBe('function');
  });
  it('Deberia devolver la ruta', () => {
    expect(
      existenciaDeLaRuta(
        'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/READMEE.md',
      ),
    ).toEqual(
      'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/READMEE.md',
    );
  });
  // eslint-disable-next-line max-len
  it('Deberia ', () =>
    rutaAbsoluta('/c/v/lalala.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    }));
});

describe('convirtiendoLaRutaAAbsoluta', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof convirtiendoLaRutaAAbsoluta).toBe('function');
  });
  it('Deberia devolver la ruta convertida a absoluta', () => {
    expect(convirtiendoLaRutaAAbsoluta('READMEE.md')).toEqual(
      'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\READMEE.md',
    );
  });
  // eslint-disable-next-line max-len
  it('Deberia devolver la ruta absoluta', () =>
    convirtiendoLaRutaAAbsoluta('README.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    }));
});

describe('rutaEsArchivoMD', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof rutaEsArchivoMD).toBe('function');
  });
  it('Deberia devolver la ruta convertida a absoluta', () => {
    expect(
      rutaEsArchivoMD(
        'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\READMEE.md',
      ),
    ).toEqual(
      'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\READMEE.md',
    );
  });
  // eslint-disable-next-line max-len
  it('Deberia rechazar la promesa', () =>
    rutaEsArchivoMD('/c/v/lalala.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    }));
});

describe('rutaEsDirectorio', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof rutaEsDirectorio).toBe('function');
  });
  it('Deberia devolver la ruta convertida a absoluta', () => {
    expect(
      rutaEsDirectorio(
        'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/DirectorioPrueba',
      ),
    ).toEqual(
      'C:/Users/Acer/Desktop/LABORATORIA/MDLinks/DEV007-md-links/DirectorioPrueba',
    );
  });
  // eslint-disable-next-line max-len
  it('Deberia rechazar la promesa', () =>
    rutaEsDirectorio('/c/v/lalala.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    }));
});

describe('leerArchivoMD', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof leerArchivoMD).toBe('function');
  });
  it('Deberia devolver una promesa', () => {
    expect(
      leerArchivoMD(
        'C:\\Users\\Acer\\Desktop\\LABORATORIA\\MDLinks\\DEV007-md-links\\READMEE.md',
      ),
    ).toThrow(Promise);
  });
  // eslint-disable-next-line max-len
  it('Deberia rechazar la promesa', () =>
    leerArchivoMD('/c/v/lalala.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    }));
});

describe('convertirAHtml', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof convertirAHtml).toBe('function');
  });
  // eslint-disable-next-line max-len
  it('Deberia devolver un string en formato html', () =>
    expect(
      convertirAHtml('Quiero que me retorne esto en formato de html'),
    ).toEqual('<p>Quiero que me retorne esto en formato de html</p>'));
});

describe('extraerLinks', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof extraerLinks).toBe('function');
  });
  // eslint-disable-next-line max-len
  it('Deberia rechazar la promesa', () =>
    extraerLinks('/c/v/lalala.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    }));
});

describe('leerDirectorio', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof leerDirectorio).toBe('function');
  });
  // eslint-disable-next-line max-len
  it('Deberia rechazar la promesa', () =>
    leerDirectorio('/c/v/lalala.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    }));
});

describe('validarLinks', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof validarLinks).toBe('function');
  });
  // eslint-disable-next-line max-len
  it('Deberia rechazar la promesa', () =>
    validarLinks('/c/v/lalala.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    }));
});
