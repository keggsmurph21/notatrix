'use strict';

const _ = require('underscore');

const utils = require('../utils');
const NxBaseClass = require('./base-class');


class Labeler extends NxBaseClass {
  constructor(corpus) {

    super('Labeler');
    this.corpus = corpus;

    this._labels = [];
    this._filter = new Set();

  }

  serialize() {
    return {
      labels: this._labels.map(label => label.state),
      filter: Array.from(this._filter)
    };
  }
}


module.exports = Labeler;
