var async = require('async');
var resize = require('./resize');
var debug = require('debug')('yacoot');
var mozjpeg = require('mozjpeg-stream');
var write = require('./write');
var fs = require('fs');
var AWS = require('aws-sdk');

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
          if (output.s3) {
            var options = {
              accessKeyId: output.s3.key,
              secretAccessKey: output.s3.secret,
              region: output.s3.region || 'eu-central-1',
              params: {
                Bucket: 'i2m',
                ACL: 'public-read',
                CacheControl: 'max-age=86400'
              }
            }

            var fileStream = fs.createReadStream('/tmp/' + output.name + '.jpg');
              fileStream.on('error', function (err) {
                if (err) { throw err; }
            });

            var s3 = new AWS.S3(options);

            var params = {
              Key: output.target + '/' + output.name + '.jpg',
              Body: fileStream
            }

            s3.putObject(params, function(err, data) {
              if (err) console.log('Error uploading data: ', err);
              else console.log('Successfully uploaded data: ', data);

              debug('%s done', output.name);
              done();
            })

          } else {
            debug('%s done', output.name);
            done();
          }
        });
    },
    function(err) {
      cb(err);
    });

}
