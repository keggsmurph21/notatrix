'use strict';

module.exports = {

  name: 'Params',
  fields: [
    'isEmpty',
    'index',
    'form',
    'lemma',
    'upostag',
    'xpostag',
    'feats',
    'head',
    'deprel',
    'deps',
    'misc',
    'subTokens',
  ],
  split: require('./splitter'),
  detect: require('./detector'),
  parse: require('./parser'),
  generate: require('./generator'),

};
