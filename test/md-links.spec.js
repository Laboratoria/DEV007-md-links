import { extractedMD } from '../Lib/getFiles.js';
import fs from 'fs';
import { readMdFiles } from '../Lib/getLinks.js';


describe('extractedMD', () => {
  test('should return an array of Markdown files in the directory', () => {
    const directoryPath = './Lib/Example'; // Replace with the actual directory path
    const expectedFiles = [
      "Lib\\Example\\Subexample\\READ.md",
      "Lib\\Example\\Subexample\\README copy.md",
      "Lib\\Example\\Subexample\\README.md",
      "Lib\\Example\\Subexample\\README.pt.md"
    ]; // Updated expected array of Markdown files
  
    const result = extractedMD(directoryPath);
  
    expect(result).toEqual(expectedFiles);
  });

  test('should return an empty array for a directory without Markdown files', () => {
    const directoryPath = "Lib\\Example\\Subexample\\Empty"; // Replace with the actual directory path
    const expectedFiles = []; // Empty array since there are no Markdown files in the subdirectory

    const result = extractedMD(directoryPath);

    expect(result).toEqual(expectedFiles);
  });

  test('should return an array with the path of the single Markdown file', () => {
    const filePath = "Lib\\Example\\Subexample\\READ.md"; // Replace with the actual file path
    const expectedFiles = [["Lib\\Example\\Subexample\\READ.md"]]; // Array with the path of the single Markdown file

    const result = extractedMD(filePath);

expect(result).toEqual(expectedFiles);
  });
});

describe('readMdFiles', () => {
  test('should return an array of objects with file content and file path', () => {
    const mdFilesArray = [
      'path/to/file1.md',
      'path/to/file2.md',
      'path/to/file3.md'
    ]; // Replace with your own array of Markdown file paths

    // Mocking fs.readFileSync to return a dummy file content
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce('File 1 Content')
      .mockReturnValueOnce('File 2 Content')
      .mockReturnValueOnce('File 3 Content');

    const expectedOutput = [
      { fileContent: 'File 1 Content', File: 'path/to/file1.md' },
      { fileContent: 'File 2 Content', File: 'path/to/file2.md' },
      { fileContent: 'File 3 Content', File: 'path/to/file3.md' }
    ]; // Replace with the expected output based on your mock data

    const result = readMdFiles(mdFilesArray);

    expect(result).toEqual(expectedOutput);
    
    // Restore the original implementation of fs.readFileSync
    fs.readFileSync.mockRestore();
  });
});