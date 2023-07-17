const { mdLinks } = require('./lib');
// Obtener el argumento pasado en la línea de comandos
const ruta = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];

const hola = (path, optionOne, optionTwo) => {
  if (optionOne === '--validate') { mdLinks(path, { validate: true }); } else if (optionOne === '--stats') { }
  else if( optionOne === '--validate'&& optionTwo === '--stats' || optionOne === '--stats'&& optionTwo === '--validate' )
};

hola(ruta, option1);
