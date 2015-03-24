var jpegoptim = require('./jpegoptim');
var optipng = require('./optipng');

module.exports = function (srcPath, type, cb) {
    switch (type) {
        case 'jpg':
            return jpegoptim(srcPath, cb);
            break;
        case 'png':
            return optipng(srcPath, cb);
            break;
        default:
            cb(new Error('type must be \'jpg\' or \'png\''));
    }
};