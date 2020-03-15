const path = require('path');
const FSHelper = require('../lib/fsHelper');

describe('FSHelper', () => {
  describe('with directory path', () => {
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

  describe('with file path', () => {
    const filePath = path.resolve('./test/fsScenarios/fileOne.js');
    let subject;

    beforeEach(() => {
      subject = new FSHelper(filePath);
    });

    describe('isDirectory', () => {
      it('should return false', () => {
        expect(subject.isDirectory).toBe(false);
      });
    });

    describe('isFile', () => {
      it('should return true', () => {
        expect(subject.isFile).toBe(true);
      });
    });

    describe('getFileNames', () => {
      it('should throw error', async () => {
        // Don't really care what it throws
        await expect(subject.getFileNames()).rejects.toBeTruthy();
      });
    });
  });
});
