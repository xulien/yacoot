var fs = require('fs')
var knox = require('knox')
var dirstream = require('mkdirp-stream')
var debug = require('debug')('yacoot')

module.exports = function(output) {
  debug('Write file ');
  if (output.s3) {
    debug('to s3 %s', output.target + '/' + output.name + '.jpg');
    var client = knox.createClient(output.s3);
    return client.put(output.target + '/' + output.name + '.jpg', {
      'x-amz-acl': 'public-read'
    });
  } else {
    debug('to %s', process.cwd() + output.target);
    dirstream([process.cwd() + output.target]);
    return fs.createWriteStream(process.cwd() + output.target + '/' + output.name + '.jpg');
  }
}
