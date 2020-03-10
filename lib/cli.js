const withinTime = require('./withinTime');

module.exports = args => {
  const [, , fileName] = args;

  if (!fileName) {
    return console.error('Filename must be provided');
  }

  withinTime(fileName);
};
