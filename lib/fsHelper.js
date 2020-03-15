const fs = require('fs');

class FSHelper {
  constructor(path) {
    this.path = path;
    this.stats = fs.lstatSync(path);
  }

  get isDirectory() {
    return this.stats.isDirectory();
  }

  get isFile() {
    return this.stats.isFile();
  }
}

module.exports = FSHelper;
