const fs = require("fs");
const path = require("path");
let foundString = false;
let results = [];

let findChromiumPath = function (dir, pattern) {
  // Read contents of directory
  fs.readdirSync(dir).forEach(function (dirInner) {
    // Obtain absolute path
    if (!foundString) {
      dirInner = path.resolve(dir, dirInner);

      // Get stats to determine if path is a directory or a file
      let stat = fs.statSync(dirInner);
      let dirLength;
      if (stat.isDirectory()) {
        dirLength = fs.readdirSync(dirInner).length;
      }

      // If path is a file and ends with pattern then push it onto results
      if (stat.isDirectory() && dirInner.includes(pattern)) {
        results.push(dirInner);
        foundString = true;
        return;
      }

      // If path is a directory, scan it and combine results
      if (stat.isDirectory() && dirLength != 0) {
        findChromiumPath(dirInner, pattern);
      }
    }
  });
  return results[0];
};

module.exports = findChromiumPath;
