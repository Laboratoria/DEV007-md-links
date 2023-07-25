const { mdLinks, statsValidatelinks } = require("./index.js");
const colors = require("colors");

const command = process.argv[2];
const validateOption = process.argv.includes("--validate");
const statsOption = process.argv.includes("--stats");

const options = { validate: validateOption, stats: statsOption };

if (command) {
  mdLinks(command, options)
    .then((result) => {
      if (result.length > 0) {
        if (options.stats && options.validate) {
          result.flat().forEach((link) => {
            const statusColor = link.ok === "ok" ? colors.green : colors.red;
            console.log(`(${colors.cyan(link.file)}, ${colors.gray(link.href)}, ${colors.blue(link.text)}, ${statusColor(link.ok)}, ${colors.red(link.status)})`);
          });
          const stats = statsValidatelinks(result.flat());
          console.log(colors.blue(`Total: ${stats.Total}, Unique: ${stats.Unique}, Broken: ${stats.Broken}`));
        } else if (options.stats) {
          const stats = statsValidatelinks(result.flat());
          console.log(colors.blue(`Total: ${stats.Total}, Unique: ${stats.Unique}, Broken: ${stats.Broken}`));
        } else if (options.validate) {
          result.flat().forEach((link) => {
            const statusColor = link.ok === "ok" ? colors.green : colors.red;
            console.log(`(${colors.cyan(link.file)}, ${colors.gray(link.href)}, ${colors.blue(link.text)}, ${statusColor(link.ok)}, ${colors.red(link.status)})`);
          });
        } else {
          result.flat().forEach((link) => {
            console.log(`(${colors.blue(link.text)}, ${colors.gray(link.href)})`);
          });
        }
      } else {
        console.log(colors.red.bold("No links were found in the file."));
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

