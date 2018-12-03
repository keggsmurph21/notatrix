'use strict';

const Emitter = require('events');
const config = require('./config');
const path = require('path');
const utils = require('./utils');
const LineReader = require('line-by-line');
const formats = require('../src/formats');
const connectDB = require('./db');

class NotatrixCore extends Emitter {
  constructor() {

    super();

    // make sure to start with db in uninit'ed state
    this.db = null;
    this.once('_db-connected', db => {

      this.db = db;
      this.emit('db-connected');

    });

    // connect to it
    connectDB(this);
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

module.exports = new NotatrixCore();
