'use strict';

const _ = require('underscore');

const utils = require('../utils');
const BaseToken = require('./base-token');

class RootToken extends BaseToken {
  constructor() {

    super('RootToken', {});

    this.form = 'root';
    this.indices = {
      conllu: 0,
      cg3: 0,
      cytoscape: 0,
    };
  }
}

module.exports = RootToken;
