import { existsSync, lstatSync } from 'fs';
import { extname, resolve, isAbsolute } from 'path';
import { extractedMD } from './getFiles.js';
import { getLinks } from './getLinks.js';
import { stats } from './stats.js';
import { validateLinks } from './validate.js';
//import mdLinks from './mdLinks.js';
import chalk from 'chalk';
import pkg from 'terminal-kit';
import path from 'path'

//const readme = 'C:\Users\Javiera\Desktop\Laboratoria\MDLinks\DEV007-md-links\README.md';
const { terminal: term } = pkg;

const displayLinks = (links, path) => {
  links.forEach((link) => {
    const { href, text, status, ok } = link;
    console.log(`${chalk.inverse.magenta(path)} ${chalk.cyan(href)} ${ok ? chalk.bgCyan('ok') : chalk.red('fail')}`);
  });

  term.slowTyping(
    'DONE!\n',
    { flashStyle: term.brightWhite },
    () => { process.exit(); },
  );
};

/*const mdLinks = async (path, options = {} => {
if(!isAbsolute(path)){
  resolve(path)
}
if(isAbsolute(path)){
//si existe entonces, pregunta
// si es un archivo md, entonces procesar con getlinks
// si es un carpeta o md entonces va a procesar con getfile y luego con get links
// se toma el array de md links, si es que opcion es stats
// se arroja el resultado de las estadisticas, este debe ser acumulable por cada uno de los links 
//si la opcion es validate, hara lo mismo pero con la funcion del modul validate y muestra su respectivo resultado 
// mostrar por consola el resultado

});*/
//==================================MDLinks============================================
/*export function convertAbsolute(pathUser) {
  console.log('aaa', pathUser)
  if (path.isAbsolute(pathUser)) {
    return pathUser;
  }
  return path.resolve(pathUser);
}
const elPath = process.argv[2];*/
console.log('elPath', elPath);
const mdLinks = async (elPath, options = {}) => {
  const absolutePath = convertAbsolute(elPath);
  console.log(absolutePath);
  console.log(absolutePath, 1111);
  if (existsSync(absolutePath)) {
    // -----------------Directory process
    if (lstatSync(absolutePath).isDirectory()) {
      const files = extractedMD(absolutePath);
      const links = await Promise.all(files.map(file => getLinks(file)));
      console.log(files, 2222);
      // -----------------Validate Links
      if (options.validate) {
        const validatedLinks = await Promise.all(links.map(link => validateLinks(link)));
        console.log(validatedLinks, 3333);
        resolve(validatedLinks);
      } else {
        resolve(null);
      }
      //---------------------Process file
    } else if (extname(absolutePath) === '.md') {
      const links = await getLinks(absolutePath);
      //console.log(links, 4444)
      if (options.stats && options.validate) {
        const statedLinks = (await stats(links));
        const validatedLinks = await validateLinks(links);
        return { validatedLinks, statedLinks }
      }
      // -----------------------Statistics
      if (options.stats && !options.validate) {
        const statedLinks = (await stats(links));
        //aqui link disvalido
        return { statedLinks }// retornar tambie disvalid link
        //objeto, href, text
        //objeto con stats
      }
      // ---------------------Validate Links
      if (options.validate && !options.stats) {
        const validatedLinks = await validateLinks(links);
        return validatedLinks;
      }
    } else {
      throw new Error('Invalid file type. Only Markdown files are supported.');
    }
  } else {
    throw new Error('Path does not exist.');
  }
};

mdLinks('C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\README.md')
  .then((links) => {
    console.log(links);
    term.slowTyping(
      'DONE!\n',
      { flashStyle: term.brightWhite },
      () => { process.exit(); },
    );
  })
  .catch((error) => {
    console.error(error);
  });

/*mdLinks('C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\README.md', { validate: true, stats: true })
.then((links) => {
  console.log(links);
  term.slowTyping(
    'DONE!\n',
    { flashStyle: term.brightWhite },
    () => { process.exit(); },
  );
})
.catch((error) => {
  console.error(error);
});*/
/*const mypath = 'C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\READ';
const options = { validate: true };

mdLinks(mypath, options)
  .then((links) => {
    console.log(mypath);
  })
  .catch((error) => {
    console.error(error);
  });
*/
/*mdLinks('C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\Lib\\Example\\Subexample\\README.md', { validate: true })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
*/
//console.log(await mdLinks('C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\Lib\\Example\\Subexample\\README.md', {validate: true}))

export default mdLinks;

/*const mypath = 'C:\Users\Javiera\Desktop\Laboratoria\MDLinks\DEV007-md-links\Lib\Example';
const options = { validate: true };

mdLinks(mypath, options)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  }); */
/*mdLinks(readme, {validate: true})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });*/

// Ejemplo de uso con un solo archivo:
/*try {
  const links = await mdLinks('C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\Lib\\Example\\Subexample\\README.md', { validate: true });
  // Haz lo que desees con los links devueltos
} catch (error) {
  console.error(error);
}

// Ejemplo de uso con un array de archivos:
try {
  const links = await mdLinks(['C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\Lib\\Example\\Subexample\\READ.md', 'C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\Lib\\Example\\Subexample\\README.md'], { validate: true });
  // Haz lo que desees con los links devueltos
} catch (error) {
  console.error(error);
}*/

/*mdLinks(relativePath)
  .then((rutaAbsoluta) => {
    console.log(chalk.inverse.cyan(rutaAbsoluta));
  })
  .catch((error) => {
    console.error(chalk.magenta.bold('Error:', error));
  });+*/


/*const customColor = term.rgb(100, 200, 50);
const customBackgroundColor = term.rgb(50, 100, 200);*/
/*const displayLinks = (links, path) => {
  links.forEach((link) => {
    console.log(link);
    const { href, text, status, ok } = link;
    console.log(`${path} ${chalk.inverse.magenta(href)} ${ok ? chalk.cyan('ok') : chalk.red('fail')} ${chalk.gray(text)}`);
  });
  term.slowTyping(
    'DONE!\n',
    { flashStyle: term.brightWhite },
    () => { process.exit(); },
  );
  
};*/
/*const data = [
  ['header #1', 'header #2', 'header #3'],
  ['row #1', 'a much bigger cell, a much bigger cell, a much bigger cell... ', 'cell'],
  ['row #2', 'cell', 'a medium cell'],
  ['row #3', 'cell', 'cell'],
  ['row #4', 'cell\'Hola'],
];

const tableOptions = {
  hasBorder: true,
  contentHasMarkup: true,
  borderChars: 'lightRounded',
  borderAttr: { color: 'cyan' },
  textAttr: { bgColor: 'default' },
  firstCellTextAttr: { bgColor: 'black' },
  firstRowTextAttr: { bgColor: 'green' },
  firstColumnTextAttr: { bgColor: 'yellow' },
  width: 60,
  fit: true,
};

term.table(data, tableOptions);*/


