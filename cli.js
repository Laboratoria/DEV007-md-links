const { mdLinks } = require(".");
mdLinks("examples/doesntexist.md")
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });
mdLinks("README.md");
