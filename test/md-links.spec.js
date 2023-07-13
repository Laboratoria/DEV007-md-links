const mdLinks = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  // it('return promise', () => {
  //   expect (typeof mdLinks).toBe(Promise);
  // });
  it('return false when the path doesn´t exist', () => {
    return mdLinks.mdLinks("/document/doesntexiste.md").catch((error) => {
      expect (error).toBe("the path doesn't exist");
      })
  });
});

