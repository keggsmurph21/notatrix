'use strict';

const _ = require('underscore');

const Analysis = require('./analysis');

function split(str) {
  return (str || '').split(/[ \n\t]+/);
}

class Token extends Object {
  constructor(data) {
    super();

    this._current = 0;
    this.analyses = [ null ];
  }
  get length() {
    return this.analyses.length;
  }

  // keeping track of ambiguous analyses
  prev() {
    if (this._current > 0)
      this._current--;
  }
  next() {
    if (this._current < this.length - 1)
      this._current++;
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

  // internal format
  get analysis() {
    return this.analyses[this.current] || 'not set';
  }
  set analysis(params) {
    this.analyses[this.current] = new Analysis(params);
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
      console.warn('token not an instance of Token');
      return false;
    }

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
  get conllu() {
    if (this.isAmbiguous)
      throw new Error('Token is ambiguous, can\'t be converted to CoNNL-U');

    let ret = [ `${this.analysis.id}\t${this.analysis.conllu}` ].concat(
      _.map(this.analysis.subTokens, subToken => {
        return `${subToken.analysis.id}\t${subToken.analysis.conllu}`;
      })
    );
    return ret;
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

/*
id: undefined,
form: '',
lemma: undefined,
upostag: undefined,
xpostag: undefined,
feats: undefined,
head: undefined,
deprel: undefined,
deps: undefined,
misc: undefined
*/
