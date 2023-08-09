const fs = require("fs");
const path = require("path");
//  ¿Real route?
const routeExists = (route) => {
  return fs.existsSync(route);
};
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
// reading file
const readingFile = (route) => {
  fs.readFile(route, "utf-8");
};

module.exports = {
  routeExists,
  pathIsAbsolute,
  pathUser,
  absoluteRoute,
  fileEx,
  readingFile,
};
