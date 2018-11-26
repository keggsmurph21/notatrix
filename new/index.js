'use strict';

const core = require('./core');
const utils = require('./utils');

const corpus = {

  name: 'tr_imst-ud-test',
  filepath: '../data/corpora/tr_imst-ud-test.conllu',

};

core.on('read-begin', () => {
  console.log(`started reading ${corpus.name}`);
});

core.on('read-end', () => {
  console.log(`finished reading ${corpus.name}`);
});

core.on('read-chunk', chunk => {
  //console.log('read a chunk');
});

core.on('db-connected', () => {

  console.log('db connected');
  core.readFile(corpus.filepath);

});
