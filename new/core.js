'use strict';

const Emitter = require('events');
const config = require('./config');
const path = require('path');
const sqlite3 = require('sqlite3');
const utils = require('./utils');
const LineReader = require('line-by-line');
const formats = require('./formats');
const DB = require('./db');

class NotatrixCore extends Emitter {
  constructor(filename) {

    super();

    this._connected = false;

    this.path = path.join(config.db_path, filename);
    this.db = new DB(this.path, err => {
      if (err)
        throw err;

      console.log('db connected');
      this._connected = true;
      this.emit('db-connected');

    });

  }

  readFile(filename) {

    var self = this;
    var reading = false;

    function onReady() {

      if (reading)
        return;

      self.emit('read-begin');
      reading = true;

      const lr = new LineReader(filename);
      var chunk = [];
      var lineNum = 0;

      lr.on('error', err => {
        throw err;
      });

      lr.on('line', line => {

        if (utils.regex.whitespaceLine.test(line)) {
          if (chunk.length > 0) {

            self.emit('read-chunk', chunk);
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

    if (self._connected) {
      onReady();
    } else {
      self.on('db-connected', onReady);
    }

  }
}

module.exports = NotatrixCore;
