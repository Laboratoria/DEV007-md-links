#!/usr/bin/env node
import { mdLinks, countLinks } from "./library.js";
import chalk from "chalk";

console.log(
  chalk.blue(
    '\n------------------------------------------------- MD-LINKS -------------------------------------------------'
  )
);

//se agregan las opciones validate y stats
const optionTerminal = {
// si incluye validate es true, si no es false
  validate: process.argv.includes("--validate"),
  stats: process.argv.includes("--stats"),
};

//optionTerminal guarda el tercer argumento del comando por el process.argv 2 (arreglo de argumentos)
const filePathTerminal = process.argv[2];
if (filePathTerminal == null) {
  console.log(
    chalk.gray(
      "\n Primero ingresa una ruta y una opción. \n Las opciones disponibles son: "
    )
  );
  console.log(
    chalk.magenta("--validate") + " Devuelve el estado de los enlaces. "
  );
  console.log(
    chalk.magenta("--stats") + " Devolver el total de enlaces y enlaces únicos. "
  );
  console.log(
    chalk.magenta("--validate --stats : ") + "Devolver el total de enlaces, enlaces únicos y enlaces rotos."
  );
  console.log(
    chalk.blue(
      "--------------------------------------------------------------------------------------------------------------"
    )
  );
  process.exit(0);
} else {
  mdLinks(optionTerminal, filePathTerminal)
  //metodo then devuelve la promesa cuando este lista, para manejar links cuando se resuelva
    .then((links) => {
      if (optionTerminal.stats) {
        if (optionTerminal.validate) {
          console.log(chalk.blue("Links:"), links);
        }
        console.log(chalk.green("Stats:"), countLinks(links, optionTerminal));
      } else {
        console.log(chalk.yellow("Links:"), links);
      }
    })
    .catch((error) => {
      console.log(chalk.red("Error:"), chalk.red( error.message));
    });
}
