import { extractedMD } from '../Lib/getFiles.js';
import { extractLinks } from '../Lib/getLinks.js';
import { createLinksArray, checkLinkStatus, stats, statsOffline, checkStats } from '../Lib/stats.js';
import { validateLinks } from '../Lib/validate.js';




/*jest.mock('../Lib/getFiles.js', () => ({
  extractedMD: jest.fn(),
}));
jest.mock('../Lib/stats.js', () => ({
  checkLinkStatus: jest.fn(),

}));
*/

test('extractedMD returns an array of markdown files', () => {
  const expectedFiles = ['C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\test\\sample\\route\\file1.md',
   'C:\\Users\\Javiera\\Desktop\\Laboratoria\\MDLinks\\DEV007-md-links\\test\\sample\\route\\file2.md'];

  const result = extractedMD('C:/Users/Javiera/Desktop/Laboratoria/MDLinks/DEV007-md-links/test/sample/route');

  expect(result).toEqual(expectedFiles);
});

describe('extractLinks', () => {
  test('Returns an array of extracted links', () => {
    const objectWithMDDataArray = [
      {
        fileContent: '[Link 1](http://example.com)',
        File: 'file1.md',
      },
      {
        fileContent: '[Link 2](http://example.com)',
        File: 'file2.md',
      },
    ];

    const expectedLinks = [
      {
        href: 'http://example.com',
        text: 'Link 1',
        file: 'file1.md',
      },
      {
        href: 'http://example.com',
        text: 'Link 2',
        file: 'file2.md',
      },
    ];

    const result = extractLinks(objectWithMDDataArray);

    expect(result).toEqual(expectedLinks);
  });

  test('Returns an empty array for an empty input array', () => {
    const objectWithMDDataArray = [];

    const result = extractLinks(objectWithMDDataArray);

    expect(result).toEqual([]);
  });

  test('Returns an empty array for null input', () => {
    const objectWithMDDataArray = null;

    const result = extractLinks(objectWithMDDataArray);

    expect(result).toEqual([]);
  });
});

// ----------------------CREATE LINKS ARRAY
describe('createLinksArray', () => {
  test('Returns an array of link objects', () => {
    const extractedLinks = ["https://example.com", "https://test.com"];
    const expectedLinks = [
      { href: "https://example.com" },
      { href: "https://test.com" }
    ];

    const result = createLinksArray(extractedLinks);

    expect(result).toEqual(expectedLinks);
  });
});

//--------------------CHECK LINKS STATUS
describe('checkLinkStatus', () => {
  test('Returns the HTTP response status code for a valid link', async () => {
    const link = { href: 'https://example.com' };
    const expectedStatusCode = 200;

    const result = await checkLinkStatus(link);

    expect(result).toEqual(expectedStatusCode);
  });

  test('Throws an error for a broken link', async () => {
    const link = { href: 'https://brokibli.com/' };

    await expect(checkLinkStatus(link)).rejects.toThrowError('Link is broken');
  });
});

//--------------------------STATS
describe('stats', () => {
  test('Returns the correct statistics object for an array of links', async () => {
    const links = [
      { href: 'https://example.com' },
      { href: 'https://google.com' },
    ];

    const expectedStatistics = {
      Unique: 2,
      Broken: 0,
      Total: 2,
    };

    const result = await stats(links);

    expect(result).toEqual(expectedStatistics);
  });
});
// --------------------STATS OFFLINE
describe('statsOffLine', () => {
  test('Returns the correct statistics object for an array of links', async () => {
    const links = [
      { href: 'https://example.com' },
      { href: 'https://google.com' },
    ];
  
    const expectedStatistics = {
      Unique: 2,
      Broken: 0,
      Total: 2,
    };
  
    const result = await stats(links);
  
    expect(result).toEqual(expectedStatistics);
  });
});
//--------------------CHECK STATS
describe('checkStats', () => {
  test('Returns the correct statistics object for an array of links in online mode', async () => {
    const links = [
      { href: 'https://example.com' },
      { href: 'https://google.com' },
    ];
  
    const expectedStatistics = {
      Unique: 2,
      Broken: 0,
      Total: 2,
    };
  
    const result = await checkStats(links, true);
  
    expect(result).toEqual(expectedStatistics);
  });

  test('Returns the correct statistics object for an array of links in offline mode', async () => {
    const links = [
      { href: 'https://example.com', status: 200 },
      { href: 'https://brokibli.com', status: 404 },
    ];
  
    const expectedStatistics = {
      Unique: 2,
      Broken: 1,
      Total: 2,
    };
  
    const result = await checkStats(links, false);
  
    expect(result).toEqual(expectedStatistics);
  });
});

// ----------------------------ValidateLinks
describe('validateLinks', () => {
  test('should validate an array of links and return the correct statuses', async () => {
    const links = ['http://example.com', 'https://example.com'];
    const expectedStatuses = [200, 200];

    //checkLinkStatus.mockResolvedValueOnce(expectedStatuses[0]);
    //checkLinkStatus.mockResolvedValueOnce(expectedStatuses[1]);

    const result = await validateLinks(links);

    expect(result).toEqual([
      {
        href: 'http://example.com',
        text: '',
        status: expectedStatuses[0],
        ok: true
      },
      {
        href: 'https://example.com',
        text: '',
        status: expectedStatuses[1],
        ok: true
      }
    ]);

    expect(checkLinkStatus).toHaveBeenCalledWith(links[0]);
    expect(checkLinkStatus).toHaveBeenCalledWith(links[1]);
  });

  test('should validate a single link and return the correct status', async () => {
    const link = 'http://example.com';
    const expectedStatus = 200;

    checkLinkStatus.mockResolvedValueOnce(expectedStatus);

    // Call the validateLinks function
    const result = await validateLinks(link);

    // Assert that the result matches the expected output
    expect(result).toEqual({
      href: link,
      text: '',
      status: expectedStatus,
      ok: true
    });

    expect(checkLinkStatus).toHaveBeenCalledWith(link);
  });
});
