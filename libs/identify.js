var cp = require('child_process');

module.exports = function (srcPath, cb) {
    cp.exec(
        'identify -format "{' +
        ' \\"width\\":%w,' +
        ' \\"height\\":%h,' +
        ' \\"colors\\":%k,' +
        ' \\"cquality\\":%Q,' +
        ' \\"size\\":\\"%b\\",' +
        ' \\"type\\":\\"%m\\",' +
        ' \\"name\\":\\"%t\\" ' +
        '}" ' + srcPath,
        function (err, stdout, stderr) {

            if (stderr) return cb(new Error(stderr));
            if (err) return cb(err);

            var report = JSON.parse(stdout);
            report.src = srcPath;
            report.ratio = report.width / report.height;

            cb(null, report);
        });
};