const chalk = require('chalk');
const child_process = require('child_process');

const FSHelper = require('./fsHelper');

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

const sendInterruptedMessage = count => {
  let childProcessCountBlurb;

  if (count > 1) {
    childProcessCountBlurb = `${count} child processes`;
  } else {
    childProcessCountBlurb = `${count} child process`;
  }
  const interruptedMessage = chalk.red(
    `Within Time interrupted, closing ${childProcessCountBlurb}`,
  );
  console.log('\n');
  console.log(interruptedMessage);
};

process.on('SIGINT', () => {
  sendInterruptedMessage(runningChildren.size);
  runningChildren.forEach(childProcess => childProcess.kill('SIGINT'));
});

const runningChildren = new Set();

module.exports = async (path, timeout) => {
  const fsHelper = new FSHelper(path);

  if (fsHelper.isFile) {
    spawnProcess(path);
  } else {
    const filePaths = await fsHelper.getFilePaths();
    filePaths.forEach(filePath => spawnProcess(filePath));
  }

  function spawnProcess(filePath) {
    let shouldClose = true;
    let killed = false;
    const childProcess = child_process.fork(filePath);

    const fileName = filePath.split('/').pop();

    const closeProcessTimeout = setTimeout(() => {
      if (shouldClose) {
        sendFailMessage(fileName, timeout);
        childProcess.kill('SIGKILL');
        killed = true;
      }
    }, timeout);

    runningChildren.add(childProcess);

    childProcess.on('exit', (code, signal) => {
      runningChildren.delete(childProcess);
      shouldClose = false;
      // Null signal indicates
      if (!killed && signal !== 'SIGINT') {
        sendSuccessMessage(fileName);
      }
      clearTimeout(closeProcessTimeout);
    });
  }
};
