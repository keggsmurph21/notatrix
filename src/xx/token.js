'use strict';

const _ = require('underscore');

const utils = require('../utils');
const TokenError = utils.TokenError;

const BaseToken = require('./base-token');
const Analysis = require('./analysis');
const DependencySet = require('./dep-set');
const RootToken = require('./root');

class Token extends BaseToken {
  constructor(serial, options) {

    super('Token', options);

    this.semicolon = serial.semicolon || false;
    this.isEmpty = serial.isEmpty || false;
    this.form = serial.form;
    this.lemma = serial.lemma;
    this.upostag = serial.upostag;
    this.xpostag = serial.xpostag; // split on "|" ?
    this.feats = serial.feats;
    this.deprel = serial.deprel;
    this.misc = serial.misc;
    this.other = serial.other;

    this._analyses = (serial.analyses || []).map(ana => new Analysis(ana));
    this._i = (this._analyses.length ? 0 : null);

    this.serial = {
      index: serial.index,
      head: serial.head,
      deps: serial.deps
    };
  }

  get analysis() {
    if (this._i === null)
      return null;

    return this._analyses[this._i];
  }

  get subTokens() {
    return this.analysis ? this.analysis.subTokens : [];
  }
}

module.exports = Token;
