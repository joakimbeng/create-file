'use strict';
var fs = require('fs');
var path = require('path');
var test = require('tape');
var createFile = require('../src');

test('file exists', function (assert) {
  assert.plan(2);
  var filename = path.join(__dirname, 'existing-file');
  createFile(filename, 'other content', function (err) {
    assert.error(err, 'No error should occur');
    var content = fs.readFileSync(filename, 'utf8');
    assert.equal(content, 'content\n', 'The file should be untouched');
  });
});

test('file does not exist', function (assert) {
  assert.plan(2);
  var filename = path.join(__dirname, 'folder', 'not-existing-file');
  createFile(filename, 'other content', function (err) {
    assert.error(err, 'No error should occur');
    var content = fs.readFileSync(filename, 'utf8');
    assert.equal(content, 'other content', 'The file should be created');
    fs.unlinkSync(filename);
    fs.rmdirSync(path.dirname(filename));
  });
});
