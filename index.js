"use strict";

var Image = require('./image');
var async = require('async');

module.exports = function(pictures, cb) {

    if (Array.isArray(pictures)) {

        var q = async.queue(function (task, callback) {
            var image = new Image(task);
            image.exec(function(err) {
                if (err) { return cb(new Error(err)); }
                callback();
            });
        }, 2);

        q.drain = function() {
            console.log('all pictures have been processed');
            cb();
        }

        pictures.forEach(function(picture){
            q.push(picture, function (err) {
                console.log('finished processing picture ' + picture.name);
            });
        });

    } else {
        var image = new Image(pictures);
        image.exec(function(err) {
           if (err) { return cb(new Error(err)); }
            console.log('finished processing picture ' + pictures.name);
           cb();
        });
    }

}