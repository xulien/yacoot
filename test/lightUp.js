var assert = require('chai').assert;
var fs = require('fs');
var lightUp = require('../libs/lightUp');
var dcp = require('duplex-child-process');

var readStream = fs.createReadStream('./test/sample2.jpg');

describe('lightup', function () {

    it('sample2', function (done) {

        var output = {};

        var getFormat = dcp.spawn('identify', ['-format', '{\\"width\\":%w,\\"height\\":%h,\\"cquality\\":%Q,\\"size\\":\\"%b\\",\\"type\\":\\"%m\\",\\"red\\":%[fx:mean.r],\\"green\\":%[fx:mean.g],\\"blue\\":%[fx:mean.b]}',
            '-'
        ]);

        readStream.pipe(lightUp(output)).pipe(getFormat).once('readable', function() {
            var format = JSON.parse(this.read().toString('utf8'));
            assert.equal(format.red, 0.29523);
            assert.equal(format.green, 0.098165);
            assert.equal(format.blue, 0.046614);
            done();
        });

    });

});
