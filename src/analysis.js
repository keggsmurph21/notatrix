'use strict';

const _ = require('underscore');

const fields = [
  // NB: 'id' is not kept
  'form',
  'lemma',
  'upostag',
  'xpostag',
  'feats',
  'head',
  'deprel',
  'deps',
  'misc'
];

function sanitize(str) {
  return (str || '').replace(/( |\t|\n)/g, '');
}

class Analysis extends Object {
  constructor(token, params) {
    super();

    this.token = token;
    this.sentence = token.sentence;
    this.params = params;
    _.each(params, (value, key) => {
      if (fields.indexOf(key) > -1)
        this[key] = value;
    });

    this.id = null; // see Token.index()
    this.superToken = null;
    this.subTokens = [];
  }
  get length() {
    return this.subTokens.length;
  }

  getSubToken(index) {
    return this.subTokens[index] || null;
  }

  // external formats
  get conllu() {
    return _.map(fields, field => {
      return this[field] || '_';
    }).join('\t');
  }
  get cg3() {

  }

  // field getters and setters
  get form() {
    return this._form;
  }
  set form(form) {
    this._form = sanitize(form);
  }
  get lemma() {
    return this._lemma;
  }
  set lemma(lemma) {
    this._lemma = sanitize(lemma);
  }
  get upostag() {
    return this._upostag;
  }
  set upostag(upostag) {
    this._upostag = sanitize(upostag);
  }
  get xpostag() {
    return this._xpostag;
  }
  set xpostag(xpostag) {
    this._xpostag = sanitize(xpostag);
  }
  get feats() {
    return this._feats;
  }
  set feats(feats) {
    this._feats = sanitize(feats);
  }
  get head() {
    return this._head;
  }
  set head(head) {
    this._head = sanitize(head);
  }
  get deprel() {
    return this._deprel;
  }
  set deprel(deprel) {
    this._deprel = sanitize(deprel);
  }
  get deps() {
    return this._deps;
  }
  set deps(deps) {
    this._deps = sanitize(deps);
  }
  get misc() {
    return this._misc;
  }
  set misc(misc) {
    this._misc = sanitize(misc);
  }

  // bool stuff for MultiWordTokens
  get isSubToken() {
    return this.superToken !== null;
  }
  get isSuperToken() {
    return this.subTokens.length > 0;
  }
}

module.exports = Analysis;
