var cp = require('child_process');
var mkdirp = require('mkdirp');

module.exports = function (input, output, cb) {

    var geometrie = (output.ratio > input.ratio) ? output.width : 'x' + output.height;

    mkdirp(output.target, output.mode, function (err) {
        if (err) return cb(err);

        cp.exec(
            'convert ' + input.src +
            ' -resize ' + geometrie +
            ' -gravity center -crop ' +
            output.width + 'x' +
            output.height + '+0+0 ' +
            output.target + '/' +
            output.name + '.' +
            output.type,
            function (err, stdout, stderr) {
                if (stderr) return cb(new Error(stderr));
                if (err) return cb(err);
                cb(null);
            });

    })

};