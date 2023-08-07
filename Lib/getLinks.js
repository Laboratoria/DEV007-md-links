import fs, { read } from 'fs';
// ===============================Get Links============================

// --------------------------Read Files
const readMdFiles = (mdFilesArray) => {
  // lee los archivos
  //console.log(mdFilesArray, 3333);
  const fileContents = [];
  mdFilesArray.forEach((filePath) => {
    const readFile = fs.readFileSync(filePath);
    const fileContent = readFile.toString();
    fileContents.push({fileContent: fileContent, File: filePath});
  });
  return fileContents;
};

// --------------------------Extact Links Object
const extractLinks = (objectWithMDDataArray) => {
  const objectLinksArray = [];
  const regex = /\[([^\]]+)\]\(((?!#)[^)]+)\)/g;
  
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

export { readMdFiles, extractLinks};