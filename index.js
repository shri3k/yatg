'use strict';

var program = require('commander');
var pkg = require('./package.json');
var commands = require('./commands')(program);
program
  .version(pkg.version);

program.parse(process.argv);
