'use strict';

var download = require('../lib/download');
// var mkdirs = require('mkdirs');

module.exports = {
  "command": "create <manifest> <projectName>",
  "description": "Creates the scaffolding based on the provided manifest file",
  "action": function(manifest, projectName) {
    var test = download(manifest, function(yo) {
      var manifestContent = null;
      console.log(yo);
      try {
        manifestContent = JSON.parse(yo);
      } catch (e) {
        console.log(e);
      }
      require('../lib/mkdirs')(projectName, Object.keys(manifestContent));
    });
  }
}
