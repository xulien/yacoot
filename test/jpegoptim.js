var assert = require('chai').assert;
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;

var identify = require('../libs/jpegoptim');


describe('jpegoptim', function () {

    describe('with a file that does not exist', function () {
        var sample = __dirname + '/' + 'sample.jpg';
        it('should return an Error object', function (done) {
            identify(sample, function (err, info) {
                assert.ok(err instanceof Error);
                assert.isUndefined(info);

                done();
            });
        });

    });

});