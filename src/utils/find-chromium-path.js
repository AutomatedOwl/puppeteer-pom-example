const fs = require("fs");
const path = require("path");

let findChromiumPath = function (dir, pattern) {
  // This is where we store pattern matches of all files inside the directory
  let results = [];
  let foundString = false;

  // Read contents of directory
  fs.readdirSync(dir).forEach(function (dirInner) {
    // Obtain absolute path
    if (!foundString) {
      dirInner = path.resolve(dir, dirInner);

      // Get stats to determine if path is a directory or a file
      let stat = fs.statSync(dirInner);

      // If path is a file and ends with pattern then push it onto results
      if (stat.isDirectory() && dirInner.includes(pattern)) {
        results.push(dirInner);
        foundString = true;
        return;
      }

      // If path is a directory, scan it and combine results
      if (stat.isDirectory()) {
        results = results.concat(findChromiumPath(dirInner, pattern));
      }
    }
  });
  return results[0];
};

module.exports = findChromiumPath;
