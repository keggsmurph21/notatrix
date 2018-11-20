'use strict';

const parser = require('./src/parser-2');
const LineReader = require('line-by-line');

function readFile(filename) {

  const lr = new LineReader(filename);

  lr.on('error', err => {
    throw err;
  });

  parser.parse(lr);

  lr.on('end', () => {
    console.log('read-end');
  });

}

readFile('./data/corpora/tr_imst-ud-test.conllu');
