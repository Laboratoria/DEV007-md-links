import fs from 'fs';

export const readMdFiles = (mdFilesArray) => {
  // lee los archivos
  const fileContents = [];
  mdFilesArray.forEach((filePath) => {
    const readFile = fs.readFileSync(filePath);
    const fileContent = readFile.toString();
    fileContents.push({fileContent: fileContent, File: filePath});
  });
  console.log(fileContents, 555555);
  return fileContents;
}; 

const extractLinks = (objectWithMDDataArray) => {
  const objectLinksArray = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;

  if (!objectWithMDDataArray || objectWithMDDataArray.length === 0) {
    return objectLinksArray;
  }

  objectWithMDDataArray.forEach((objectWithMDData) => {
    //const { fileData, file } = objectWithMDData;
    console.log(objectWithMDData, 2222);

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

const objectWithMDDataArray = [
  'C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\Lib\\Example\\Subexample\\READ.md',
  'C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\Lib\\Example\\Subexample\\README copy.md',
  'C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\Lib\\Example\\Subexample\\README.pt.md'
];

const readenfiles = readMdFiles(objectWithMDDataArray);
console.log(readMdFiles);
const extractedLinks = extractLinks(readenfiles);
console.log(extractedLinks);
