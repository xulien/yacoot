var assert = require('chai').assert;
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;

var resize = require('../libs/resize');
var identify = require('../libs/identify');

var sample = __dirname + '/sample1.jpg';

describe('resize', function () {

    it('should create a cropped and resized picture', function (done) {

        var input = {
            width: 705,
            height: 1024,
            type: 'JPEG',
            name: 'sample1',
            src: '/home/jules/Travail/dev/yacoot/test/sample1.jpg',
            ratio: 0.6884765625
        };

        var output = {
            width: 240,
            height: 153,
            ratio: 240 / 153,
            target: __dirname + '/result',
            name: 'resizeTest',
            type: 'jpg'
        };

        resize(input, output, function (err) {
            assert.isNull(err);

            identify(__dirname + '/result/resizeTest.jpg', function (err, info) {
                assert.isNull(err);
                assert.equal(info.width, 240);
                assert.equal(info.height, 153);
                assert.equal(info.size, '19.7KB');
                done();
            });

        });
    });

});
