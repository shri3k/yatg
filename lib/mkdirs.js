'use strict';

var mkdirp = require('mkdirp');
var path = require('path');

function scaffold(projectName, dirs) {
  if (Array.isArray(dirs)) {
    dirs.forEach(function(dir) {
      mkdirp(path.resolve(projectName, dir), function(err) {
        if (err) {
          console.log("Error creating: %s", dir);
        } else {
          console.log("Created: %s", dir);
        }
      });
    });
  } else{
		console.log("Empty directories found");
	}
}

module.exports = scaffold
