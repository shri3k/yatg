'use strict';

var download = require('../lib/download');
var mkdirs = require('../lib/mkdirs');
module.exports = {
  "command": "create <manifest> <projectName>",
  "description": "Creates the scaffolding based on the provided manifest file",
  "action": function(manifest, projectName) {
    download(manifest, function(err, yo) {
      if (err) {
        return err;
      }
      console.log(yo);
      mkdirs(projectName || './', yo);
    });
  }
}
