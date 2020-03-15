const fs = require('fs');
const { promisify } = require('util');

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

  async getFileNames() {
    if (!this.isDirectory) {
      throw `Attempted to get file names for non-directory path ${this.path}`;
    }

    const readDirAsync = promisify(fs.readdir);
    const dirContents = await readDirAsync(this.path, { withFileTypes: true });
    const dirFiles = dirContents.filter(dirEnt => dirEnt.isFile());
    const fileNames = dirFiles.map(dirEnt => dirEnt.name);
    return fileNames;
  }
}

module.exports = FSHelper;
