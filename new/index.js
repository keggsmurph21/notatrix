'use strict';

const core = require('./core');
const utils = require('./utils');
const server = require('./server');

const conllu2 = require('./conllu2');
/*
const split = require('../src/splitter');
const detect = require('../src/detector');
const parse = require('../src/parser');
const generate = require('../src/generator');
const convert = require('../src/converter');
*/

const corpus = {

  name: 'tr_imst-ud-test',
  filepath: './data/corpora/tr_imst-ud-test.conllu',

};

core.on('read-begin', () => {
  console.log(`started reading ${corpus.name}`);
});

core.on('read-end', () => {
  console.log(`finished reading ${corpus.name}`);
});

core.on('read-lines', chunk => {
  //console.log('read a chunk', chunk);
  console.log('\n\nchunk', chunk);
  conllu2.parse(chunk);
  //console.log(conllu2.parse(chunk))
});

core.on('db-connected', () => {

  console.log('db connected');
  core.readFile(corpus.filepath);

});

core.on('parse-sentence', sentence => {
  console.log(sentence);
});
