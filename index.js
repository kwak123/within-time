#!/usr/bin/env node

const withinTime = require('./lib/withinTime');

const [, , fileName] = process.argv;

if (!fileName) {
  return console.error('Filename must be provided');
}

withinTime(fileName);
