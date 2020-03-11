const subject = require('../lib/cli');
const withinTime = require('../lib/withinTime');
jest.mock('../lib/withinTime');

describe('cli', () => {
  let consoleSpy;

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    consoleSpy = jest.spyOn(global.console, 'error');
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('acceptable filenames', () => {
    it('should log error if missing', () => {
      subject([]);
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('should call withinTime if provided good file name and timeout', () => {
      const ignoredOne = 'one';
      const ignoredTwo = 'two';
      const goodFileName = 'fileName.js';
      const timeout = 100;
      const args = [ignoredOne, ignoredTwo, goodFileName, timeout];
      subject(args);
      expect(withinTime).toBeCalledWith(goodFileName, timeout);
    });

    it('should call withinTime with default timeout of 1000ms if provided good file name', () => {
      const ignoredOne = 'one';
      const ignoredTwo = 'two';
      const goodFileName = 'fileName.js';
      const defaultTimeout = 1000;
      const args = [ignoredOne, ignoredTwo, goodFileName];
      subject(args);
      expect(withinTime).toBeCalledWith(goodFileName, defaultTimeout);
    });
  });
});
