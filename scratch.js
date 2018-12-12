'use strict';

const db = require('./src/corpora-db');
const utils = require('./src/utils');
const server = require('./src/server');

const corpus = {

  name: 'tr_imst-ud-test',
  filepath: './data/corpora/tr_imst-ud-test.conllu',

};

db.on('read-begin', () => {
  console.log(`started reading ${corpus.name}`);
});

db.on('read-end', () => {
  console.log(`finished reading ${corpus.name}`);
});

db.on('read-lines', chunk => {
  //console.log('read a chunk', chunk);
  console.log('\n\nchunk', chunk);
  //conllu2.parse(chunk);
  //console.log(conllu2.parse(chunk))
});

db.on('db-connected', () => {

  console.log('db connected');
  //db.readFile(corpus.filepath);

});

db.on('parse-sentence', sentence => {
  console.log(sentence);
});
