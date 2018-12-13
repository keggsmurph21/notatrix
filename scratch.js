'use strict';

const nx = require('.');
const db = new nx.DB();
const Corpus = require('./src/corpora-db/models/corpus');
const server = nx.server();
const corpora = [
  {
    name: 'small corpus',
    path: '/data/treebanks/ud/mr_ufal-ud-dev.conllu',
  },
  {
    name: 'large corpus',
    path: '/data/treebanks/ud/ja_bccwj-ud-train.conllu',
  },
];


db.on('db-connected', () => {

  console.log('db connected');
  corpora.forEach(corpus => {
    db.readFile(corpus);
  });

  //const c = new Corpus({ name: 'test' });
  //c.save();

  /*

  Corpus.findByIdAndUpdate('5c11d5a61e1e7e660eb27a00'
    , { $set: { 'sentences.$[i]': { isParsed: false } }}
    , { arrayFilters: [ { i: 7 } ] }
    , (err, corpus) => {

      Corpus.findById('5c11d5a61e1e7e660eb27a00', (err, c) => {
        console.log(c.sentences[7])
      });

    });

    */

});

module.exports = db;
