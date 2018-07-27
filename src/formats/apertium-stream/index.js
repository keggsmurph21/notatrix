'use strict';

module.exports = {

  name: 'apertium stream',
  fields: null,
  split: require('./splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator'),

};
