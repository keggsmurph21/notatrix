'use strict';

const _ = require('underscore');
const Emitter = require('events');
const defaults = require('./defaults');
const path = require('path');
const utils = require('../utils');
const LineReader = require('line-by-line');
//const formats = require('../src/formats');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

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

  readFile(filename) {

    // hack to get around this-rebinding
    var self = this;

    if (!self.db)
      throw new Error('no database connected');

    self.emit('read-begin');

    const lr = new LineReader(filename);

    var chunk = [];
    var lineNum = 0;
    var numBlankLines = 0;

    lr.on('line', line => {

      if (utils.re.whitespaceLine.test(line)) {
        if (chunk.length > 0) {

          self.emit('read-lines', chunk, lineNum);
          chunk = [];

        }
      } else {
        chunk.push(line);
      }

      ++lineNum;
    });

    lr.on('end', () => {
      self.emit('read-end');
    });

  }
}

module.exports = CorporaDB;
