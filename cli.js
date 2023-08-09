const { mdLinks } = require("./index.js");
/*mdLinks("examples/doesntexist.md")
  .then((userPath) => {})
  .catch((error) => {
    console.log(error);
  });
mdLinks("testReadme.md")
  .then((userPath) => {
    console.log(userPath);
  })
  .catch((error) => {
    console.log(error);
  });*/
const options = {};
mdLinks(process.argv[2], options)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
if (process.argv[3] === "--validate") {
  options.validate === true;
} else {
  options.validate === false;
}
if (process.argv[3] === "--stats") {
  options.stats === true;
} else {
  options.stats === false;
}

if (
  (process.argv[3] === "---stats" && process.argv[4] === "--validate") ||
  (process.argv[3] === "--validate" && process.argv[4] === "--stats")
) {
  options.validate === true;
  options.stats === true;
} else {
  options.validate === false;
  options.stats === false;
}
