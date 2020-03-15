const path = require('path');
const FSHelper = require('../lib/fsHelper');

describe('FSHelper', () => {
  describe('directory', () => {
    const directoryPath = path.resolve('./test/scenarios');
    let subject;

    beforeEach(() => {
      subject = new FSHelper(directoryPath);
    });

    describe('isDirectory', () => {
      it('should return true, if in directory', () => {
        expect(subject.isDirectory()).toBe(true);
      });
    });
  });
});
