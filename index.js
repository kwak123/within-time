const child_process = require('child_process');

let shouldClose = true;

process.on('close', () => {
  shouldClose = false;
});

process.on('exit', () => {
  shouldClose = false;
});

setTimeout(() => {
  if (shouldClose) {
    console.log('Process did not close, killing');
    process.kill(process.pid);
  }
}, 1000);
