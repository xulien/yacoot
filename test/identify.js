var assert = require('chai').assert;
var fs = require('fs');
var identify = require('../libs/identify');

var readStream = fs.createReadStream('./test/sample2.jpg');

describe('identify', function() {
  it('sample2', function(done) {
    var report = identify(readStream, function(err, report) {
      assert.isNull(err, 'there was no error');
      assert.equal(report.width, 300);
      assert.equal(report.height, 200);
      assert.equal(report.cquality, 80);
      assert.equal(report.size, '10.7KB');
      assert.equal(report.type, 'JPEG');
      assert.equal(report.ratio, 1.5);
      done();
    });
  });
});
