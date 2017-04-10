var assert = require('chai').assert
var fs = require('fs')
var resize = require('../libs/resize')
var dcp = require('duplex-child-process')

var readStream = fs.createReadStream('./test/sample2.jpg');

describe('resize', function() {
  it('sample2', function(done) {

    var input = {
      width: 300,
      height: 200,
      cquality: 80,
      size: '10.7KB',
      type: 'JPEG',
      ratio: 1.5
    };

    var output = {
      width: 100,
      height: 50,
      ratio: 1.5
    };

    var getFormat = dcp.spawn('identify', ['-format', '{\\"width\\":%w,\\"height\\":%h,\\"cquality\\":%Q,\\"size\\":\\"%b\\",\\"type\\":\\"%m\\"}',
      '-'
    ]);

    readStream.pipe(resize(input, output)).pipe(getFormat).once('readable', function() {
      var format = JSON.parse(this.read().toString('utf8'));
      assert.equal(format.width, 75);
      assert.equal(format.height, 50);
      assert.equal(format.cquality, 80);
      assert.equal(format.size, '1.48KB');
      assert.equal(format.type, 'JPEG');
      done();
    })
  });
});
