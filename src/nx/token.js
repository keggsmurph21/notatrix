'use strict';

const _ = require('underscore');

const utils = require('../utils');
const TokenError = utils.TokenError;

const BaseToken = require('./base-token');
const Analysis = require('./analysis');

class Token extends BaseToken {
  constructor(sent, serial) {

    super(sent, 'Token');
    this.uuid = serial.uuid || this.uuid;

    this.semicolon = serial.semicolon;
    this.isEmpty = serial.isEmpty;
    this.form = serial.form;
    this.lemma = serial.lemma;
    this.upostag = serial.upostag;
    this.xpostag = serial.xpostag;
    this.feats = serial.feats;
    this.deprel = serial.deprel;
    this.misc = serial.misc;
    this.other = serial.other;

    this._analyses = (serial.analyses || []).map(ana => new Analysis(sent, ana));
    this._i = (this._analyses.length ? 0 : null);

    this.serial = {
      index: serial.index,
      head: serial.head,
      deprel: serial.deprel,
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
