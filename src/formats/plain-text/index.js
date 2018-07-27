'use strict';

module.exports = {

  name: 'plain text',
  fields: [
    'form',
  ],
  split: require('./splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator'),

};
