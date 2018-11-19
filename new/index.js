'use strict';

const NotatrixCore = require('./core');
const utils = require('./utils')


const corpus = {

  name: 'tr_imst-ud-test',
  filepath: '../data/corpora/tr_imst-ud-test.conllu',

};

var n = new NotatrixCore(corpus.name);

n.on('db-open', () => {
  console.log('connected to database');
});

n.on('read-begin', () => {
  console.log(`started reading ${corpus.name}`);
});

n.on('read-end', () => {
  console.log(`finished reading ${corpus.name}`);
});

n.on('read-chunk', chunk => {
  //console.log('read a chunk');
});

n.readFile(corpus.filepath);
