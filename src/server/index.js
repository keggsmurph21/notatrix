'use strict';

const app = require('express')();
const http = require('http');
const db = require('../corpora-db');
const Corpus = require('../corpora-db/models/corpus');
const utils = require('../utils');
const uuidv4 = require('uuid/v4');

var server;

function getTreebank(name, next) {
  Corpus.findOne({ name: name }, (err, corpus) => {

    if (err)
      throw err;

    if (!corpus) {

      console.log('create new corpus', name);
      corpus = new Corpus({ name: name });
      corpus.save(err => {
        if (err)
          throw err;

        next(corpus);

      });
    } else {

      next(corpus);

    }
  });
}

app.get('/annotate', (req, res) => {

  const treebank = uuidv4();
  console.log('get /annotate (uuid: ' + treebank + ')');

  getTreebank(treebank, corpus => {
    res.redirect(`/annotate/${corpus.name}`);
  });
});

app.get('/annotate/:treebank', (req, res) => {

  const treebank = utils.slugify(req.params.treebank);
  console.log('get /annotate/' + treebank, '(' + req.params.treebank + ')');
  if (treebank !== req.params.treebank)
    return res.redirect(`/annotate/${treebank}`);

  getTreebank(treebank, corpus => {
    res.json(corpus);
  });
});

// connect to db
db.on('db-connected', () => {
  server = http.createServer(app).listen(6900, () => {

    console.log('Express server listening at port 6900');

  });
});

module.exports = server;
