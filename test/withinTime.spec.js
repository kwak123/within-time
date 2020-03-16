const path = require('path');
const ps = require('ps-node');
const subject = require('../lib/withinTime');

describe('within-time', () => {
  it('should be silent if process close within the right amount of time', done => {
    const filePath = path.resolve('./test/scenarios/closesAsExpected.js');
    subject(filePath, 200);
    checkProcessesAreKilled(done);
  });

  it('should close process if exceeds timelimit', done => {
    const filePath = path.resolve('./test/scenarios/doesNotClose.js');
    subject(filePath, 200);
    checkProcessesAreKilled(done);
  });

  // worst test name ever
  it('should handle directories', done => {
    const directoryPath = path.resolve('./test/scenarios');
    subject(directoryPath, 200);
    checkProcessesAreKilled(done);
  });

  const checkProcessesAreKilled = done =>
    setTimeout(() => {
      ps.lookup(
        {
          command: 'node',
        },
        (err, procList) => {
          if (err) {
            throw err;
          }

          if (procList.length > 1) {
            procList.forEach(proc => {
              const isTest = proc.arguments[1] === 'test';
              const isJest = proc.arguments[0].includes('jest');
              const isNotTestProcess = !isJest && !isTest;
              if (isNotTestProcess) {
                console.log(proc, isTest, isJest);
                throw 'process still exists';
              }
            });
          }

          done();
        },
      );
    }, 500);
});
