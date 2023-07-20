import * as fs from 'node:fs';

// import * as path from 'node:path';
import searchlinks from '../src/extractLinks';


jest.mock('node:fs');

describe('extractLinksFromFile function', () => {
  beforeEach(() => {
    fs.readFile.mockReset();
  });

})