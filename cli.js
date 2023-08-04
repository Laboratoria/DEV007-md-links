const { mdLinks } = require(".");
mdLinks("examples/doesntexist.md")
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });
mdLinks("testReadme.md")
  .then((userPath) => {
    console.log(userPath);
  })
  .catch((error) => {
    console.log(error);
  });
