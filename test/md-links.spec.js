import mdLinks from '../index.js';

describe('mdLinks', () => {
  it('Deberia devolver una promesa', () => {
    expect(typeof mdLinks).toBe(Promise);
  });
  // eslint-disable-next-line max-len
  it('Deberia rechazar la promesa', () =>
    mdLinks('/c/v/lalala.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    }));
});
