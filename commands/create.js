'use strict';

var download = require('../lib/download');
// var mkdirs = require('mkdirs');

module.exports = {
  "command": "create <manifest>",
  "description": "Creates the scaffolding based on the provided manifest file",
  "action": function(manifest) {
		var test = download(manifest, function(yo){
			console.log(yo);
		});
  }
}
