var assert = require('chai').assert;
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;

var identify = require('../libs/identify');

var sample = __dirname + '/' + 'sample0.jpg';

describe('identify', function () {

    it('should return report object', function (done) {
        identify(sample, function (err, report) {
            assert.equal(report.width, 1200);
            assert.equal(report.height, 982);
            assert.equal(report.type, 'JPEG');
            assert.equal(report.name, 'sample0');
            assert.equal(report.colors, 136641);
            assert.equal(report.cquality, 94);
            done();
        });
    });

});

