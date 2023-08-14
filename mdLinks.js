const { mdLinks } = require("./index.js");
const options = { validate: false, stats: false };
if (
  process.argv.includes("--validate") ||
  process.argv.includes("--Validate")
) {
  options.validate = true;
}
if (process.argv.includes("--stats") || process.argv.includes("--Stats")) {
  options.stats = true;
}
mdLinks(process.argv[2], options)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
