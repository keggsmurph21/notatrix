'use strict';

const _ = require('underscore');

const utils = require('../utils');
const SentenceError = utils.SentenceError;
const parse = require('../parser');
const generate = require('../generator');

const NxBaseClass = require('./base-class');
const Comment = require('./comment');
const BaseToken = require('./base-token');
const Token = require('./token');
const RootToken = require('./root');
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
        throw new SentenceError('Unable to parse input', this);
      } else if (serial.length === 1) {
        serial = serial[0];
      } else {
        throw new SentenceError(
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

  getDependents(token) {
    return this.query(t => {

      if (!t._head)
        return;

      return t._head.indices.absolute === token.indices.absolute;

    });
  }

  getByIndices(tokenId, analysisId=null, subTokenId=null) {

    if (!this.tokens[tokenId])
      return null;

    if (analysisId === null)
      return this.tokens[tokenId];

    if (!this.tokens[tokenId]._analyses[analysisId])
      return null;

    if (subTokenId === null)
      return this.tokens[tokenId]._analyses[analysisId];

    return this.tokens[tokenId]._analyses[analysisId]._subTokens[subTokenId] || null;
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
  }

  setRoot(token) {
    if (!(token instanceof BaseToken))
      throw new SentenceError(`cannot set ${token} as root`);

    if (this.root)
      throw new SentenceError(`root is already set`);

    this.root = token;
    token.addHead(new RootToken(this), 'root');
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
            throw new SentenceError(`cannot locate token with serial index "${head}"`);
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

    this.index();
  }

  update(serial, options) {
    try {

      const sent = new Sentence(serial, options);
      update(this, sent, options);

    } catch(e) {

      if (e instanceof utils.ToolError || utils.NxError)
        throw new SentenceError('Unable to update: ' + e.message);

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
  }

  unenhance() {
    this.options.enhanced = false;
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
}

module.exports = Sentence;
