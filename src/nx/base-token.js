'use strict';

const _ = require('underscore');

const utils = require('../utils');
const BaseTokenError = utils.BaseTokenError;

const NxBaseClass = require('./base-class');
const DependencySet = require('./dep-set');

class BaseToken extends NxBaseClass {
  constructor(name, options) {

    super(name);

    this.options = options;
    this._heads = new DependencySet(options);
    this._deps = new DependencySet(options);

    this.indices = {
      conllu: null,
      cg3: null,
      cytoscape: null,
    };
  }

  get isSuperToken() {
    return !!(this._analyses || []).reduce((total, analysis) => {
      return total += analysis._subTokens.length;
    }, 0);
  }

  addHead(token, deprel) {

    if (!(token instanceof BaseToken))
      throw new BaseTokenError('cannot add head unless it is a token');

    if (token === this)
      throw new BaseTokenError('token cannot be its own head');

    this._heads.add(token, deprel);
    token._deps.add(this, deprel);
  }

  removeHead(token) {

    if (!(token instanceof BaseToken))
      throw new BaseTokenError('cannot remove head unless it is a token');

    if (token === this)
      throw new BaseTokenError('token cannot remove its own head');

    this._heads.remove(token);
    token._deps.remove(this);
  }

  modifyHead(token, deprel) {
    const done = this._heads.modify(token, deprel);

    if (done) {
      token.modifyDep(this, deprel);
      return true;
    }

    if (this.options.addHeadOnModifyFailure)
      return this.addHead(token, deprel);

    return false;
  }

  eachHead(callback) {
    this._heads.forEach(callback);
  }

  addDep(token, deprel) {

    if (!(token instanceof BaseToken))
      throw new BaseTokenError('cannot add dep unless it is a token');

    if (token === this)
      throw new BaseTokenError('token cannot be its own dep');

    this._deps.add(token, deprel);
    token._heads.add(this, deprel);
  }

  removeDep(token) {

    if (!(token instanceof BaseToken))
      throw new BaseTokenError('cannot remove dep unless it is a token');

    if (token === this)
      throw new BaseTokenError('token cannot remove its own dep');

    this._deps.remove(token);
    token._heads.remove(this);
  }

  modifyDep(token, deprel) {
    const done = this._deps.modify(token, deprel);

    if (done) {
      token.modifyHead(this, deprel);
      return true;
    }

    if (this.options.addDepOnModifyFailure)
      return this.addDep(token, deprel);

    return false;
  }

  eachDep(callback) {
    this._deps.forEach(callback);
  }
}

module.exports = BaseToken;
