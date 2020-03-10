const child_process = require('child_process');

module.exports = absoluteFilePath => {
  let shouldClose = true;
  childProcess = child_process.fork(absoluteFilePath);

  childProcess.on('close', () => {
    shouldClose = false;
  });

  childProcess.on('exit', () => {
    shouldClose = false;
  });

  const timeout = process.env.NODE_ENV === 'test' ? 50 : 1000;

  setTimeout(() => {
    if (shouldClose) {
      const file = absoluteFilePath.split('/').pop();
      console.log(
        `childProcess for file ${file} did not close in 1 second, killing`,
      );
      childProcess.kill('SIGKILL');
    }
  }, timeout);
};
