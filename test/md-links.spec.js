const mdLinks = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  // it('return promise', () => {
  //   expect (typeof mdLinks).toBe(Promise);
  // });
  it('return false when the path doesn´t exist', () => {
    return mdLinks.mdLinks("/document/doesntexiste.md")
    .catch((error) => {
      expect (error).toBe("the path doesn't exist");
      })
  });
  it('return false when the path has not .md', () => {
    return mdLinks.mdLinks("/document/doesntexiste.md")
    .catch((error) => {
      expect (error).toBe("The path does not exist .md file");
  }) 
});
});


// describe ('readMarkdownFile', () => {
//   it('return file path', () => {
//     return readMarkdownFile.readMarkdownFiles("C:\Users\usuario\DEV007-md-links-CLLP\testing\MdLink\READMETesting.md")
//     .catch((error) => {
//       expect (error).toBe("C:\Users\usuario\DEV007-md-links-CLLP\testing\MdLink\READMETesting.md");
//   })
// });
// });