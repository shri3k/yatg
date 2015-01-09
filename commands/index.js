'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var ignoreFiles = ['index.js'];

var cmdDir = './commands';
/**
 * get the required files
 *
 * @method getFiles
 * @param {String, Function} directory where files need to be scanned
 */
function getFiles(dir) {
  var data = fs.readdirSync(dir);
  return _.difference(data, ignoreFiles);
}

function cmd(program) {
  var files = getFiles(cmdDir);
  files.forEach(function(file) {
    if (path.extname(file) === ".js") {
      var cmd = require('./' + file);
      program
        .command(cmd.command)
        .description(cmd.description)
        .action(cmd.action);
    }
  });
}
module.exports = cmd;
