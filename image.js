"use strict";

var async = require('async');
var mkdirp = require('mkdirp');
var exec = require('child_process').exec;

/**
 * PARAMS :
 * image, name, target, width, height
 */

function Image(params) {

    this.name = params.name;
    this.mode = params.mode || '0755';

    this.target = params.target;
    this.targetWidth = params.width;
    this.targetHeight = params.height;
    this.targetRatio = this.targetWidth / this.targetHeight;
    this.targetType = params.type || null;

    this.src = params.src;
    this.srcWidth = null;
    this.srcHeight = null;
    this.srcRatio = null;
    this.srcType = null;

}

Image.prototype.exec = function(cb) {
    var self = this;

    if (!self.src) { return cb(new Error('no picture')); }
    if (typeof self.src !== 'string' ) { return cb(new Error('src must be a string')); }
    if (!self.name) { return cb(new Error('image name is needed')); }
    if (!self.target) { return cb(new Error('target path is needed')); }

    async.waterfall([
        function(callback) {
            self.info(function(err) {
                callback(null);
            });
        },

        function(callback) {
            self.resize(function(err) {
                callback(null);
            });
        },

        function(callback) {
            self.optimize(function(err, stdout, stderr) {
                callback(null, stdout, stderr);
            });
        }],
    function(err, result) {
        cb(err, result);
    });
}

Image.prototype.info = function (cb) {
    var self = this;

    self.identify(function(err, rawInfo){

        if (err) {
            return cb(err);
        }

        // sample: snapshot1.png PNG 755x612 755x612+0+0 8-bit sRGB 54.8KB 0.000u 0:00.000
        var rawArray = rawInfo.split(' ');
        var dimension = rawArray[2].split('x');

        self.srcType = rawArray[1];
        self.srcWidth = parseInt(dimension[0]);
        self.srcHeight = parseInt(dimension[1]);
        self.srcRatio = self.srcWidth / self.srcHeight;
        if (!self.targetType) { self.targetType = self.srcType; }

        cb(null);
    });
};

Image.prototype.identify = function(cb) {
    var self = this;

    exec('identify ' + self.src, function(err, stdout, stderr) {
        cb(err, stdout, stderr);
    });
};



Image.prototype.resize = function (cb) {
    var self = this;

    var geometrie = (self.targetRatio > self.srcRatio) ? self.targetWidth: 'x' + self.targetHeight;
    var ext = '';
    if (self.targetType === 'JPEG') { ext = '.jpg'; }
    if (self.targetType === 'PNG') { ext = '.png'; }

    mkdirp(self.target, self.mode, function(err) {
        if (err) {
            return cb(err);
        }
        exec('convert ' + self.src + ' -resize ' + geometrie + ' -gravity center -crop ' + self.targetWidth + 'x' + self.targetHeight + '+0+0 ' + self.target + '/' + self.name + ext, function(err, stdout, stderr) {
            cb(err, stdout, stderr);
        });
    });

}

Image.prototype.optimize = function(cb) {
    var self = this;

    switch(self.srcType) {
        case 'JPEG':
            self.jpegoptim(self.target + '/' + self.name, function(err, stdout, stderr) {
                return cb(err, stdout, stderr);
            });
            break;
        case 'PNG':
            self.optipng(self.target + '/' + self.name, function(err, stdout, stderr) {
                return cb(err, stdout, stderr);
            });
            break;
        default:
            cb(new Error('picture are not JPG or PNG'));
    }

}

Image.prototype.jpegoptim = function (path, cb) {
    exec('jpegoptim --max=80 --strip-all --all-progressive ' + path, function(err, stdout, stderr) {
        cb(err, stdout, stderr);
    });
}

Image.prototype.optipng = function (path, cb) {
    exec('optipng -o5 ' + path, function(err, stdout, stderr) {
        cb(err, stdout, stderr);
    });
}

module.exports = Image;