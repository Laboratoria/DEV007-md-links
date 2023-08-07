const { mdLinks } = require("./index.js");
mdLinks("examples/doesntexist.md")
  .then((userPath) => {})
  .catch((error) => {
    console.log(error);
  });
mdLinks("README.md")
  .then((userPath) => {
    console.log(userPath);
  })
  .catch((error) => {
    console.log(error);
  });
mdLinks("examples/examples/example6.md")
  .then((userPath) => {
    console.log(userPath);
  })
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
