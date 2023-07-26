import { readFileSync } from 'fs';

const getLinks = (filePath) => {
  console.log('pasé por aqí por getlinks')
  const fileContent = readFileSync(filePath, 'utf8');
  const regex = /\[(.*?)\]\((https?:\/\/(?:www\.)?[^\s)]+)\)/g;
  const links = [];
  let match;

  while ((match = regex.exec(fileContent)) !== null) {
    links.push(match[2]);
  }

  return links;
};

export { getLinks };

//console.log(getLinks('C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\README.md'));

//export default getLinks;
