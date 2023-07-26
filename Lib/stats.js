// Importamos el módulo 'https' de Node.js, que nos permitirá realizar solicitudes HTTPS.
import https from 'https';

// Definimos una función llamada 'checkLinkStatus' que tomará un enlace (link) como argumento.
const checkLinkStatus = (link) => {
  //console.log('aki tambien');
  // Devolvemos una nueva promesa que se resolverá o rechazará dependiendo del estado del enlace.
  return new Promise((resolve, reject) => {
    // Creamos una solicitud (request) utilizando el módulo 'https.get'.
    // Esto realiza una solicitud GET al enlace (link) proporcionado.
    const request = https.get(link, (response) => {
      // Cuando recibimos una respuesta (response) del servidor, comprobamos el estado del código de estado (statusCode).
      // Si el código de estado es mayor o igual a 200 y menor que 400, consideramos que el enlace es válido (no roto) y resolvemos la promesa con 'true'.
      resolve(response.statusCode >= 200 && response.statusCode < 400);
    });

    // Si ocurre un error durante la solicitud, manejamos el evento 'error'.
    request.on('error', (error) => {
      // En caso de error, consideramos que el enlace está roto y resolvemos la promesa con 'false'.
      resolve(false);
    });
  });
};

// Exportamos una función llamada 'stats' como export const.
// Esta función es asíncrona (async) y tomará un enlace (link) como argumento.
export const stats = async (links) => {
  let uniqueCount = 0;
  let brokenCount = 0;

  // Itera cada link
  for (const link of links) {
    // Await para esperar resultados
    const isLinkBroken = !(await checkLinkStatus(link));

    // Incrementa contador unique por cada link
    uniqueCount++;

    // Incrementa contador broken por cada link
    if (isLinkBroken) {
      brokenCount++;
    }
  }

  // Retorna los resultados como objeto
  return {
    Unique: uniqueCount,
    Broken: brokenCount,
    Total: links.length,
  };
};

//console.log(await stats(['https://github.com/cheeriojs/cheerio','https://docs.npmjs.com/getting-started/publishing-npm-packages']));


//console.log(stats('https://example.com'));
//export default stats;

//export default stats;
