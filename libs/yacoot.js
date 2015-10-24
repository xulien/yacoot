var async = require('async')
var clone = require('clone')
var debug = require('debug')('yacoot')
var streamifier = require("streamifier")
var dcp = require('duplex-child-process')

var image = require('./image')
var toBuffer = require('./toBuffer')
var identify = require('./identify')

module.exports = Yacoot;

function Yacoot(src) {

  if (!(this instanceof Yacoot)) return new Yacoot(src);

  this.src = (Array.isArray(src)) ? src : [src];

  this.params = {
    mode: '0755',
    width: 200,
    height: 200,
    ratio: 1,
    target: '/'
  };

  this.outputs = [];
}


Yacoot.prototype.global = function(global) {
  debug('Modifying Global params');
  var self = this;
  Object.keys(global).forEach(function(key) {
    debug('changing value \t %s: %s => %s', key, self.params[key], global[key]);
    self.params[key] = global[key];
  });
  debug('Global settings ->', '\n', self.params, '\n');
  return this;
};


Yacoot.prototype.to = function(params) {
  debug('Creating output');
  var self = this;
  var output = clone(this.params);
  Object.keys(params).forEach(function(key) {
    debug('changing default value \t %s: %s => %s', key, output[key], params[key]);
    output[key] = params[key];
  });
  debug('pushing to outputs list ->', '\n', output, '\n');
  self.outputs.push(output);
  return self;
};


Yacoot.prototype.exec = function(cb) {
  var self = this;

  async.each(self.src, function(src, done) {
      toBuffer(src, function(err, buffer) {
        var info = streamifier.createReadStream(buffer);
        var stream = streamifier.createReadStream(buffer);

        var args = ['-format',
          '{\\"width\\":%w,\\"height\\":%h,\\"cquality\\":%Q,\\"size\\":\\"%b\\",\\"type\\":\\"%m\\"}',
          '-'
        ];

        info.pipe(dcp.spawn('identify', args)).once('readable', function() {
          var report = JSON.parse(this.read().toString('utf8'));
          image(stream, report, self.outputs, function(err) {
            if (err) return done(new Error(err));
            done(null);
          });
        });

      });
    },
    function(err) {
      cb(err);
    });


};
