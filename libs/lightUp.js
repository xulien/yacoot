var dcp = require('duplex-child-process');
var debug = require('debug')('yacoot');

module.exports = function (output) {

    debug('%s will be light up', output.name);

    if (!output.lightUp) output.lightUp = { black: 15, white: 80 };
    if (!output.lightUp.black) output.lightUp.black = 15;
    if (!output.lightUp.white) output.lightUp.white = 80;

    var level = output.lightUp.black + '%,' + output.lightUp.white + '%';

    debug('level: %s', level);

    var args = [
        '-',
        '-level', level,
        '-'
    ];

    var convert = dcp.spawn('convert', args);
    return convert;

};
