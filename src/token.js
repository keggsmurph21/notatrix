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

    if (!sent)
      throw new E.NotatrixError('missing required arg: Sentence')

    this.sentence = sent;
    this._current = null;
    this.analyses = [];
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
  getAnalysis(index) {
    return this.analyses[index] || null;
  }
  prev() {
    if (this._current === null)
      return null;
    if (this._current > 0)
      this._current--;
    return this;
  }
  next() {
    if (this._current === null)
      return null;
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

  insertAnalysisAt(index, analysis) {
    if (!(analysis instanceof Analysis))
      throw new E.NotatrixError('unable to insert analysis: not instance of Analysis');

    if (this.current === null)
      this._current = 0;

    index = index < 0 ? 0
      : index > this.length ? this.length
      : index;

    analysis.token = this;
    this.analyses = this.analyses.slice(0, index)
      .concat(analysis)
      .concat(this.analyses.slice(index));

    return this;
  }
  removeAnalysisAt(index) {
    if (!this.length)
      return this;

    index = index < 0 ? 0
      : index > this.length -1 ? this.length - 1
      : index;

    this.analyses.splice(index, 1);

    if (!this.length)
      this._current = null;

    return this;
  }
  moveAnalysisAt(sourceIndex, targetIndex) {

    sourceIndex = sourceIndex < 0 ? 0 : sourceIndex;
    targetIndex = targetIndex > this.length - 1 ? this.length - 1 : targetIndex;

    if (sourceIndex === targetIndex) {
      // do nothing
    } else {

      let analysis = this.analyses.splice(sourceIndex, 1);
      this.analyses = this.analyses.slice(0, targetIndex)
        .concat(analysis)
        .concat(this.analyses.slice(targetIndex));

    }

    return this;
  }

  // getting indices for current analysis
  getIndices() {
    for (let i=0; i<this.sentence.tokens.length; i++) {

      const ana = this.sentence.tokens[i].analysis;
      if (ana === this.analysis)
        return { super: i, sub: null };

      if (ana)
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
    return this.sentence.insertTokenAt(indices, token);
  }
  insertAfter(token) {
    const indices = this.getIndicesAfter();
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
    if (this.current === null)
      return null;
    return this.analyses[this.current];
  }
  set analysis(analysis) {
    if (!(analysis instanceof Analysis))
      throw new E.NotatrixError('unable to set analysis: not instance of Analysis');
    if (this.analysis === null) {
      this.insertAnalysisAt(0, analysis);
    } else {
      this.analyses[this.current] = analysis;
    }
  }

  get subTokens() {
    if (this.analysis === null)
      return null;
    return this.analysis.subTokens;
  }
  insertSubToken(index, token) {
    if (this.analysis === null)
      throw new E.NotatrixError('unable to insert subtoken: analysis is null');

    if (token === undefined) {
      token = index;
      index = this.analysis.length;
    }
    if (!(token instanceof Token))
      throw new E.NotatrixError('unable to insert subtoken: not instance of Token');

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
    if (isNaN(parseInt(id)))
      throw new E.NotatrixError('can\'t index tokens using non-integers, make sure to call Sentence.index()')

    if (this.current === null)
      return id;

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
      current: this.current,
      analyses: analyses
    };
  }
  get text() {
    if (this.analysis === null)
      throw new E.NotatrixError('no analysis to get text for');

    return this.analysis.text || '';
  }
  get conllu() {
    if (this.analysis === null)
      throw new E.NotatrixError('no analysis to get CoNLL-U for');

    if (this.isAmbiguous)
      throw new E.InvalidCoNLLUError('Token is ambiguous, can\'t be converted to CoNNL-U');

    return this.analysis.conllu;
  }
  set conllu(serial) {

    const fields = split(serial);

    this.analysis = new Analysis(this, {
      form: fields[1],
      lemma: fields[2],
      upostag: fields[3],
      xpostag: fields[4],
      feats: fields[5],
      head: fields[6],
      deprel: fields[7],
      deps: fields[8],
      misc: fields[9]
    });

    return this.conllu;
  }
  get cg3() {
    if (this.analysis === null)
      throw new E.NotatrixError('no analysis to get CG3 for');

    return undefined;
  }
  set cg3(serial) {
    throw new Error('CG3 not implemented yet');

    return this.cg3;
  }
  get params() {
    if (this.analysis === null)
      throw new E.NotatrixError('no analysis to get params for');

    return this.analysis.params;
  }
  set params(params) {
    this.analysis = new Analysis(this, params);
    return this.params;
  }
  get eles() {

  }

  // bool stuff
  get isSubToken() {
    return this.analysis ? this.analysis.isSubToken : null;
  }
  get isSuperToken() {
    return this.analysis ? this.analysis.isSuperToken : null;
  }
  get isEmpty() {
    return this.analysis ? this.analysis.isEmpty : null;
  }
  get isAmbiguous() {
    return this.length > 1;
  }
}

module.exports = Token;
