'use strict';

const _ = require('underscore');

const utils = require('../utils');
const NxError = utils.NxError;
const parse = require('../parser');
const generate = require('../generator');

const NxBaseClass = require('./base-class');
const Comment = require('./comment');
const BaseToken = require('./base-token');
const Token = require('./token');
const RootToken = require('./root-token');
const update = require('./update');

class Sentence extends NxBaseClass {
  constructor(serial, options) {

    super('Sentence');

    this.to = (format, options) => generate[format](this, options);

    serial = serial || '';
    options = options || {};
    options = _.defaults(options, {
      interpretAs: null,
      addHeadOnModifyFailure: true,
      depsShowDeprel: true,
      showRootDeprel: true,
      enhanced: false,
      useTokenDeprel: true,
      autoAddPunct: true,
    });

    if (options.interpretAs) {

      // interpret as a particular format if passed option
      serial = parse.as[options.interpretAs](serial, options);

    } else {

      // otherwise, get an array of possible interpretations
      serial = parse(serial, options);

      // choose one of them if possible
      if (serial.length === 0) {
        throw new NxError('Unable to parse input', this);
      } else if (serial.length === 1) {
        serial = serial[0];
      } else {
        throw new NxError(
          `Unable to disambiguate input interpretations (${serial.length})`, this);
      }

    }

    this.input = serial.input;
    this.options = serial.options;
    this.comments = serial.comments.map(com => new Comment(this, com));
    this.tokens = serial.tokens.map(tok => new Token(this, tok));
    this.root = new RootToken(this);

    this.attach();
  }

  serialize() {
    return {
      input: this.input,
      options: this.options,
      comments: this.comments.map(com => com.serialize()),
      tokens: this.tokens.map(token => token.serialize()),
    };
  }

  iterate(callback) {
    for (let i=0; i<this.tokens.length; i++) {

      const token = this.tokens[i];
      callback(token, i, null, null);

      for (let j=0; j<token._analyses.length; j++) {
        for (let k=0; k<token._analyses[j]._subTokens.length; k++) {

          const subToken = token._analyses[j]._subTokens[k];
          callback(subToken, i, j, k);

        }
      }
    }
  }

  query(predicate) {

    let matches = [];
    this.iterate(token => {
      if (predicate(token))
        matches.push(token);
    });

    return matches;
  }

  index() {

    let absolute = 0,
      majorToken = null,
      superToken = null,
      empty = 0,
      conllu = 0,
      cg3 = 0,
      cytoscape = -1;

    this.iterate((token, i, j, k) => {

      token.indices.sup = i;
      token.indices.ana = j;
      token.indices.sub = k;
      token.indices.absolute = ++absolute;

      if (!token._analyses || !token._analyses.length)
        token.indices.cg3 = ++cg3;

      if (!token.isSuperToken && superToken && superToken.analysis === j)
        token.indices.cytoscape = ++cytoscape;

      if (token.subTokens && token.subTokens.length === 0)
        token.indices.cytoscape = ++cytoscape;

      if (j === null || k === null) {

        majorToken = token;

        if (superToken) {
          superToken.token.indices.conllu = superToken.start + '-' + superToken.stop;
          superToken = null;
        }

        if (token.subTokens.length) {
          superToken = {
            token: token,
            start: null,
            stop: null,
            analysis: token._i,
          };
        } else {

          if (token.isEmpty) {
            empty += 1;
          } else {
            empty = 0;
            conllu += 1;
          }

          token.indices.conllu = empty ? conllu + '.' + empty : conllu;
        }

      } else {

        if (majorToken._i === j) {

          if (token.isEmpty) {
            empty += 1;
          } else {
            empty = 0;
            conllu += 1;
          }

          token.indices.conllu = empty ? conllu + '.' + empty : conllu;
        }

        if (superToken) {
          if (superToken.start === null) {
            superToken.start = empty ? conllu + '.' + empty : conllu;
          } else {
            superToken.stop = empty ? conllu + '.' + empty : conllu;
          }
        }
      }
    });

    if (superToken) {
      superToken.token.indices.conllu = `${superToken.start}-${superToken.stop}`;
      superToken = null;
    }

    this.size = absolute;
    return this;
  }

  attach() {

    function getHeadAndDeprel(token, head, deprel) {

      head = head || token.serial.head;
      deprel = deprel || token.serial.deprel;

      if (head) {

        if (head == '0') {

          return {
            head: token.sent.root,
            deprel: 'root',
          };

        } else {

          const query = token.sent.query(token => token.serial.index === head);
          if (query.length !== 1) {
            console.log(token.serial)
            throw new NxError(`cannot locate token with serial index "${head}"`);
          }

          return {
            head: query[0],
            deprel: deprel || utils.guessDeprel(query[0], token),
          };

        }
      }

      return null;
    }

    this.iterate(token => {

      const dependency = getHeadAndDeprel(token);

      if (dependency)
        token.addHead(dependency.head, dependency.deprel);

      (token.serial.deps || '').split('|').filter(utils.thin).forEach(dep => {

        this.options.enhanced = true;

        const [head, deprel] = dep.split(':');
        const dependency = getHeadAndDeprel(token, head, deprel);
        if (dependency)
          token.addHead(dependency.head, dependency.deprel);

      });

    });

    this.iterate(token => { delete token.serial });

    return this.index();
  }

