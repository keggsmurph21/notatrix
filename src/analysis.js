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
    if (head[0])
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

    if (!token)
      throw new E.NotatrixError('missing required arg: Token');

    this.initializing = true;
    this.token = token;
    this.sentence = token.sentence;

    this._heads = [];
    this._deps = [];
    this.params = _.pick(params, ...fields);
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
    this.sentence.index();
    if (this.id === null || this.id === undefined)
      throw new E.NotatrixError('analysis is not currently indexed');

    return `${this.id}\t${
      _.map(fields, field => {
        return this[field] || fallback;
      }).join('\t')
    }`;
  }
  get cg3() {  // TODO: not implemented
    this.sentence.index();
    if (this.id === null || this.id === undefined)
      throw new E.NotatrixError('analysis is not currently indexed');

  }
  get eles() { // TODO: not implemented

  }

  // array-field (heads & deps) manipulators
  eachHead(callback) {
    _.each(this._heads, (head, i) => {
      callback(head.token, head.deprel, i);
    });
    return this;
  }
  addHead(head, deprel) {
    if (!(head instanceof Analysis))
      throw new E.NotatrixError('can\'t add head: not Analysis instance');

    // first try to change an existing one (don't want duplicate heads)
    if (this.changeHead(head, deprel))
      return this;
    this._heads.push({
      token: head,
      deprel: deprel
    });
    head._deps.push({
      token: this,
      deprel: deprel
    });

    return this;
  }
  removeHead(head) {
    if (!(head instanceof Analysis))
      throw new E.NotatrixError('can\'t remove head: not Analysis instance');

    let removing = -1;
    this.eachHead((token, deprel, i) => {
      if (token === head)
        removing = i;
    });
    if (removing > -1)
      this._heads.splice(removing, 1);

    removing = -1
    head.eachDep((token, deprel, i) => {
      if (token === this)
        removing = i;
    });
    if (removing > -1)
      head._deps.splice(removing, 1);

    return this;
  }
  changeHead(head, deprel) {
    if (!(head instanceof Analysis))
      throw new E.NotatrixError('can\'t change head: not Analysis instance');

    let done = false;
    this.eachHead((token, _deprel, i) => {
      if (token === head) {
        this._heads[i].deprel = deprel || _deprel;
        done = true;
      }
    });
    head.eachDep((token, _deprel, i) => {
      if (token === this)
        head._deps[i].deprel = deprel || _deprel;
    });

    return done ? this : null;
  }
  eachDep(callback) {
    _.each(this._deps, (dep, i) => {
      callback(dep.token, dep.deprel, i);
    });
    return this;
  }
  addDep(dep, deprel) {
    if (!(dep instanceof Analysis))
      throw new E.NotatrixError('can\'t add dep: not Analysis instance');

    // first try to change an existing one (don't want duplicate deps)
    if (this.changeDep(dep, deprel))
      return this;

    this._deps.push({
      token: dep,
      deprel: deprel
    });
    dep._heads.push({
      token: this,
      deprel: deprel
    });

    return this;
  }
  removeDep(dep) {
    if (!(dep instanceof Analysis))
      throw new E.NotatrixError('can\'t remove dep: not Analysis instance');

    let removing = -1;
    this.eachDep((token, deprel, i) => {
      if (token === dep)
        removing = i;
    });
    if (removing > -1)
      this._deps.splice(removing, 1);

    removing = -1
    dep.eachHead((token, deprel, i) => {
      if (token === this)
        removing = i;
    });
    if (removing > -1)
      dep._heads.splice(removing, 1);

    return this;
  }
  changeDep(dep, deprel) {
    if (!(dep instanceof Analysis))
      throw new E.NotatrixError('can\'t change dep: not Analysis instance');

    let done = false;
    this.eachDep((token, _deprel, i) => {
      if (token === dep) {
        this._deps[i].deprel = deprel || _deprel;
        done = true;
      }
    });
    dep.eachHead((token, _deprel, i) => {
      if (token === this)
        dep._heads[i].deprel = deprel || _deprel;
    });

    return done ? this : null;
  }

  // field getters and setters
  get form() {
    return this.sentence.options.help.form
      ? this._form || this._lemma
      : this._form;
  }
  set form(form) {
    this._form = sanitize(form);
  }
  get lemma() {
    return this.sentence.options.help.lemma
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
      return this.initializing
        ? {
            token: head.token,
            deprel: head.deprel
          }
        : {
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
    // don't worry about enhanced stuff for deps (always can be multiple)
    let deps = [];
    this.eachDep((token, deprel) => {
      deps.push(`${token.id || token}${deprel ? `:${deprel}` : ''}`);
    });
    return deps.join('|');
  }
  set deps(deps) {
    if (typeof deps === 'string')
      deps = parseEnhancedString(deps);

    this._deps = deps.map(dep => {
      return this.initializing
        ? {
            token: dep.token,
            deprel: dep.deprel
          }
        : {
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
  get isCurrent() {
    return this.token.analysis === this;
  }
  get isEmpty() { // TODO: not implemented
    return false;
  }
}

module.exports = Analysis;
