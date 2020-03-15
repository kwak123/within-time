const fs = require('fs');

class FSHelper {
  constructor(path) {
    this.path = path;
    this.stats = fs.lstatSync(path);
  }

  isDirectory() {
    return this.stats.isDirectory();
  }
}

module.exports = FSHelper;
