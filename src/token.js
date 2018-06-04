'use strict';

const _ = require('underscore');

const E = require('./errors');
const Analysis = require('./analysis');

function split(str) {
  return (str || '').split(/[ \n\t]+/);
}

class Token extends Object {
  constructor(sent) {
    super();

    this.sentence = sent;
    this._current = 0;
    this.analyses = [ null ];
  }
  get length() {
    return this.analyses.length;
  }
  forEach(callback) {
    for (let i=0; i<this.length; i++) {
      callback(this.analyses[i], i);
    }
  }

  // keeping track of ambiguous analyses
  prev() {
    if (this._current > 0)
      this._current--;
    return this;
  }
  next() {
    if (this._current < this.length - 1)
      this._current++;
    return this;
  }
  get current() {
    return this._current;
  }
  set current(current) {
    current = parseInt(current);
    if (isNaN(current))
      return this.current;
    if (current < 0)
      return this.current;
    if (current > this.length - 1)
      return this.current;

    this._current = current;
    return this.current;
  }

  // getting indices for current analysis
  getIndices() {
    if (!this.sentence)
      return { super: null, sub: null };
    
    for (let i=0; i<this.sentence.tokens.length; i++) {

      const ana = this.sentence.tokens[i].analysis;
      if (ana === this.analysis)
        return { super: i, sub: null };

      for (let j=0; j<ana.subTokens.length; j++) {
        const subAna = ana.subTokens[j].analysis;
        if (subAna === this.analysis)
          return { super: i, sub: j };
      }
    }

    this.sentence.logger.warn('token not in current analysis');
    return { super: null, sub: null };
  }
  getIndicesAfter() {
    const current = this.getIndices();

    if (current.super === null) {
      // pass, can't find
    } else if (current.sub === null) {
      current.super++;
    } else {
      current.sub++;
    }

    return current;
  }


  // token insertion, removal, moving
  insertBefore(token) {
    const indices = this.getIndices();
    if (!this.sentence)
      return null;

    return this.sentence.insertTokenAt(indices, token);
  }
  insertAfter(token) {
    const indices = this.getIndicesAfter();
    if (!this.sentence)
      return null;

    return this.sentence.insertTokenAt(indices, token);
  }
  insertSubTokenBefore(subToken) {

  }
  insertSubTokenAfter(subToken) {

  }
  remove() {

  }
  moveBefore(token) {

  }
  moveAfter(token) {

  }
  makeSubTokenOf(token) {

  }

  // token combining, merging, splitting
  combineWith(token) {

  }
  mergeWith(token) {

  }
  split() {

  }

  // internal format
  get analysis() {
    return this.analyses[this.current] || 'not set';
  }
  set analysis(params) {
    this.analyses[this.current] = new Analysis(this, params);
  }

  get subTokens() {
    return this.analysis.subTokens;
  }
  insertSubToken(index, token) {
    if (token === undefined) {
      token = index;
      index = this.analysis.length;
    }
    if (! token instanceof Token) {
      this.logger.warn('token not an instance of Token');
      return false;
    }

    token.analysis.superToken = this.analysis;
    const subTokens = this.analysis.subTokens;
    this.analysis.subTokens = subTokens.slice(0, index)
      .concat(token)
      .concat(subTokens.slice(index));
  }
  removeSubToken(index) {

  }

  // external format stuff
  index(id) {
    if (this.isSuperToken) {
      this.analysis.id = `${id}-${id + this.analysis.length - 1}`;
      _.each(this.analysis.subTokens, subToken => {
        subToken.analysis.id = `${id}`;
        id++;
      });
    } else {
      this.analysis.id = `${id}`;
      id++;
    }

    return id;
  }
  get nx() {

    let analyses = [];
    this.forEach(analysis => {
      analyses.push(analysis.nx);
    });

    return {
      current: this._current,
      analyses: analyses
    };
  }
  get text() {
    return this.analysis.text;
  }
  get conllu() {
    if (this.isAmbiguous)
      throw new E.InvalidCoNLLUError('Token is ambiguous, can\'t be converted to CoNNL-U');

    return this.analysis.conllu;
  }
  set conllu(serial) {

    const fields = split(serial);

    this.analysis = {
      form: fields[1],
      lemma: fields[2],
      upostag: fields[3],
      xpostag: fields[4],
      feats: fields[5],
      head: fields[6],
      deprel: fields[7],
      deps: fields[8],
      misc: fields[9]
    };

    return this.conllu;
  }
  get cg3() {
    return this.analysis.cg3;
  }
  set cg3(serial) {
    throw new Error('CG3 not implemented yet');

    return this.cg3;
  }
  get params() {
    return this.analysis.params;
  }
  set params(params) {
    this.analysis = params;
    return this.params;
  }
  get eles() {

  }

  // bool stuff
  get isSubToken() {
    return this.analysis.isSubToken;
  }
  get isSuperToken() {
    return this.analysis.isSuperToken;
  }
  get isAmbiguous() {
    return this.length > 1;
  }
}

module.exports = Token;
