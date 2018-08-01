'use strict';

const _ = require('underscore');

const utils = require('../utils');
const SubTokenError = utils.SubTokenError;

const BaseToken = require('./base-token');

class SubToken extends BaseToken {
  constructor(sent, serial) {

    super(sent, 'SubToken');
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

    this.serial = {
      index: serial.index,
      head: serial.head,
      deprel: serial.deprel,
      deps: serial.deps
    };
  }
}

module.exports = SubToken;
