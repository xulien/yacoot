var async = require('async');
var resize = require('./resize');
var debug = require('debug')('yacoot');
var mozjpeg = require('mozjpeg-stream');
var write = require('./write');

module.exports = Image;

function Image(srcStream, report, outputs, cb) {

  debug('Starting image process');

  async.each(outputs, function(output, done) {

      if (!output.name) output.name = 'noname-' + output.width + 'x' + output
        .height;
      debug('Starting %s process', output.name);

      srcStream
        .pipe(resize(report, output))
        .pipe(mozjpeg({
          quality: 95
        }))
        .pipe(write(output))
        .on('close', function() {
          debug('%s done', output.name);
          done();
        });
    },
    function(err) {
      cb(err);
    });

}
