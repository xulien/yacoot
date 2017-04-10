var fs = require('fs')
var dirstream = require('mkdirp-stream')
var debug = require('debug')('yacoot')

module.exports = function(output) {
  debug('Write file ');
  if (output.s3) {
    debug('to s3 %s', output.target + '/' + output.name + '.jpg');
    return fs.createWriteStream('/tmp/' + output.name + '.jpg');
  } else {
    debug('to %s', process.cwd() + output.target);
    dirstream([process.cwd() + output.target]);
    return fs.createWriteStream(process.cwd() + output.target + '/' + output.name + '.jpg');
  }
}
