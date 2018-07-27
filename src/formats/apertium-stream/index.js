'use strict';

module.exports = {

  name: 'apertium stream',
  split: require('./splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator'),

};
