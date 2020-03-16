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

    describe('getFilePaths', () => {
      it('should return all file paths', async () => {
        const expectedFilePaths = [
          path.resolve('./test/fsScenarios/fileOne.js'),
          path.resolve('./test/fsScenarios/fileTwo.js'),
        ];
        const receivedFilePaths = await subject.getFilePaths();
        expect(receivedFilePaths).toHaveLength(expectedFilePaths.length);
        expectedFilePaths.forEach(filePath =>
          expect(receivedFilePaths).toContain(filePath),
        );
      });
    });
  });

  describe('with file path', () => {
    const jsFilePath = path.resolve('./test/fsScenarios/fileOne.js');
    let subject;

    beforeEach(() => {
      subject = new FSHelper(jsFilePath);
    });

    describe('isDirectory', () => {
      it('should return false', () => {
        expect(subject.isDirectory).toBe(false);
      });
    });

    describe('isFile', () => {
      it('should return true if given JS file path', () => {
        const validJSFilePath = jsFilePath;
        subject = new FSHelper(validJSFilePath);
        expect(subject.isFile).toBe(true);
      });

      it('should return false if given non-JS file path', () => {
        const nonJSFilePath = path.resolve('./test/fsScenarios/nonJsFile');
        subject = new FSHelper(nonJSFilePath);
        expect(subject.isFile).toBe(false);
      });
    });

    describe('getFileNames', () => {
      it('should throw error', async () => {
        // Don't really care what it throws
        await expect(subject.getFilePaths()).rejects.toBeTruthy();
      });
    });
  });
});
