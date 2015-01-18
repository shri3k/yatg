'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');
var async = require('async');

var file = fs.createWriteStream;
var fullDest = null;
var fullPath = null;

var protocols = ['https', 'http'];
var source = ['https://raw.githubusercontent.com/'];
var reqOptions = {
  host: 'raw.githubusercontent.com',
  path: null
};

function partial(fn) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var allArgs = Array.prototype.slice.call(arguments).concat(args);
    fn.apply(self, allArgs);
  }
}

function writeFile(res) {
  res.pipe(file);
  file.on('close', function() {
    file.close(cb);
  });
  res.on('error', function(err) {
    console.log('Can\'t write to file %s', err);
  });
}

function getIndex(res, cb) {
  var manifest = '';
  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    manifest += chunk;
  });
  res.on('end', function() {
    cb(manifest);
  });
}

function init(protocol, action, cb) {
  var currentProtocol = protocols[protocol];
  var netProtocol = require(currentProtocol);
  reqOptions.path = fullPath;
  netProtocol.get(reqOptions, function(res) {
    if (Number(res.statusCode) >= 400) {
      console.log('File not found in %s.', currentProtocol);
      if (protocols[++protocol]) {
        console.log('Trying with %s ', protocols[protocol]);
        return init(protocol, action);
      }
    }
    action(res, cb);
  }).on('error', function(e) {
    console.log('Error getting file %s', e);
  });
  return;
}

function getBaseFileName(fullPath) {
  var urlObj = url.parse(fullPath);
  return path.basename(urlObj.pathname);
}

function isJS(base) {
  return path.extname(base) === '.js';
}

function download(Url, dest, cb) {
  var URL = Url;

  if (cb === undefined) {
    URL = isJS(getBaseFileName(Url)) ? Url : url.resolve('/'.concat(Url).concat('/'), './master/index.js');
    cb = dest;
    dest = undefined;
  }
  fullPath = URL;
  fullDest = dest || null;
  var initialize = partial(init, cb)
  var action = dest ? writeFile : getIndex;
  initialize(0, action);
}

module.exports = download;
