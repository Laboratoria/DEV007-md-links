const { mdLinks } = require('../lib');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  /* it('Deberia devolver una promesa', () => {
    expect(mdLinks()).toBe(typeof Promise);
  });*/ 
  it('debe rechazar cuando path no existe', () => {
    return mdLinks('/hola/cursos/noexiste.md').catch((error)=>{
      expect(error).toBe('la ruta no existe')
    })
  })
  
});
