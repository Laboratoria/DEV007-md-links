// validate.js
import http from 'http';
import https from 'https';
import { checkLinkStatus } from './stats.js';
import { log } from 'console';

// ===================================Validation

export const validateLinks = async (links) => {
  if( Array.isArray(links)){
    return Promise.all(links.map(async (link) => checkLinkStatus(link))).then((responses) => {
      return responses.map((httpCode, index) => ({...links[index],
          status: httpCode,
          ok: httpCode >= 200 && httpCode < 400,
        }))
    })
  }
  else {
    const httpCode = await checkLinkStatus(links)
    promises = res
      return {...links,
        status: httpCode,
        ok: httpCode >= 200 && httpCode < 400,
        }
    }
}

//console.log(await validateLink('https://www.areatecnologia.com/diagramas-de-flujo.htm'));

export default {validateLinks};
