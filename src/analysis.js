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
  constructor(params) {
    super();

    this.params = params;
    _.each(params, (value, key) => {
      if (fields.indexOf(key) > -1)
        this[key] = value;
    });

    this.id = '';
    this.superToken = null;
    this.subTokens = [];
  }
  get length() {
    return this.subTokens.length;
  }

  // external formats
  get conllu() {
    return _.map(fields, field => {
      return this[field];
    }).join('\t');
  }
  get cg3() {

  }

  // field getters and setters
  get form() {
    return this._form || '_';
  }
  set form(form) {
    this._form = sanitize(form);
  }
  get lemma() {
    return this._lemma || '_';
  }
  set lemma(lemma) {
    this._lemma = sanitize(lemma);
  }
  get upostag() {
    return this._upostag || '_';
  }
  set upostag(upostag) {
    this._upostag = sanitize(upostag);
  }
  get xpostag() {
    return this._xpostag || '_';
  }
  set xpostag(xpostag) {
    this._xpostag = sanitize(xpostag);
  }
  get feats() {
    return this._feats || '_';
  }
  set feats(feats) {
    this._feats = sanitize(feats);
  }
  get head() {
    return this._head || '_';
  }
  set head(head) {
    this._head = sanitize(head);
  }
  get deprel() {
    return this._deprel || '_';
  }
  set deprel(deprel) {
    this._deprel = sanitize(deprel);
  }
  get deps() {
    return this._deps || '_';
  }
  set deps(deps) {
    this._deps = sanitize(deps);
  }
  get misc() {
    return this._misc || '_';
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