  update(serial, options) {
    try {

      const sent = new Sentence(serial, options);
      update(this, sent, options);

    } catch(e) {

      if (e instanceof utils.ToolError || utils.NxError)
        throw new NxError('Unable to update: ' + e.message);

      throw e;
    }
  }

  enhance() {
    this.options.enhanced = true;

    this.iterate(token => {
      if (!token._head)
        return;

      token.addDep(token._head, token.deprel);

    });

    return this;
  }

  unenhance() {
    this.options.enhanced = false;
    return this;
  }

  getSuperToken(token) {

    let superToken = null;

    this.iterate(tok => {
      if (!tok._analyses)
        return;

      tok._analyses.forEach(ana => {
        if (!ana._subTokens)
          return;

        ana._subTokens.forEach(sub => {
          if (sub === token)
            superToken = tok;

        });
      });
    });

    return superToken;
  }

  merge(src, tar) {

    if (!(src instanceof BaseToken) || !(tar instanceof BaseToken))
      throw new NxError('unable to merge: src and tar must both be tokens');

    if (src.isSuperToken || tar.isSuperToken)
      throw new NxError('unable to merge: cannot merge superTokens');

    if (src.name === 'SubToken' || tar.name === 'SuperToken')
      throw new NxError('unable to merge: cannot merge subTokens');

    if (Math.abs(tar.indices.absolute - src.indices.absolute) > 1)
      throw new NxError('unable to merge: tokens too far apart');

    // basic copying
    src.semicolon = src.semicolon || tar.semicolon;
    src.isEmpty = src.isEmpty || tar.isEmpty;
    src.form = (src.form || '') + (tar.form || '') || null;
    src.lemma = src.lemma || tar.lemma;
    src.upostag = src.upostag || tar.upostag;
    src.xpostag = src.xpostag || tar.xpostag;

    // array-type copying
    src._feats_init = src._feats_init || tar._feats_init;
    src._feats.push(...tar._feats);
    src._misc_init = src._misc_init || tar._misc_init;
    src._misc.push(...tar._misc);

    // make sure they don't depend on each other
    src.removeHead(tar);
    tar.removeHead(src);

    // migrate dependent things to the new token
    tar.mapDependents(dep => {
      dep.token.removeHead(tar);
      dep.token.addHead(src, dep.deprel);
    });

    // remove heads from the old token
    tar.removeAllHeads();

    // now that all references are gone, safe to splice the target out
    this.tokens.splice(tar.indices.sup, 1);

    return this.index();
  }

  combine(src, tar) {

    if (!(src instanceof BaseToken) || !(tar instanceof BaseToken))
      throw new NxError('unable to merge: src and tar must both be tokens');

    if (src.isSuperToken || tar.isSuperToken)
      throw new NxError('unable to merge: cannot merge superTokens');

    if (src.name === 'SubToken' || tar.name === 'SuperToken')
      throw new NxError('unable to merge: cannot merge subTokens');

    if (Math.abs(tar.indices.absolute - src.indices.absolute) > 1)
      throw new NxError('unable to merge: tokens too far apart');

    // get a new token to put things into
    let superToken = new Token(this, { analyses: [ { subTokens: [] } ] });

    // mess around with some form/lemma stuff
    superToken.form = (src.form || '') + (tar.form || '') || null;
    src.lemma = src.lemma || src.form;
    src.form = undefined;
    tar.lemma = tar.lemma || tar.form;
    tar.form = undefined;

    // add the src and tar as the subTokens
    let _src, _tar;
    if (src.indices.absolute < tar.indices.absolute) {

      superToken._analyses[0]._subTokens = [ src, tar ];
      [_src, _tar] = superToken.subTokens;

    } else {

      superToken._analyses[0]._subTokens = [ tar, src ];
      [_tar, _src] = superToken.subTokens;

    }

    // remove within-superToken dependencies
    src.removeHead(tar);
    tar.removeHead(src);

    // transfer all the heads and dependents to the new subTokens
    _src.mapHeads(head => {
      src.removeHead(head.token);
      _src.addHead(head.token, head.deprel);
    });

    _src.mapDependents(dep => {
      dep.token.removeHead(src);
      dep.token.addHead(_src, dep.deprel);
    });

    _tar.mapHeads(head => {
      tar.removeHead(head.token);
      _tar.addHead(head.token, head.deprel);
    });

    _tar.mapDependents(dep => {
      dep.token.removeHead(tar);
      dep.token.addHead(_tar, dep.deprel);
    });

    // overwrite the src with the new token
    this.tokens[src.indices.sup] = superToken;

    // splice out the old target
    this.tokens.splice(tar.indices.sup, 1);

    return this.index();
  }

  split(src, tar) {

  }
}

module.exports = Sentence;
