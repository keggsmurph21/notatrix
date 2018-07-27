'use strict';

module.exports = {

  name: 'plain text',
  split: require('./splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator'),

};
