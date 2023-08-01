import https from 'https';
import http from 'http';
// ==============================Statistics========================

// -----------------------------Create Links Array
export const createLinksArray = (extractedLinks) => {
  const linksArray = extractedLinks.map((link) => ({ href: link }));
  return linksArray;
};

// ----------------------------Check Link Status
export const checkLinkStatus = (link) => {
  return new Promise((resolve, reject) => {
    const { href } = link
    const httpModule = href.startsWith('https://') ? https : http;
    const request = httpModule.get(href, (response) => {
      resolve(response.statusCode);
    });
    request.on('error', (error) => {
      //resolve(0);
    });
  });
};

// ----------------------------Get Statistics
export const stats = async (links) => {
  const uniqueCount = [...new Set(links.map(item => item.href))].length;
  let brokenCount = 0;

  for (const link of links) {
    const checkStatLink = await checkLinkStatus(link);
    const isLinkBroken = !(checkStatLink >= 200 && checkStatLink < 400)

    if (isLinkBroken) {
      brokenCount++;
    }
  }

  return {
    Unique: uniqueCount,
    Broken: brokenCount,
    Total: links.length,
  };
};

const extractedLinks = [
  'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach',
  'https://es.wikipedia.org/wiki/Markdown',
  'https://nodejs.org/api/path.html',
];

const linksArray = createLinksArray(extractedLinks);
//console.log(linksArray);

//console.log(await stats(linksArray));