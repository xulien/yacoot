"use strict";

var async = require('async');
var identify = require('./identify');
var resize = require('./resize');
var optimize = require('./optimize');
var clone = require('clone');

module.exports = Image;

function Image(src) {

    if (!(this instanceof Image)) return new Image(src);

    this.input = {};
    this.input.src = src;

    this.output = {
        mode: '0755',
        width: 200,
        height: 200,
        ratio: 1,
        type: 'jpg',
        target: __dirname + '/'
    };

    this._operations = [];

}

Image.prototype.exec = function (cb) {
    var self = this;

    identify(self.input.src, function (err, inputDesc) {
        if (err) return cb(err);
        self.input = inputDesc;

        async.each(self._operations, function (operation, done) {
            if (!operation.name) operation.name = inputDesc.name + '-' + operation.width + 'x' + operation.height;

            resize(self.input, operation, function (err) {
                if (err) return done(err);

                optimize(operation.target + '/' + operation.name + '.' + operation.type, operation.type, function (err) {
                    if (err) return done(err);

                    return done(null);
                });
            });

        }, function (err) {
            cb(err);
        });

    });

};

Image.prototype.to = function (params) {
    if (!params) params = {};

    var self = this;

    if (!Array.isArray(params)) {
        params = [params];
    }

    params.forEach(function (output) {

        var that = clone(self);

        if (output.width) that.output.width = output.width;
        if (output.height) that.output.height = output.height;
        if (output.mode) that.output.mode = output.mode;
        if (output.type) that.output.type = output.type;
        if (output.name) that.output.name = output.name;
        if (output.target) that.output.target = output.target;
        that.output.ratio = that.output.width / that.output.height;

        self._operations.push(that.output);
    });

    return self;
};