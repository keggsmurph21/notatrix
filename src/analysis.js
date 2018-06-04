'use strict';

const _ = require('underscore');
const E = require('./errors');

const fallback = '_';
const fields = [
  // NB: 'id' is not kept here
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
  if (typeof str === 'string') // don't think this is necessary, but just in case
    return (str || '').replace(/( |\t|\n)/g, '');
  return str;
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

    this.id = null; // see Sentence.index() and Token.index()
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
  get nx() {

    let values = {};
    _.each(fields, field => {
      values[field] = this[field];
    });

    return {
      id: this.id,
      params: this.params,
      values: values,
      subTokens: this.subTokens.map(subToken => {
        return subToken.id;
      })
    };

  }
  get text() {
    if (this.form && (this.form !== fallback))
      return this.form;

    if (this.lemma && (this.lemma !== fallback))
      return this.lemma;

    return fallback;
  }
  get conllu() {
    return `${this.id}\t${
      _.map(fields, field => {
        return this[field] || fallbacks;
      }).join('\t')
    }`;
  }
  get cg3() {

  }

  // field getters and setters
  get form() {
    return this.sentence.options.helpWithForm
      ? this._form || this._lemma
      : this._form;
  }
  set form(form) {
    this._form = sanitize(form);
  }
  get lemma() {
    return this.sentence.options.helpWithLemma
      ? this._lemma || this._form
      : this._lemma;
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
    return _.map(this._heads, head => {
      return (head.token.id || head.token)
        + (head.deprel ? `:${head.deprel}` : '');
    }).join('|');
  }
  set head(heads) {
    heads = sanitize(heads).split('|');

    this._heads = [];
    _.each(heads, head => {
      head = head.split(':')
      this._heads.push({
        token: this.sentence.getTokenById(head[0]) || head[0],
        deprel: head[1]
      });
    });
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
