"use strict";

var image = require('./libs/image');
var async = require('async');

module.exports = Yacoot;

function Yacoot(arrayOfObjectFiles) {

    if (!(this instanceof Yacoot)) return new Yacoot(arrayOfObjectFiles);

    this.arrayOfObjectFiles = (Array.isArray(arrayOfObjectFiles)) ? arrayOfObjectFiles : [arrayOfObjectFiles];
    this.params = {};
    this.outputs = [];

}

Yacoot.prototype.global = function (params) {
    this.params = params || {};
    return this;
};

Yacoot.prototype.to = function (output) {
    var self = this;
    if (!output) output = {};
    Object.keys(self.params).forEach(function (key) {
        if (!output[key]) output[key] = self.params[key];
    });
    self.outputs.push(output);
    return self;
};

Yacoot.prototype.exec = function (cb) {
    var self = this;

    async.each(self.arrayOfObjectFiles, function (file, done) {

        image(file.path)
            .to(self.outputs)
            .exec(function (err) {
                if (err) return done(new Error(err));
                done(null);
        });

    }, function (err) {
        cb(err);
    });


};