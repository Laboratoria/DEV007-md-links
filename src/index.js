#!/usr/bin/env node

import { mdLinks, countLinks } from "./library.js";
import chalk from "chalk";

console.log(
  chalk.blue(
    '\n------------------------------------------------- MD-LINKS -------------------------------------------------'
  )
);

const optionTerminal = {
  validate: process.argv.includes("--validate"),
  stats: process.argv.includes("--stats"),
};

const filePathTerminal = process.argv[2];
if (filePathTerminal == null) {
  console.log(
    chalk.gray(
      "Primero ingresa una ruta y una opción. \nLas opciones disponibles son: "
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
