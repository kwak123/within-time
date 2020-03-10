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
  childProcess = child_process.fork(absoluteFilePath);

  const fileName = absoluteFilePath.split('/').pop();
  const timeout = process.env.NODE_ENV === 'test' ? 50 : 1000;

  const closeProcessTimeout = setTimeout(() => {
    if (shouldClose) {
      sendFailMessage(file, timeout);
      childProcess.kill('SIGKILL');
    }
  }, timeout);

  childProcess.on('close', () => {
    shouldClose = false;
    sendSuccessMessage(fileName);
    clearTimeout(closeProcessTimeout);
  });

  childProcess.on('exit', () => {
    shouldClose = false;
    sendSuccessMessage(fileName);
    clearTimeout(closeProcessTimeout);
  });
};
