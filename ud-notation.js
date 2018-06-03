'use strict';

const Sentence = require('./src/sentence'),
  conllu = require('./test/data/conllu');

let s = new Sentence();
s.conllu = conllu.from_cg3_with_spans;
console.log(s.conllu);

module.exports = s;
