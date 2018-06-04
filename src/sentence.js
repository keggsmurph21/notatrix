'use strict';

const _ = require('underscore');
const E = require('./errors');
const Token = require('./token');

const regex = {
  comment: /^\W*\#/,
  commentContent: /^\W*\#\W*(.*)/,
  superToken: /^\W*[0-9]+\-[0-9]+/
}

class Sentence extends Object {

  constructor(options) {
    super();

    this.comments = [];
    this.conlluLoaded = false;
    this.cg3Loaded = false;

    this.options = _.defaults(options, {
      helpWithForm: true,
      helpWithLemma: true,
      prettyOutput: true
    });
    this.logger = console;

    this.tokens = [];
  }
  get length() { // total number of tokens/subtokens, use this.tokens.length for
    let acc = 0;
    this.forEach(token => {
      acc++;
    });
    return acc;
  }
  forEach(callback) {
    let t = 0;
    for (let i=0; i<this.tokens.length; i++) {
      const token = this.tokens[i];
      callback(token, t);
      t++;
      for (let j=0; j<token.subTokens.length; j++) {
        callback(token.subTokens[j], t);
        t++;
      }
    }
    return this;
  }

  getComment(index) {
    return this.comments[index] || null;
  }
  getToken(index) { // get the <index>th token or subtoken, assuming current analysis
    let t = 0, token = null;
    this.forEach(tok => {
      if (t === index)
        token = tok;
      t++;
    });
    return token;
  }
  getAnalysis(index) {
    const tok = this.getToken(index);
    return tok ? tok.analysis : null;
  }
  getTokenById(index) { // get the token or subtoken by the given CoNLL-U index, assume current analysis
    let t=0;
    for (let i=0; i<this.tokens.length; i++) {
      const token = this.tokens[i];
      if (token.analysis.id == index)
        return token.analysis;
      t++;
      for (let j=0; j<token.subTokens.length; j++) {
        const subToken = token.subTokens[j];
        if (subToken.analysis.id == index)
          return subToken.analysis;
        t++;
      }
    }
    return null;
  }

  // external formats
  get nx() {
    this.index();

    let tokens = [];
    this.forEach(token => {
      tokens.push(token.nx);
    });

    return JSON.stringify({
      comments: this.comments,
      conlluLoaded: this.conlluLoaded,
      cg3Loaded: this.cg3Loaded,
      options: this.options,
      tokens: tokens
    }, null, this.options.prettyOutput ? 2 : 0);
  }
  get text() {
    let tokens = [];
    this.forEach(token => {
      if (!token.isSuperToken)
        tokens.push(token.text);
    });
    return tokens.join(' ');
  }
  get conllu() {

    if (!this.conlluLoaded)
      log.warn('note: CoNLL-U has not been explicitly loaded for this sentence');

    const comments = _.map(this.comments, comment => {
      return `# ${comment}`;
    });

    let tokens = [];
    this.index();

    try {

      this.forEach(token => {
        tokens.push(token.conllu);
      });

    } catch (e) {
      if (! e instanceof E.InvalidCoNLLUError)
        throw e;

      return null;
    }

    return comments.concat(tokens).join('\n');
  }
  set conllu(conllu) {

    this.comments = [];
    this.tokens = [];

    const lines = conllu.split('\n');
    for (let i=0; i<lines.length; i++) {
      if (regex.comment.test(lines[i])) {
        this.comments.push(
          lines[i].match(regex.commentContent)[1] );

      } else if (regex.superToken.test(lines[i])) {
        const subTokenIndices = lines[i]
          .match(regex.superToken)[0]
          .trim()
          .split('-')
          .map(str => { return parseInt(str); });

        const superToken = new Token(this);
        superToken.conllu = lines[i];
        for (let j=subTokenIndices[0]; j<=subTokenIndices[1]; j++) {
          const subToken = new Token(this);
          subToken.conllu = lines[j + this.comments.length];
          i++;
          superToken.insertSubToken(subToken);
        }
        this.tokens.push(superToken);

      } else {
        if (lines[i].trim().length) {
          const token = new Token(this);
          token.conllu = lines[i];
          this.tokens.push(token);

        }
      }
    }

    this.conlluLoaded = true;
    return this.attachHeads().conllu;
  }
  get cg3() {

  }
  set cg3(cg3) {

  }
  get params() {
    try {
      let params = [];
      this.forEach(token => {
        if (token.isSuperToken || token.isSubToken)
          throw new E.InvalidCoNLLUError();
        if (token.isAmbiguous)
          throw new E.InvalidCG3Error();

        params.push(token.params);
      });
      return params;

    } catch (e) {
      if (e instanceof E.InvalidCoNLLUError) {
        this.logger.warn('cannot get params for this sentence: contains MultiWordTokens');
        return null;

      } else if (e instanceof E.InvalidCG3Error) {
        this.logger.warn('cannot get params for this sentence: contains ambiguous analyses');
        return null;

      } else {
        throw e;
      }
    }
  }
  set params(params) {

  }

  index() {
    let id = 1;
    _.each(this.tokens, token => {
      id = token.index(id);
    });
    return this;
  }
  attachHeads() {
    this.index();
    this.forEach(token => {
      token.analysis.head = token.analysis.head;
    });
    return this;
  }
}

module.exports = Sentence;
