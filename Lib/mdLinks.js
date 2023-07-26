import { existsSync, lstatSync } from 'fs';
import path, { extname, resolve, isAbsolute } from 'path';
import { extractedMD } from './getFiles.js';
import { getLinks } from './getLinks.js';
import { stats } from './stats.js';
import { validateLinks } from './validate.js';
//import mdLinks from './mdLinks.js';
import chalk from 'chalk';
import pkg from 'terminal-kit';

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
const mdLinks = async (path, options = {}) => {
  if (!isAbsolute(path)) {
    path = resolve(path);
  }
console.log(path, 1111);
  if (existsSync(path)) {
    if (lstatSync(path).isDirectory()) {
      const files = extractedMD(path);
      const links = await Promise.all(files.map(file => getLinks(file)));
console.log(files, 2222);
      if (options.validate) {
        const validatedLinks = await Promise.all(links.map(link => validateLinks(link)));
        console.log(validatedLinks, 3333);
        resolve(validatedLinks);
      } else {
        resolve(null);
      }
    } else if (extname(path) === '.md') {
      const links = await getLinks(path);
//console.log(links, 4444)
      if (options.validate) {
        const validatedLinks = await validateLinks(links);
        return validatedLinks;
      } else {
        return links;
      }
    } else {
      throw new Error('Invalid file type. Only Markdown files are supported.');
    }
  } else {
    throw new Error('Path does not exist.');
  }
};

mdLinks('C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\README.md', { validate: true })
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });

/*const mypath = 'C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\Lib\\Example';
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



