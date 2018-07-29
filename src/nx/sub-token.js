'use strict';

const _ = require('underscore');

const utils = require('../utils');
const SubTokenError = utils.SubTokenError;

const BaseToken = require('./base-token');
const DependencySet = require('./dep-set');
const RootToken = require('./root');

class SubToken extends BaseToken {
  constructor(serial, options) {

    super('SubToken', options);

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
      deps: serial.deps
    };
  }
}

module.exports = SubToken;
