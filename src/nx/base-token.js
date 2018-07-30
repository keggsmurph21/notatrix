'use strict';

const _ = require('underscore');
const uuid = require('uuid/v4');

const utils = require('../utils');
const BaseTokenError = utils.BaseTokenError;

const NxBaseClass = require('./base-class');
const DependencySet = require('./dep-set');

class BaseToken extends NxBaseClass {
  constructor(name, options) {

    super(name);

    this.uuid = uuid();
    this.options = options;

    this._feats_init = false;
    this._misc_init = false;

    this._heads = new DependencySet(options);
    this._deps = new DependencySet(options);

    this.indices = {
      conllu: null,
      cg3: null,
      cytoscape: null,
    };
  }

  walk(callback) {
    let i = 0;
    if (this._analyses)
      return this._analyses.map(analysis => {
        return analysis._subTokens.map(subToken => {
          return callback(subToken, ++i);
        });
      });

    return null;
  }

  hashFields(...fields) {

    fields = _.flatten(fields);

    let hash = _.intersection(fields, [
      'form',
      'lemma',
      'upostag',
      'xpostag',
      'feats',
      'deprel',
      'misc',
      'isEmpty',
      'semicolon',
    ]).map(field => `<${this[field] || field}>`).join('|');

    if (fields.indexOf('indices') > -1)
      hash += `|${_.map(this.indices, index => `{${index}}`).join('')}`;

    if (fields.indexOf('head') > -1)
      hash += `|(h:${this.mapHeads(h => `${h.token.indices.absolute}:${h.deprel}`).join('|') || ''})`;

    if (fields.indexOf('deps') > -1)
      hash += `|(d:${this.mapDeps(d => `${d.token.indices.absolute}:${d.deprel}`).join('|') || ''})`;

    if (fields.indexOf('analyses') > -1 || fields.indexOf('subTokens') > -1)
      hash += `|[s:${this.walk(t => t.hashFields(fields)) || ''}]`;

    return hash;
  }

  serialize() {
    let serial = {

      uuid: this.uuid,
      form: this.form,
      index: this.indices.absolute,

      semicolon: this.semicolon,
      isEmpty: this.isEmpty,
      lemma: this.lemma,
      upostag: this.upostag,
      xpostag: this.xpostag,
      feats: this.feats,
      deprel: this.deprel,
      misc: this.misc,
      other: this.misc,

      head: this.getHead('serial'),
      deps: this.getDeps('serial'),

    };

    if (this._analyses && this._analyses.length)
      serial.analyses = this._analyses.map(analysis => {
        return {
          subTokens: analysis._subTokens.map(subToken => subToken.serialize()),
        };
      });

    serial = _.pick(serial, value => value !== undefined);

    return serial;
  }

  get isSuperToken() {
    return !!(this._analyses || []).reduce((total, analysis) => {
      return total += analysis._subTokens.length;
    }, 0);
  }

  get value() {
    return this.form || this.lemma;
  }
  
  get feats() {
    return this._feats_init
      ? this._feats.length
        ? this._feats.join('|')
        : null
      : undefined;
  }

  set feats(feats) {
    if (feats === undefined)
      return;

    this._feats_init = true;
    this._feats = (feats || '').split('|').filter(utils.thin);
  }

  get misc() {
    return this._misc_init
      ? this._misc.length
        ? this._misc.join('|')
        : null
      : undefined;
  }

  set misc(misc) { // [(serial.misc || ''), (serial.other || []).join('|')].join('|');
    if (misc === undefined)
      return;

    this._misc_init = true;
    this._misc = (misc || '').split('|').filter(utils.thin);
  }

  set other(other) {
    if (other === undefined)
      return;

    this._misc_init = true;
    this._misc = (other || []).filter(utils.thin);
  }

  getHead(format) {
    return this._heads.toString(format, 'head');
  }

  getDeps(format) {
    return this._deps.toString(format, 'deps');
  }

  addHead(token, deprel) {

    if (!(token instanceof BaseToken))
      throw new BaseTokenError('cannot add head unless it is a token');

    if (token === this)
      throw new BaseTokenError('token cannot be its own head');

    if (this.options.useTokenDeprel)
      deprel = deprel || this.deprel;

    this._heads.add(token, deprel);

    if (this.options.addDepsWhenAddingHeads)
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

  mapHeads(callback) {
    return this._heads.map(callback);
  }

  addDep(token, deprel) {

    if (!(token instanceof BaseToken))
      throw new BaseTokenError('cannot add dep unless it is a token');

    if (token === this)
      throw new BaseTokenError('token cannot be its own dep');

    if (this.options.useTokenDeprel)
      deprel = deprel || this.deprel;

    this._deps.add(token, deprel);

    if (this.options.addHeadsWhenAddingDeps)
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

  mapDeps(callback) {
    return this._deps.map(callback);
  }
}

module.exports = BaseToken;
