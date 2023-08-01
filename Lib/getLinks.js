import fs, { read } from 'fs';
// ===============================Get Links============================

// --------------------------Read Files
export const readMdFiles = (mdFilesArray) => {
  // lee los archivos
  const fileContents = [];
  mdFilesArray.forEach((filePath) => {
    const readFile = fs.readFileSync(filePath);
    const fileContent = readFile.toString();
    fileContents.push({fileContent: fileContent, File: filePath});
  });
  //console.log(fileContents, 555555);
  return fileContents;
}; 

// --------------------------Extact Links Object
const extractLinks = (objectWithMDDataArray) => {
  const objectLinksArray = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;

  if (!objectWithMDDataArray || objectWithMDDataArray.length === 0) {
    return objectLinksArray;
  }

  objectWithMDDataArray.forEach((objectWithMDData) => {

    let match = regex.exec(objectWithMDData.fileContent);
    while (match !== null) {
      const linkText = match[1];
      const linkUrl = match[2];

      objectLinksArray.push({
        href: linkUrl,
        text: linkText,
        file: objectWithMDData.File,
      });

      match = regex.exec(objectWithMDData.fileContent);
    }
  });

  return objectLinksArray;
};

export const objectWithMDDataArray = [
  'C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\Lib\\Example\\Subexample\\READ.md',
  'C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\Lib\\Example\\Subexample\\README copy.md',
  'C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\Lib\\Example\\Subexample\\README.pt.md'
];

export const readenfiles = readMdFiles(objectWithMDDataArray);
//console.log(readMdFiles);
const extractedLinks = extractLinks(readenfiles);
//console.log(extractedLinks);
export default { readMdFiles, extractLinks, readenfiles};