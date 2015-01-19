'use strict';

var mkdirp = require('mkdirp');
var path = require('path');

function scaffold(projectName, manifest) {
  var download = require('./download');
  var manifestContent = null;
  var dirs = null;
  try {
    manifestContent = JSON.parse(manifest);
    dirs = Object.keys(manifestContent);
  } catch (e) {
    console.log(e);
  }
  if (Array.isArray(dirs)) {
    dirs.forEach(function(dir) {
      var truePath = path.resolve(projectName, dir);
			debugger;
      mkdirp(truePath, function(err) {
        if (err) {
          console.log("error creating: %s", dir);
        } else {
          console.log("created: %s", dir);
          download(manifestContent[dir], truePath, writeFile);
        }
      });
    });
  } else {
    console.log("empty directories found");
  }
}

function writeFile(err, data, options) {
  var fs = require('fs');
	console.log(data + '\n');
  console.log(options);
  var fileName = path.basename(options.path);
  var dir = options.dirOptions
  var filePath = path.resolve(dir, fileName);
  fs.writeFile(filePath, data, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Created: %s in %s", fileName, filePath);
  });
}
module.exports = scaffold;
