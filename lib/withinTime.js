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

const sendSuccessMessage = fileName => {
  const successMessage = chalk.green(`File ${fileName} passed!`);
  console.log(successMessage);
};

module.exports = absoluteFilePath => {
  let shouldClose = true;
  let killed = false;
  childProcess = child_process.fork(absoluteFilePath);

  const fileName = absoluteFilePath.split('/').pop();
  const timeout = process.env.NODE_ENV === 'test' ? 50 : 1000;

  const closeProcessTimeout = setTimeout(() => {
    if (shouldClose) {
      sendFailMessage(fileName, timeout);
      childProcess.kill('SIGKILL');
      killed = true;
    }
  }, timeout);

  childProcess.on('exit', signal => {
    shouldClose = false;
    if (!killed) {
      sendSuccessMessage(fileName);
    }
    clearTimeout(closeProcessTimeout);
  });
};
