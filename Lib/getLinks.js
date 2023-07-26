import { log } from 'console';
import { readFileSync } from 'fs';

const getLinks = (filePath) => {
  console.log('pasé por aqí por getlinks')
  const fileContent = readFileSync(filePath, 'utf8');
  //console.log(fileContent);
  const regex = /\[(.*?)\]\((https?:\/\/(?:www\.)?[^\s)]+)\)/g;
  const links = [];
  let match;

  while ((match = regex.exec(fileContent)) !== null) {
    links.push(match[2]);
    //console.log(links, 54545454);
  }

  return links;
};

export { getLinks };

//console.log(getLinks('C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\README.md'));

//export default getLinks;
