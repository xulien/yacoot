var streamifier = require("streamifier")
var fs = require('fs')
var debug = require('debug')('yacoot')

module.exports = function(src, cb) {
  if (typeof src === 'string') {
    debug('Create buffer from string');
    fs.readFile(src, function(err, data) {
      return cb(err, data);
    });
  }
  if (typeof src === 'object') {
    debug('Create buffer with multer object');
    if (src.buffer) {
      debug('\t from buffer');
      return cb(null, src.buffer);
    }
    if (src.path) {
      debug('\t  from path');
      fs.readFile(src.path, function(err, data) {
        return cb(err, data);
      });
    }
  }
}
