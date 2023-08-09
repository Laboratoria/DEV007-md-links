const fs = require("fs");
const path = require("path");
//  ¿absolute path?
const pathIsAbsolute = (route) => {
  return path.isAbsolute(route);
};
//  return absolute Path
const absoluteRoute = (route) => {
  return path.resolve(route);
};
//  ¿file?
const pathUser = (route) => {
  let stats = fs.statSync(route);
  return stats.isFile(route);
};
//  ¿File extension?
const fileEx = (route) => {
  return path.extname(route);
};

console.log(pathUser("README.md"));
console.log(absoluteRoute("testReadme.md"));

module.exports = {
  pathIsAbsolute,
  pathUser,
  absoluteRoute,
};
