var assert = require('chai').assert;
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;

var yacoot = require('../index');
var identify = require('../libs/identify');

var fakeFiles = [], i = 0;

for (i; i < 3; i++) {
    fakeFiles.push({path: __dirname + '/' + 'sample' + i + '.jpg'});
}

describe('index', function () {
    it('should return a "result" directory with multiple cropped and resized pictures', function (done) {

        yacoot(fakeFiles, true)
            .global({
                width: 500,
                target: __dirname + '/result/'
            })
            .to({width: 240, height: 153})
            .to()
            .to({width: 100})
            .exec(function (err) {
                assert.isUndefined(err);

                identify(__dirname + '/result/sample0-100x200.jpg', function (err, info01) {
                    assert.isNull(err);
                    identify(__dirname + '/result/sample0-240x153.jpg', function (err, info02) {
                        assert.isNull(err);
                        identify(__dirname + '/result/sample0-500x200.jpg', function (err, info03) {
                            assert.isNull(err);
                            identify(__dirname + '/result/sample1-100x200.jpg', function (err, info11) {
                                assert.isNull(err);
                                identify(__dirname + '/result/sample1-240x153.jpg', function (err, info12) {
                                    assert.isNull(err);
                                    identify(__dirname + '/result/sample1-500x200.jpg', function (err, info13) {
                                        assert.isNull(err);
                                        identify(__dirname + '/result/sample2-100x200.jpg', function (err, info21) {
                                            assert.isNull(err);
                                            identify(__dirname + '/result/sample2-240x153.jpg', function (err, info22) {
                                                assert.isNull(err);
                                                identify(__dirname + '/result/sample2-500x200.jpg', function (err, info23) {
                                                    assert.isNull(err);
                                                    assert.equal(info01.size, "9.27KB");
                                                    assert.equal(info11.size, "11.7KB");
                                                    assert.equal(info21.size, "4.69KB");
                                                    assert.equal(info02.size, "15.6KB");
                                                    assert.equal(info12.size, "18.5KB");
                                                    assert.equal(info22.size, "7.54KB");
                                                    assert.equal(info03.size, "34.4KB");
                                                    assert.equal(info13.size, "47.6KB");
                                                    assert.equal(info23.size, "12.1KB");
                                                    done();
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });

    });
});
