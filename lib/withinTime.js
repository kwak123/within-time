const child_process = require('child_process');

module.exports = absoluteFilePath => {
  let shouldClose = true;
  childProcess = child_process.fork(absoluteFilePath);

  const timeout = process.env.NODE_ENV === 'test' ? 50 : 1000;

  const closeProcessTimeout = setTimeout(() => {
    if (shouldClose) {
      const file = absoluteFilePath.split('/').pop();
      console.log(
        `childProcess for file ${file} did not close in ${timeout}ms, killing`,
      );
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
