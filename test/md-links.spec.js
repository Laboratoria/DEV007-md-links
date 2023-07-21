import { mdLinks } from '../index.js'

describe('mdLinks', () => {

  it('Deberia devolver una promesa', () => {
    expect(typeof mdLinks).toBe(Promise)
  });
  it('Deberia rechazar la promesa', () => {
    return mdLinks('/c/v/lalala.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    });
  });
});
