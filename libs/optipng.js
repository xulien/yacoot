var cp = require('child_process');

module.exports = function (srcPath, cb) {
    cp.exec(
        'optipng -preserve ' + srcPath,
        function (err, stdout, stderr) {
            if (stderr) return cb(new Error(stderr));
            cb(err);
        });
};