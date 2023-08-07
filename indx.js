const path = require("path");
const mdLinks1 = (path, options) => {
  //  identify if route exists
  return new Promise((resolve, reject) => {
    //  existSyn checkea la existenia de la ruta síncronicamente, es boolean
    if (fs.existsSync(path)) {
      resolve("La ruta es válida");
    }
    //  reject promise if route doesnt exists
    else {
      reject("La ruta no existe");
    }
  });
};

const mdLinks = () => {
  //  Check type of route, only if route exists
  const relativePath = process.argv[0];
  //  Check type of route(boolean) with .isAbsolute
  //  route absolute with [0] is C:\Program Files\nodejs\node.exe
  if (!path.isAbsolute(relativePath)) {
    //  transform in absolute path
    const absolutePath = path.resolve(relativePath);
    console.log(absolutePath);
  }
  //  check if is file or directory
  //  open directory to iterate and filter md files
  //  md file goes to an array with de md files
  //  check if md file contains Link
  //  save the links in an array
};

mdLinks();

//  --states: check state of link (404, 200)
//  -- validate: return an object with  href, text, file,status, and ok in the array if is true
//  -- validate: return an object with  href, text, file in the array if is false
