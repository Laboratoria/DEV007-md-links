const {
  mdLinks,
  readMarkdownFile,
  validateLink,
  statsValidatelinks,
  printStats,
  printStatsWithBroken,
} = require("../index");

const axios = require('axios');
const path = require('path');
const fs = require('fs');


// ---------------------mdLinks test-----------------------

describe("mdLinks", () => {
  it("It is function", () => {
    expect(typeof mdLinks).toBe("function");
  });
  // DF 1
  it("return: The path doesn't exist", (done) => {
    const resolveData = mdLinks(" ");
    resolveData
      .then((res) => expect(res).toStrictEqual("The path doesn't exist"))
      .catch((rej) => rej);
    done();
  });
 // DF 6
  it("return: The path does not exist .md file", (done) => {
    const resolveData = mdLinks(" ");
    resolveData
      .then((res) => expect(res).toBe("The path does not exist .md file"))
      .catch((rej) => rej);
    done();
  });
  // DF 2
  describe('mdLinks - Check if input path is absolute', () => {
    test('should convert relative path to an absolute path', () => {
      const inputPath = './testing/CardValidation/README.md';
      const options = { validate: true, stats: false };
      const resolvedPath = path.resolve(inputPath);

      return mdLinks(inputPath, options).then((result) => {
        expect(result).toBeTruthy();
      });
    });
    test('should handle absolute path correctly', () => {
      const inputPath = 'C:\\Users\\usuario\\DEV007-md-links-CLLP\\testing\\CardValidation\\README.md';
      const options = { validate: true, stats: false };
      const resolvedPath = path.resolve(inputPath);

      return mdLinks(inputPath, options).then((result) => {
        expect(result).toBeTruthy();
      });
    });
  });

});

// DF 4
describe("mdLinks - Directory Test", () => {
  it("should find and validate links in multiple .md files in a directory", () => {
    const directoryPath = path.resolve("./testing/CardValidation"); 
    const options = { validate: true, stats: false };

    return mdLinks(directoryPath, options).then((result) => {
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      result.forEach((link) => {
        expect(link.href).toBeDefined();
        expect(link.text).toBeDefined();
        expect(link.file).toBeDefined();
        expect(link.status).toBe(200); 
        expect(link.ok).toBe("ok");
      });
    });
  });
});

//DF 5
describe("mdLinks - Empty Directory Test", () => {
  it("should reject with an error for an empty directory", () => {
    const emptyDirectoryPath = path.resolve("./emptypath");
    const options = { validate: true, stats: false };

    return mdLinks(emptyDirectoryPath, options).catch((error) => {
    expect(error).toBe("The directory is empty or does not exist.");
    });
  });
});

// ---------------------readMarkdown test-----------------------

