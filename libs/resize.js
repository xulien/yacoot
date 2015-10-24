var dcp = require('duplex-child-process')
var debug = require('debug')('yacoot')

module.exports = function(input, output) {
  debug('%s will be resized', output.name);

  var geometrie = (output.ratio > input.ratio) ? output.width : 'x' + output.height;
  debug('geometrie: %s', geometrie);
  var args = [
    '-',
    '-resize', geometrie,
    '-gravity', 'center',
    '-crop', output.width + 'x' + output.height + '+0+0',
    'JPEG:-'
  ];

  var convert = dcp.spawn('convert', args);
  return convert;

}
