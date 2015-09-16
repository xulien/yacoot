var execFile = require('child_process').execFile;
var jpegoptim = require('jpegoptim-bin');


module.exports = function (path, cb) {
  var args = [
      '--override',
      '--strip-all',
      '--strip-iptc',
      '--strip-icc',
      '--all-progressive',
      path
  ];

  execFile(jpegoptim.path, args, function (err) {
      cb(err);
  });

};
