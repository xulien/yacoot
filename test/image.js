var Image = require('../image');
var should = require('should');
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;

describe('Image Object test1.jpg', function() {

    var params = {
        src: 'test/samples/test1.jpg',
        target: 'test/samples/test1/',
        name: 'test1_1',
        width: 240,
        height: 153
    };

    var image = new Image(params);

    it('should return image obj with target ratio and default mode', function() {
        image.name.should.equal('test1_1');
        image.src.should.equal('test/samples/test1.jpg');
        image.target.should.equal('test/samples/test1/');
        image.targetWidth.should.equal(240);
        image.targetHeight.should.equal(153);
        image.targetRatio.should.equal(240/153);
        image.mode.should.equal('0755');
        should(image.srcWidth).not.be.ok;
        should(image.srcHeight).not.be.ok;
        should(image.srcType).not.be.ok;
        should(image.srcRatio).not.be.ok;
    });

    describe('#identify()', function() {
        it('should return a string with standart image info', function(done) {
            image.identify(function(err, values) {
                if (err) throw err;
                values.should.equal('test/samples/test1.jpg JPEG 480x319 480x319+0+0 8-bit sRGB 38.9KB 0.000u 0:00.000\n');
                done();
            });
        });
    });

    describe('#info()', function() {
        it('should return complete image object', function(done) {
            image.info(function(err) {
                image.srcWidth.should.equal(480);
                image.srcHeight.should.equal(319);
                image.srcRatio.should.equal(1.5047021943573669);
                image.srcType.should.equal('JPEG');
                done();
            });
        });
    });

    describe('#resize()', function() {
        it('should return a resizing image', function(done) {
            image.resize(function(err, stdout, stderr) {
                if (err) {
                    throw err;
                }
                var params2 = {
                    src: 'test/samples/test1/test1_1.jpg'
                };

                var image2 = new Image(params2);

                image2.info(function(err) {

                    if (err) {
                        throw err;
                    }

                    image2.srcWidth.should.equal(params.width);
                    image2.srcHeight.should.equal(params.height);
                    image2.srcRatio.should.equal(params.width/params.height);

                    if (params.targetType) {
                        image2.srcType.should.equal(params.targetType);
                    } else {
                        image2.srcType.should.equal(image.srcType);
                    }

                    done();
                });
            });
        });
    });

});

describe('Image Object test2.jpg', function() {

    var params = {
        src: 'test/samples/test2.jpg',
        target: 'test/samples/test2/',
        name: 'test2_1',
        width: 240,
        height: 153
    };

    var image = new Image(params);

    it('should return image obj with target ratio and default mode', function() {
        image.name.should.equal('test2_1');
        image.src.should.equal('test/samples/test2.jpg');
        image.target.should.equal('test/samples/test2/');
        image.targetWidth.should.equal(240);
        image.targetHeight.should.equal(153);
        image.targetRatio.should.equal(240/153);
        image.mode.should.equal('0755');
        should(image.srcWidth).not.be.ok;
        should(image.srcHeight).not.be.ok;
        should(image.srcType).not.be.ok;
        should(image.srcRatio).not.be.ok;
    });

    describe('#identify()', function() {
        it('should return a string with standart image info', function(done) {
            image.identify(function(err, values) {
                if (err) { throw err; }
                values = values.slice(0,53);
                values.should.equal('test/samples/test2.jpg JPEG 540x720 540x720+0+0 8-bit');
                done();
            });
        });
    });

    describe('#info()', function() {
        it('should return complete image object', function(done) {
            image.info(function(err) {
                image.srcWidth.should.equal(540);
                image.srcHeight.should.equal(720);
                image.srcRatio.should.equal(0.75);
                image.srcType.should.equal('JPEG');
                done();
            });
        });
    });

    describe('#resize()', function() {
        it('should return a resizing image', function(done) {
            image.resize(function(err, stdout, stderr) {
                if (err) {
                    throw err;
                }
                var params2 = {
                    src: 'test/samples/test2/test2_1.jpg'
                };

                var image2 = new Image(params2);

                image2.info(function(err) {

                    if (err) {
                        throw err;
                    }

                    image2.srcWidth.should.equal(params.width);
                    image2.srcHeight.should.equal(params.height);
                    image2.srcRatio.should.equal(params.width/params.height);

                    if (params.targetType) {
                        image2.srcType.should.equal(params.targetType);
                    } else {
                        image2.srcType.should.equal(image.srcType);
                    }

                    done();
                });
            });
        });
    });
});

describe('exec test1', function() {
    var params = {
        src: 'test/samples/test1.jpg',
        target: 'test/samples/test1/',
        name: 'test1_3',
        width: 240,
        height: 153
    };

    var image = new Image(params);

    it('should return an optimized image', function(done) {
       image.exec(function(err, stdout, stderr) {
           console.log(stdout, stderr);
           done();
       });
    });
});

describe('exec test2', function() {
    var params = {
        src: 'test/samples/test2.jpg',
        target: 'test/samples/test2/',
        name: 'test2_3',
        width: 240,
        height: 153
    };

    var image = new Image(params);

    it('should return an optimized image', function(done) {
        image.exec(function(err, stdout, stderr) {
            console.log(stdout, stderr);
            done();
        });
    });
});

describe('exec test3', function() {
    var params = {
        src: 'test/samples/test3.jpg',
        target: 'test/samples/test3/',
        name: 'test3_3',
        width: 240,
        height: 153
    };

    var image = new Image(params);

    it('should return an optimized image', function(done) {
        image.exec(function(err, stdout, stderr) {
            console.log(stdout, stderr);
            done();
        });
    });
});

describe('exec with obj src', function() {
    var params = {
        src: {
            path: 'test/samples/test1.jpg',
            other: 'blabla'
        },
        target: 'test/samples/test1/',
        name: 'test1_3',
        width: 240,
        height: 153
    };

    var image = new Image(params);

    it('should return an error', function(done) {
        image.exec(function(err, stdout, stderr) {
            should.exist(err);
            done();
        });
    });
});
