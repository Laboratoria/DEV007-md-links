
const fs = require("fs");
const path = require("path");

const mdLinks = () => {
  return new Promise((resolve, reject) => {
    const relativePath = process.argv[2];

    // DF 1 
    // Check if the path exists.
    if (fs.existsSync(relativePath)) {  
      
      // DF 2
      // Check if a path is absolute
      if (!path.isAbsolute(relativePath)) {

        // DF 3 
        // Convert the path to an absolute path
        const absolutePath = path.resolve(relativePath);
        console.log(absolutePath);
        resolve(absolutePath);

        // DF 4 
        // Check if it is a directory
        if (
      } else {
        resolve(relativePath);
      }
    } else {
      reject("the path doesn't exist");
    }
  }).catch((error) => {
    console.error(error); // "Handling the promise rejection
  });
};

module.exports = {
  mdLinks,
};

mdLinks();

