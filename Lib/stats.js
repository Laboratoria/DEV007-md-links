import https from 'https';
// ==============================Statistics========================

// -----------------------------Create Links Array
export const createLinksArray = (extractedLinks) => {
  const linksArray = extractedLinks.map((linkObject) => linkObject.href);
  return linksArray;
};

// ----------------------------Check Link Status
export const checkLinkStatus = (link) => {
  return new Promise((resolve, reject) => {
    const request = https.get(link, (response) => {
      resolve(response.statusCode >= 200 && response.statusCode < 400);
    });

    request.on('error', (error) => {
      resolve(false);
    });
  });
};

// ----------------------------Get Statistics
export const stats = async (links) => {
  const uniqueCount = new Set(links).size;
  let brokenCount = 0;

  for (const link of links) {
    const isLinkBroken = !(await checkLinkStatus(link));

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
