#!/usr/bin/env node

import { mdLinks, countLinks } from "./library.js";
import chalk from "chalk";

// Ejecución principal del programa

  console.log(
    chalk.blue(
      '\n------------------------------------------------- MD-LINKS -------------------------------------------------'
    )
  );

  const optionTerminal = {
    validate: process.argv.includes("--validate"), // Verifica si se proporcionó la opción --validate
    stats: process.argv.includes("--stats"), // Verifica si se proporcionó la opción --stats
  };

  const filePathTerminal = process.argv[2]; // Obtiene el primer argumento después del nombre del archivo

  if (filePathTerminal == null) {
    console.log(
      chalk.gray(
        "First enter a path and an option. \nAvailable options: "
      )
    );
    console.log(
      chalk.magenta("--validate") + " Return the status of the links"
    );
    console.log(
      chalk.magenta("--state") + " Return total and unique links."
    );
    console.log(
      chalk.magenta("--validate --state : ") +
        "Return total,unique and broken links."
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
      console.log(chalk.red("Error:"), error);
    });
  }
