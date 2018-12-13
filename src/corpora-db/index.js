'use strict';

const _ = require('underscore');
const Emitter = require('events');
const path = require('path');
const LineReader = require('line-by-line');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const nx = require('../nx');
const utils = require('../utils');
const DBError = utils.DBError;
const defaults = require('./defaults');
const Corpus = require('./models/corpus');

class CorporaDB extends Emitter {
  constructor(config) {

    super();

    // make sure to start with db in uninit'ed state
    this.db_connected = false;

    config = _.defaults(config, defaults);

    const db_path = (config.username && config.password)
      ? config.username + ':' + config.password + '@' + config.uri
      : config.uri;

    const db_opts = {
      useNewUrlParser: true,
      dbName: db_path,
    };

    var self = this;
    mongoose.connect('mongodb://' + db_path, db_opts, err => {

      if (err)
        throw err;

      self.db_connected = true;
      self.emit('db-connected', mongoose);

    });
  }

  readFile(file) {

    // hack to get around this-rebinding
    var self = this;

    if (!self.db_connected)
      throw new DBError('no database connected');

    console.log('started reading ' + file.name);

    var corpus = new Corpus({

      name: file.name,
      filename: path.basename(file.path),

    });

    const lr = new LineReader(file.path);
    lr.pause();
    corpus.save(() => {
      lr.resume();
    });

    var sentenceNum = 0;
    var chunk = [];
    var lineNum = 0;
    var numBlankLines = 0;

    lr.on('line', line => {

      if (utils.re.whitespaceLine.test(line)) {
        if (chunk.length > 0) {

          lr.emit('chunk', chunk, lineNum);
          chunk = [];

        }
      } else {
        chunk.push(line);
      }

      ++lineNum;
    });

    lr.on('end', () => {
      console.log('finished reading ' + file.name);
      //corpus.save();
    });

    lr.on('chunk', (chunk, lineNum) => {

      try {

        //lr.pause();

        const sent = new nx.Sentence(chunk.join('\n'));
        const serial = sent.serialize();
        const key = `sentences.${sentenceNum}`;
        const update = { $set: { [key]: serial }};

        //console.log(corpus.name, sentenceNum);
        /*
        Corpus.findByIdAndUpdate(corpus.id, update, err => {

          if (err)
            throw err;

          const mem = process.memoryUsage().heapTotal / 1024 / 1024;
          lr.resume();
        });

        /*
        corpus.sentences[sentenceNum] = serial;
        corpus.save(() => {
          console.log(corpus.sentences.length)
          lr.resume();
        });
        */

      } catch (e) {
        if (e instanceof utils.NotatrixError) {
          console.log('CAUGHT ERROR');
          console.log(e);
          return;
        }

        throw e;
      }

      ++sentenceNum;
    });
  }
}

module.exports = CorporaDB;
