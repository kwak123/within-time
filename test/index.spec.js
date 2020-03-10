const path = require('path');
const ps = require('ps-node');
const subject = require('../index');

describe('within-time', () => {
  it('true', done => {
    const filePath = path.resolve('./test/scenarios/closesAsExpected.js');
    subject(filePath);
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
              const isTest = proc.arguments.includes('test');
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
    }, 3000);
});
