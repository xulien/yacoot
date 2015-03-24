var cp = require('child_process');

module.exports = function (path, cb) {
    cp.exec(
        'jpegoptim --strip-all --all-progressive --preserve ' + path,
        function (err, stdout, stderr) {

            if (stderr) return cb(new Error(stderr));
            if (err) return cb(err);

            cb(null);
        });
};