'use strict';

module.exports = {

  name: 'Brackets',
  fields: [
    'form',
    'head',
    'deprel',
  ],
  split: require('../_core/default-splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator'),

};
