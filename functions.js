const fs = require("fs");
const path = require("path");

const pathIsAbsolute = (path) => {
  return path.isAbsolute(path);
};
const pathUser = (path) => {
  return path.isFile(path);
};

module.exports = {
  pathIsAbsolute,
  pathUser,
};
