const child_process = require('child_process');

module.exports = absoluteFilePath => {
  let shouldClose = true;
  process = child_process.fork(absoluteFilePath);

  process.on('close', () => {
    shouldClose = false;
  });

  process.on('exit', () => {
    shouldClose = false;
  });

  setTimeout(() => {
    if (shouldClose) {
      const file = absoluteFilePath.split('/').pop();
      console.log(
        `Process for file ${file} did not close in 3 seconds, killing`,
      );
      process.kill(process.pid);
    }
  });
};
