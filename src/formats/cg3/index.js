'use strict';

module.exports = {

  name: 'CG3',
  fields: [
    'semicolon',
    'index',
    'form',
    'lemma',
    'head',
    'deprel',
    'xpostag',
    'other',
    'analyses',
  ],
  split: require('../_core/default-splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator'),

};
