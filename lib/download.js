'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');
var async = require('async');
var writeFile = require('./mkdirs').writeFile;

var fullDest = null;
var fullPath = null;

var protocols = ['https', 'http'];
var source = ['https://raw.githubusercontent.com/'];

function partial(fn) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var allArgs = Array.prototype.slice.call(arguments).concat(args);
    fn.apply(self, allArgs);
  }
}

function getFile(res, cb, options) {
  var manifest = '';
  var currentOptions = options;
  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    manifest += chunk;
  });
  res.on('error', function(e) {
    cb(e)
  });
  res.on('end', function() {
    var currentOptions = options;
    cb(null, manifest, currentOptions);
  });
}

function netCb(optionsObj) {
  var protocol = optionsObj.protocol;
  var options = optionsObj.options;
  var cb = optionsObj.cb;
	var reqOptions = optionsObj.reqOptions;

  return function(res) {
    if (Number(res.statusCode) >= 400) {
      console.log('File not found in %s.', currentProtocol);
      if (protocols[protocol + 1]) {
        console.log('Trying with %s ', protocols[protocol]);
        return init(protocol++, options);
      }
    }
    getFile(res, cb, reqOptions);
  };
}

function init(protocol, options, cb) {
  var currentProtocol = protocols[protocol];
  var netProtocol = require(currentProtocol);
  var reqOptions = {
    host: 'raw.githubusercontent.com',
    path: fullPath,
    dirOptions: options || ''
  };

  netProtocol.get(reqOptions, netCb({
    'protocol': protocol,
    'options': options,
    'cb': cb,
    'currentProtocol': currentProtocol,
		'reqOptions': reqOptions
  })).on('error', function(e) {
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

  //cb == undefined is how we know it's manifest request or file request
  if (cb === undefined) {
    URL = isJS(getBaseFileName(Url)) ? Url : url.resolve('/'.concat(Url).concat('/'), './master/index.js');
    cb = dest;
    dest = undefined;
  }
  fullPath = URL;
  fullDest = dest || null;
  var initialize = partial(init, cb)
  initialize(0, dest);
}

module.exports = download;
