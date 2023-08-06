import { existsRoute, routeAbsolute, aDirectory,  MdExtension, filesRead, readLinks, falseLinks, ptnHTTP, statsofLinks} from "./index.js";
import chalk from 'chalk';

//****** Esta funcion valida que la ruta existe ******//
export const mdLinks = (route, options) => {
    return new Promise((resolve, reject) => {
        const thisExists = existsRoute(route)
        if(thisExists) {
            routeAbsolute(route);
            const archives = aDirectory(route);
            const mdFiles = MdExtension(archives);
            filesRead(mdFiles)
            .then((data) => {
                const links = readLinks(data)
                const linksObjs = falseLinks(links);

            if(options.validate && options.stats){
                ptnHTTP(linksObjs).then((linksvalidate) => {
                    statsofLinks(linksvalidate, options.validate).then((res) => resolve(res));
                    });
              }else if (options.validate){
                ptnHTTP(linksObjs).then((res) => resolve(res));
              }else if (options.stats){
                statsofLinks(linksObjs, options.validate).then((res) => resolve(res));
              } else{
                resolve(linksObjs)
              }
            })
            .catch((err) => {
                reject(err);
            });
        }else {
            console.log(chalk.bold.red('Esta ruta no existe'));
        }
    });
};