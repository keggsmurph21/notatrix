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
const puncts = /[.,!?]/;

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
function evaluatePunctPos(ana, string) {
  if (puncts.test(string)) {
    if (ana.sentence.options.help.upostag && !ana.upostag)
      ana.upostag = 'PUNCT';

    if (ana.sentence.options.help.xpostag && !ana.xpostag)
      ana.xpostag = 'PUNCT';
  }
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
    _.each(params, (value, key) => {
      if (value === undefined || fields.indexOf(key) === -1) {
        delete params[key];
      } else {
        this[key] = value;
      }
    });
    this.params = params || {};

    this.id = null; // see Sentence.index() and Token.index()
    this.subTokens = [];

    this.initializing = false;

  }
  get length() {
    return this.subTokens.length;
  }

  insertSubTokenAt(index, token) {
    index = parseFloat(index); // catch Infinity
    if (isNaN(index))
      throw new E.NotatrixError('unable to insert subToken: unable to cast index to int');

    if (!token)
      throw new E.NotatrixError('unable to insert subToken: no subToken provided');

    if (token.__proto__ !== this.token.__proto__)
      throw new E.NotatrixError('unable to insert subToken: not instance of Token');

    if (token.isSuperToken)
      throw new E.NotatrixError('unable to insert subToken: token has subTokens');

    if (token.isSubToken)
      throw new E.NotatrixError('unable to insert subToken: token is already a subToken')

    if (this.isSubToken)
      throw new E.NotatrixError('unable to insert subToken: this is already a subToken');

    index = index < 0 ? 0
      : index > this.length ? this.length
      : parseInt(index);

    token.superToken = this;
    this.subTokens = this.subTokens.slice(0, index)
      .concat(token)
      .concat(this.subTokens.slice(index));

    return this;
  }
  removeSubTokenAt(index) {
    if (!this.length)
      return null;

    index = parseFloat(index); // catch Infinity
    if (isNaN(index))
      throw new E.NotatrixError('unable to remove subToken: unable to cast index to int');

    index = index < 0 ? 0
      : index > this.length - 1 ? this.length - 1
      : parseInt(index);

    this.subTokens[index].superToken = null;
    return this.subTokens.splice(index, 1)[0];
  }
  moveSubTokenAt(sourceIndex, targetIndex) {
    sourceIndex = parseFloat(sourceIndex);
    targetIndex = parseFloat(targetIndex);
    if (isNaN(sourceIndex) || isNaN(targetIndex))
      throw new E.NotatrixError('unable to move subToken: unable to cast indices to ints');

    sourceIndex = sourceIndex < 0 ? 0
      : sourceIndex > this.length - 1 ? this.length - 1
      : parseInt(sourceIndex);
    targetIndex = targetIndex < 0 ? 0
      : targetIndex > this.length - 1 ? this.length - 1
      : parseInt(targetIndex);

    if (sourceIndex === targetIndex) {
      // do nothing
    } else {

      let subToken = this.subTokens.splice(sourceIndex, 1);
      this.subTokens = this.subTokens.slice(0, targetIndex)
        .concat(subToken)
        .concat(this.subTokens.slice(targetIndex));

    }

    return this;
  }
  pushSubToken(token) {
    return this.insertSubTokenAt(Infinity, token);
  }
  popSubToken() {
    return this.removeSubTokenAt(Infinity);
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
        return subToken.analysis.id;
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
    if (this.sentence.options.help.head)
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
    if (this.sentence.options.help.head)
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

    if (this.sentence.options.help.head)
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
    if (this.sentence.options.help.deps)
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
    if (this.sentence.options.help.deps)
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
    if (this.sentence.options.help.deps)
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
    form = sanitize(form);
    evaluatePunctPos(this, form);
    this._form = form;
  }
  get lemma() {
    return this.sentence.options.help.lemma
      ? this._lemma || this._form
      : this._lemma;
  }
  set lemma(lemma) {
    lemma = sanitize(lemma);
    evaluatePunctPos(this, lemma);
    this._lemma = lemma;
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
        if (token === this.sentence.getById(token.id) || !this.sentence.options.help.head)
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
      if (token === this.sentence.getById(token.id) || !this.sentence.options.help.deps)
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
  get superToken() {
    return this.token.superToken;
  }
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
Analysis.prototype.__proto__ = new Proxy(Analysis.prototype.__proto__, {
  /**
   * add this so that we can have Array-like access to the Analysis (for subTokens)
   *   i.e. ana[0] is just an alias for ana.subTokens[0]
   */
  get(target, name, receiver) {
    if (typeof name === 'symbol')
      return this[name];

    let id = parseFloat(name); // catch Infinity (used in tests, and maybe other stuff)
    if (!isNaN(id)) {
      id = parseInt(id);
      let token = receiver.subTokens[id];
      return token ? token.analysis : null;
    } else {
      return this[name];
    }
  }
});


module.exports = Analysis;
