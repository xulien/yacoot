var fs = require('fs')
var spawn = require('child_process').spawn
var debug = require('debug')('yacoot')

module.exports = function(readStream, cb) {
  var data, str, args = ['-format',
    '{\\"width\\":%w,\\"height\\":%h,\\"cquality\\":%Q,\\"size\\":\\"%b\\",\\"type\\":\\"%m\\"}',
    '-'
  ];
  var identify = spawn('identify', args);

  readStream.pipe(identify.stdin);

  identify.stdout.on('data', function(chunk) {
    data = chunk;
  });

  identify.stdout.on('end', function() {
    try {
      var report = JSON.parse(data);
      report.ratio = report.width / report.height;
      debug('Image has been identified');
      return cb(null, report);
    } catch (e) {
      return cb(new Error(e));
    }
  });
}
