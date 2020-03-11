const chalk = require('chalk');
const withinTime = require('./withinTime');

const helloMessage = chalk.blue('Within Time');

module.exports = args => {
  console.log(helloMessage);
  const [, , fileName, timeout = 1000] = args;

  if (!fileName || !fileName.endsWith('.js')) {
    return console.error('Filename must be provided');
  }

  withinTime(fileName, timeout);
};
