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
  return (str || '').replace(/( |\t|\n)/g, '');
}
function parseEnhancedString(str) {
  let heads = [];

  str = sanitize(str);
  _.each(str.split('|'), head => {
    head = head.split(':');
    heads.push({
      token: head[0],
      deprel: head[1]
    });
  });
  return heads;
}

class Analysis extends Object {
  constructor(token, params) {
    super();

    this.initializing = true;
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
    this.initializing = false;
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
        return this[field] || fallback;
      }).join('\t')
    }`;
  }
  get cg3() {

  }

  // array-field (heads & deps) manipulators
  eachHead(callback) {
    _.each(this._heads, (head, i) => {
      callback(head.token, head.deprel, i);
    });
    return this;
  }
  addHead(head, deprel) {

  }
  removeHead(head) {

  }
  eachDep(callback) {
    _.each(this._deps, (dep, i) => {
      callback(dep.token, dep.deprel, i);
    });
    return this;
  }
  addDep(dep, deprel) {

  }
  removeDep(dep) {

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
    if (this.sentence.options.showEnhanced) {
      let heads = [];
      this.eachHead((token, deprel) => {
        heads.push(`${token.id || token}${deprel ? `:${deprel}` : ''}`);
      });
      return heads.join('|');

    } else {
      return this._heads.length 
        ? this._heads[0].id || this._heads[0]
        : null;
    }
  }
  set head(heads) {
    if (typeof heads === 'string')
      heads = parseEnhancedString(heads);

    this._heads = heads.map(head => {
      return {
        token: this.sentence.getById(head.token) || head.token,
        deprel: head.deprel
      };
    });

    return this;
  }
  get deprel() {
    return this._deprel;
  }
  set deprel(deprel) {
    this._deprel = sanitize(deprel);
  }
  get deps() {
    if (this.sentence.options.showEnhanced) {
      let deps = [];
      this.eachDep((token, deprel) => {
        deps.push(`${token.id || token}${deprel ? `:${deprel}` : ''}`);
      });
      return deps.join('|');

    } else {
      return this._deps.length
        ? this._deps[0].id || this._deps[0]
        : null;
    }
  }
  set deps(deps) {
    if (typeof deps === 'string')
      deps = parseEnhancedString(deps);

    this._deps = deps.map(dep => {
      return {
        token: this.sentence.getById(dep.token) || dep.token,
        deprel: dep.deprel
      };
    });

    return this;
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
