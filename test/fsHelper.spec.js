const path = require('path');
const FSHelper = require('../lib/fsHelper');

describe('FSHelper', () => {
  describe('directory', () => {
    const directoryPath = path.resolve('./test/scenarios');
    let subject;

    beforeEach(() => {
      subject = new FSHelper(directoryPath);
    });

    it('should pass', () => {});
  });
});