// DF 7
describe("readMarkdownFile", () => {
  it("It is function", () => {
    expect(typeof readMarkdownFile).toBe("function");
  });

  it("should return an array of objects with links for a valid Markdown file", (done) => {
    const filePath = path.resolve("testing/DataLovers/README.md"); 
    const options = { validate: false, stats: false };

    const expectedLinks = [
      { href: "http://pokemongolive.com", text: "Pokémon GO", file: filePath },
    ];

    readMarkdownFile(filePath, options)
      .then((links) => {
        expect(links).toEqual(expect.arrayContaining(expectedLinks));
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it("should return an array of objects with validated links for a valid Markdown file with 'validate' option", (done) => {
    const filePath = path.resolve("testing/DataLovers/README.md"); 
    const options = { validate: true, stats: false };
  
    const expectedValidatedLinks = [
      { href: "http://pokemongolive.com", text: "Pokémon GO", file: filePath, status: 200, ok: "ok" },
    ];
  
    readMarkdownFile(filePath, options)
      .then((links) => {
        expect(links).toEqual(expect.arrayContaining(expectedValidatedLinks));
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  
});

// ---------------------validateLink test-----------------------
// DF 10
describe('validateLink', () => {
  it('should resolve with a link object with status "ok" for successful requests', () => {
    const link = {
      href: 'http://README.com',
      text: 'Link README',
    };
    jest.spyOn(axios, 'get').mockResolvedValue({ status: 200, statusText: 'OK' });
    return validateLink(link).then((result) => {
      expect(result.status).toBe(200);
      expect(result.ok).toBe('ok');
    });
  });

  it('should resolve with a link object with status "fail" for failed requests', () => {
    const link = {
      href: 'http://README.com',
      text: 'Link README',
    };
    jest.spyOn(axios, 'get').mockRejectedValue(new Error('Request failed'));
    return validateLink(link).then((result) => {
      expect(result.status).toBe('Unknown');
      expect(result.ok).toBe('fail');
    });
  });
});

// ---------------------statsValidatelinks test-----------------------

describe('statsValidatelinks', () => {
  test('should return correct stats when there are no broken links', () => {
    const links = [
      { href: 'https://youtube.com', ok: 'ok' },
      { href: 'https://google.com', ok: 'ok' },
      { href: 'https://yahoo.com', ok: 'ok' },
    ];
    const expectedStats = {
      Total: 3,
      Unique: 3,
      Broken: 0,
    };
    const result = statsValidatelinks(links);
    expect(result).toEqual(expectedStats);
  });

  test('should return correct stats when there are some broken links', () => {
    const links = [
      { href: 'https://youtube.com', ok: 'ok' },
      { href: 'https://google.com', ok: 'fail' },
      { href: 'https://yahoo.com', ok: 'fail' },
      { href: 'https://facebook.com', ok: 'fail' },
    ];
    const expectedStats = {
      Total: 4,
      Unique: 4,
      Broken: 3,
    };
    const result = statsValidatelinks(links);
    expect(result).toEqual(expectedStats);
  });

  test('should return correct stats when there are duplicate links', () => {
    const links = [
      { href: 'https://google.com', ok: 'ok' },
      { href: 'https://google.com', ok: 'ok' },
      { href: 'https://facebook.com', ok: 'ok' },
    ];
    const expectedStats = {
      Total: 3,
      Unique: 2,
      Broken: 0,
    };
    const result = statsValidatelinks(links);
    expect(result).toEqual(expectedStats);
  });

  test('should return correct stats when there are no links', () => {
    const links = [];
    const expectedStats = {
      Total: 0,
      Unique: 0,
      Broken: 0,
    };
    const result = statsValidatelinks(links);
    expect(result).toEqual(expectedStats);
  });
});

// ---------------------printStats test-----------------------

describe('printStats', () => {
  test('should print the correct stats with colored output', () => {
    const originalConsoleLog = console.log;
    const output = [];
    console.log = jest.fn((...args) => {
      output.push(...args);
    });

    const links = [
      { href: 'https://facebook.com', text: 'Facebook', file: 'path/to/file.md', status: 200, ok: 'ok' },
      { href: 'https://google.com', text: 'Google', file: 'path/to/file.md', status: 200, ok: 'ok' },
      { href: 'https://example.com', text: 'Example', file: 'path/to/file.md', status: 404, ok: 'fail' },
    ];

    const stats = {
      Total: 3,
      Unique: 3,
      Broken: 1,
    };

    printStats(links, stats);

   
    console.log = originalConsoleLog;

  });
});

// ---------------------printStatsWithBroken test-----------------------

describe('printStatsWithBroken', () => {
  test('should print the correct stats with colored output including broken links', () => {
 
    const originalConsoleLog = console.log;
    const output = [];
    console.log = jest.fn((...args) => {
      output.push(...args);
    });

    const links = [
      { href: 'https://facebook.com', text: 'Facebook', file: 'path/to/file.md', status: 200, ok: 'ok' },
      { href: 'https://google.com', text: 'Google', file: 'path/to/file.md', status: 200, ok: 'ok' },
      { href: 'https://example.com', text: 'Example', file: 'path/to/file.md', status: 404, ok: 'fail' },
    ];

    const stats = {
      Total: 3,
      Unique: 3,
      Broken: 1,
    };

    printStatsWithBroken(links, stats);
    console.log = originalConsoleLog;
  });
});

