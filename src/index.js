'use strict';
var writeFile = require('safe-write-file');
var isExistingFile = require('is-existing-file');

module.exports = function createFile(filename, contents, cb) {
  isExistingFile(filename, function (yes) {
    if (yes) {
      return cb();
    }
    writeFile(filename, contents, 'utf8', cb);
  });
};
