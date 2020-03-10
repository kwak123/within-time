const chalk = require('chalk');
const child_process = require('child_process');

const sendFailMessage = (fileName, timeout) => {
  const lightGrey = '#999999';
  const failMessage =
    chalk.red('File ') +
    chalk.hex(lightGrey)(fileName) +
    chalk.red(' did not close in ') +
    chalk.hex(lightGrey)(`${timeout}ms`) +
    chalk.red(', killing!');
  console.log(failMessage);
};

module.exports = absoluteFilePath => {
  let shouldClose = true;
  childProcess = child_process.fork(absoluteFilePath);

  const timeout = process.env.NODE_ENV === 'test' ? 50 : 1000;

  const closeProcessTimeout = setTimeout(() => {
    if (shouldClose) {
      const file = absoluteFilePath.split('/').pop();
      sendFailMessage(file, timeout);
      childProcess.kill('SIGKILL');
    }
  }, timeout);

  childProcess.on('close', () => {
    shouldClose = false;
    clearTimeout(closeProcessTimeout);
  });

  childProcess.on('exit', () => {
    shouldClose = false;
    clearTimeout(closeProcessTimeout);
  });
};
