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
    const { href } = link;
    const httpModule = href.startsWith('https://') ? https : http;
    const request = httpModule.get(href, (response) => {
      resolve(response.statusCode);
    });
    request.on('error', (error) => {
      reject(new Error('Link is broken'));
    });
  });
};


// ----------------------------Get Statistics
/*export const stats = async (links) => {
  let brokenCount = 0
  const uniqueCount = [...new Set(links.map(item => item.href))].length;
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


export const statsOffline = (links) => {
  let brokenCount = 0
  const uniqueCount = [...new Set(links.map(item => item.href))].length;
  for (const link of links) {
    const isLinkBroken = !(link.status >= 200 && link.status < 400)
    if (isLinkBroken) brokenCount++;
  }

  return {
    Unique: uniqueCount,
    Broken: brokenCount,
    Total: links.length,
  };
};
*/
export const checkStats = async (links, isOnline = true) => {
  let brokenCount = 0;
  let isLinkBroken;
  const uniqueCount = [...new Set(links.map(item => item.href))].length;
  for (const link of links) {
    if (isOnline) {
      const checkStatLink = await checkLinkStatus(link);
      isLinkBroken = !(checkStatLink >= 200 && checkStatLink < 400)
    } else {
      isLinkBroken = !(link.status >= 200 && link.status < 400)
    }


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

/*const extractedLinks = [
  'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach',
  'https://es.wikipedia.org/wiki/Markdown',
  'https://nodejs.org/api/path.html',
];

const linksArray = createLinksArray(extractedLinks);*/
//console.log(linksArray);

//console.log(await stats(linksArray));
