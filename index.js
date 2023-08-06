import fs from 'fs';
import path from 'path';
import axios from 'axios';


//****** Esta funcion verifica la ruta que existe ******//
export const existsRoute = (route) => {
  if (fs.existsSync(route)){
    return true;
  }else{
    return false;
  }
};

//****** Esta funcion convierte la ROUTE en absoluta ******//
export const routeAbsolute = (route) => {
  if (!path.isAbsolute(route)){
    return path.resolve(route)
  }else{
    return route
  }
};

//****** Esta funcion valida si la ruta es un directorio ******//
export const aDirectory = (route) => {
  let filesArray = [];
  const stAts = fs.statSync(route);
  if(stAts.isFile()){
    filesArray.push(route);
  }
  else if (stAts.isDirectory()){
    const files = fs.readdirSync(route, "utf-8");
    files.forEach((file) => {
      const routeNew = path.join(route, file);
      const newStats = fs.statSync(routeNew);
      if(newStats.isFile()){
        filesArray.push(routeNew);
      }
      else if(newStats.isDirectory()){
        filesArray = aDirectory(routeNew);
      }
    });
  }
  return filesArray;
}

//****** Esta funcion filtra los documentos con extension MD ******//
export function MdExtension(filesArray) {
  return filesArray.filter(file => path.extname(file) === '.md');
}

//****** Esta función lee el documento ******//
export const filesRead = (filesArray) => {
  const filesAll = [];
  filesArray.forEach((file) => {
    filesAll.push(
      new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      })
    );
  });
  return Promise.all(filesAll);
};

//****** Esta función lee los links de los documentos ******//
export const readLinks = (array) => {
  const Links = [];
  const regex = /\[.+?\]\(.+?\)/g;
  array.forEach((link) => {
    const matchLink = link.match(regex);
    if (matchLink){
      Links.push(...matchLink);
    }
  });
  return Links;
}

//****** Esta funcion valida el False ******//
export const falseLinks = (Links) => {
  const linksFalse = [];
  Links.forEach((link) => {
    const ruTa = path.resolve();
    if (link.match(/\[.+?\]\(.+?\)/g)) {
      const falseLink = link.match(/\[.+?\]\(.+?\)/g);

      const objectLink = {
        href: falseLink[0].match(/https*?:([^"')\s]+)/)[0],
        text: falseLink[0].match(/\[(.*?)\]/)[1],
        file: ruTa,
      };
      linksFalse.push(objectLink);
    }
  });
  return linksFalse;
}

//****** Axios ******//
export const ptnHTTP = (objsArr) => {
  const promisesArray = objsArr.map((Obj) => {
    return axios
    .get(Obj.href)
    .then((response) => {
      Obj.status = response.status
      Obj.mensaje = response.statusText
      return Obj
    })
    .catch((err) => { // Corregir el nombre del parámetro a "err"
      Obj.mensaje = "Fail"
      if(err.response){
        Obj.status = err.response.status;
      }
      return Obj
    });
  });
  return Promise.all(promisesArray)
}

//****** Esta funcion realiza las estadisticas de los links ******//
export const statsofLinks = (objsArr, thisOptValidate) => {
  return new Promise ((resolve) => {
    const statsAll = {
      total: objsArr.length,
      unique: new Set(objsArr.map((link) => link.href)).size,
    }
    if(thisOptValidate){
      statsAll.working = objsArr.filter(Obj => Obj.mensaje == 'OK').length;
      statsAll.broken = objsArr.filter(Obj => Obj.mensaje == 'Fail').length;
    }
    resolve(statsAll);
  });
}