const subject = require('../lib/cli');
const withinTime = require('../lib/withinTime');
jest.mock('../lib/withinTime');

describe('cli', () => {
  let consoleSpy;
  let withinTimeMock;

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

    it('should call withinTime if provided good file name', () => {
      const ignoredOne = 'one';
      const ignoredTwo = 'two';
      const goodFileName = 'fileName';
      const args = [ignoredOne, ignoredTwo, goodFileName];
      subject(args);
      expect(withinTime).toBeCalledWith(goodFileName);
    });
  });
});
