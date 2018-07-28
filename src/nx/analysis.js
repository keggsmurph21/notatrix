'use strict';

const _ = require('underscore');

const utils = require('../utils');
const AnalysisError = utils.AnalysisError;

const NxBaseClass = require('./base-class');
const SubToken = require('./sub-token');

class Analysis extends NxBaseClass {
  constructor(serial, options) {

    super('Analysis');
    this._subTokens = (serial.subTokens || []).map(sub => new SubToken(sub));
    
  }

  get subTokens() {
    return this._subTokens;
  }

}

module.exports = Analysis;
