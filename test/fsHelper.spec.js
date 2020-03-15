const path = require('path');
const FSHelper = require('../lib/fsHelper');

describe('FSHelper', () => {
  describe('with directory', () => {
    const directoryPath = path.resolve('./test/fsScenarios');
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

    describe('getFileNames', () => {
      it('should return all file names', async () => {
        const expectedFileNames = ['fileOne.js', 'fileTwo.js'];
        const receivedFileNames = await subject.getFileNames();
        expectedFileNames.forEach(fileName =>
          expect(receivedFileNames).toContain(fileName),
        );
      });
    });
  });
});
