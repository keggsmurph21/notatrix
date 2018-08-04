'use strict';

const _ = require('underscore');
const fs = require('fs');
const uuid = require('uuid/v4');

const utils = require('../utils');
const NxError = utils.NxError;

const split = require('../splitter');
const detect = require('../detector');
const parse = require('../parser');
const generate = require('../generator');
const convert = require('../converter');

const NxBaseClass = require('./base-class');
const Labeler = require('./labeler');
const Sentence = require('./sentence');


class Corpus extends NxBaseClass {
  constructor(options) {

    super('Corpus');
    this.treebank_id = uuid();

    options = _.defaults(options, {
      requireOne: true,
    });
    this.options = options;
    this.sources = [];

    this._labeler = new Labeler(this);
    this._sentences = [];
    this._index = null;

  }

  get length() {
    return this._sentences.length;
  }

  get index() {
    return this.length ? this._index : null;
  }

  map(next) {
    return this._sentences.map(next);
  }

  serialize() {
    return {
      meta: {},
      options: this.options,
      labeler: this._labeler.serialize(),
      sentences: this._sentences.map(sent => sent.serialize(this.options)),
      index: this._index,
    };
  }




  getSentence(index) {

    if (this.index === null)
      return null;

    return this._sentences[this.index] || null;
  }

  setSentence(index, text, write=true) {

    if (index == undefined || text == undefined)
      throw new NxError('cannot set sentence: missing required args index, text');

    index = parseInt(index)
    if (isNaN(index) || getSentence(index) === null)
      throw new NxError(`cannot set sentence at index ${index}`);

    this._sentences[index] = parse(text, this.options);

    if (write)
      this.writeFile();

    return this;
  }

  insertSentence(index, text, write) {

    if (index == undefined || text == undefined)
      throw new NxError('cannot insert sentece: missing required args index, text');

    index = parseFloat(index);
    if (isNaN(index))
      throw new NxError(`cannot insert sentence at index ${index}`);

    index = index < 0
      ? 0
      : index > this.length
        ? this.length
        : parseInt(index);

    const sent = new Sentence(text, this.options);
    sent.corpus = this;
    this._sentences = this._sentences
      .slice(0, index)
      .concat(sent)
      .concat(this._sentences.slice(index));

    if (write)
      this.writeFile();

    return this;
  }

  removeSentence(index) {

    if (!this.length)
      return null;

    if (index === undefined) // if not passed args
      index = this.index;

    index = parseFloat(index);
    if (isNaN(index))
      throw new errors.AnnotatrixError('cannot insert at NaN');

    index = index < 0 ? 0
      : index > this.length - 1 ? this.length - 1
      : parseInt(index);

    const removed = this._sentences.splice(index, 1)[0];
    if (!this.length)
      this.insertSentence();
    this.index--;

    this.emit('update', {
      type: 'remove',
      index: index,
      format: removed.format,
      nx: null
    });
    gui.update();

    return removed;
  }
  pushSentence(text) {
    return this.insertSentence(Infinity, text);
  }
  popSentence(text) {
    return this.removeSentence(Infinity);
  }



  readString(string) {

    const splitted = split(string, this.options); // might throw errors
    const index = this.index || 0;

    splitted.forEach((split, i) => {
      this.insertSentence(index + i, split, false);
    });

    this.writeFile();
    return this;
  }

  static fromString(string, options) {

    const corpus = new Corpus(options);
    corpus.readString(string);
    return corpus;

  }



  readFile(filepath, next) {

    fs.exists(filepath, exists => {
      if (!exists)
        throw new NxError(`cannot read file: cannot find path ${filepath}`);

      fs.readFile(filepath, (err, data) => {
        if (err)
          throw err;

        data = data.toString();
        this.readString(data);
        this.sources.push(filepath);

        if (next)
          next(this);

      });
    });
  }

  static fromFile(filepath, options, next) {

    if (next === undefined) {
      next = options;
      options = {};
    }

    const corpus = new Corpus(options);
    corpus.readFile(filepath, next);

    return this;
  }

  writeFile(format, filepath) {

    filepath = this.getWritePath(filepath);

    const contents = this.serialize();
    fs.writeFile(filepath, contents, err => {
      if (err)
        throw err;
    });

    return this;
  }

  getWritePath(filepath) {

    if (filepath)
      return filepath;

    const lastSource = this.sources.slice(-1)[0];
    return (lastSource || 'export') + '.nxcorpus';
  }
}


module.exports = Corpus;
