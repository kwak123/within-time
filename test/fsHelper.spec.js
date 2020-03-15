const path = require('path');
const FSHelper = require('../lib/fsHelper');

describe('FSHelper', () => {
  describe('with directory', () => {
    const directoryPath = path.resolve('./test/scenarios');
    let subject;

    beforeEach(() => {
      subject = new FSHelper(directoryPath);
    });

    describe('isDirectory', () => {
      it('should return true', () => {
        expect(subject.isDirectory).toBe(true);
      });
    });

    describe('isFile', () => {
      it('should return false', () => {
        expect(subject.isFile).toBe(false);
      });
    });
  });
});
