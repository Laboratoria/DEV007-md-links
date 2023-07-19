/* eslint-disable no-undef */
const { mdLinks } = require('../lib');

const path = require('path');
const { convertToAbsolutePath } = require('../lib/function');

describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
  /* it('Deberia devolver una promesa', () => {
    expect(mdLinks()).toBe(typeof Promise);
  }); */
  it('debe rechazar cuando path no existe', () => mdLinks('/hola/cursos/noexiste.md').catch((error) => {
    expect(error).toBe('la ruta no existe');
  }));
});

describe('convertToAbsolutePath', () => {
  it('debería convertir una ruta relativa a absoluta', () => {
    const relativePath = 'pruebas_md';
    const expectedAbsolutePath = path.resolve(relativePath);
    expect(convertToAbsolutePath(relativePath)).toBe(expectedAbsolutePath);
  });

  it('debería mantener una ruta absoluta sin cambios', () => {
    const absolutePath = '/ruta/absoluta/archivo.txtC:/Users/Dani Lara/OneDrive/Escritorio/DEV007-md-links/pruebas_md';
    expect(convertToAbsolutePath(absolutePath)).toBe(absolutePath);
  });
});