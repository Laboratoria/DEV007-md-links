import { mdLinks } from "./index.js";


const optionsObjects = { validate: false, stats: false };

if (process.argv.includes("--validate")) {
  optionsObjects.validate = true;
}
if (process.argv.includes("--stats")) {
  optionsObjects.stats = true;
}

mdLinks(process.argv[2], optionsObjects)
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log("error");
  });

/*
mdLinks("prueba.md")
  .then((pathIsAbsolute) => {
    console.log((pathIsAbsolute),4);
  })
  .catch((error) => {
    console.error((chalk.red("Error:", error)),4.1);
  });
*/
