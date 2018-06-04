'use strict';

const _ = require('underscore');
const Token = require('./token');

const regex = {
  comment: /^\W*\#/,
  commentContent: /^\W*\#\W*(.*)/,
  superToken: /^\W*[0-9]+\-[0-9]+/
}

class Sentence extends Object {
  constructor() {
    super();

    this.comments = [];
    this.conlluLoaded = false;
    this.cg3Loaded = false;

    this.tokens = [];
  }
  get length() { // total number of tokens/subtokens, use this.tokens.length for
    let acc = 0;
    for (let i=0; i<this.tokens.length; i++) {
      acc++;
      for (let j=0; j<this.tokens[i].analysis.length; j++) {
        acc++;
      }
    }
    return acc;
  }

  getComment(index) {
    return this.comments[index] || null;
  }
  getToken(index) { // get the <index>th token or subtoken, assuming current analysis
    let t=0;
    for (let i=0; i<this.tokens.length; i++) {
      const token = this.tokens[i];
      if (t === index)
        return token;
      t++;
      for (let j=0; j<token.subTokens.length; j++) {
        if (t === index)
          return token.subTokens[j];
        t++;
      }
    }
    return null;
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

  get conllu() {

    const comments = _.map(this.comments, comment => {
      return `# ${comment}`;
    });

    let tokens = [];
    let id = 1;
    _.each(this.tokens, token => {
      id = token.index(id);
      tokens = tokens.concat(token.conllu);
    });

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

    return this.conllu;
  }
  get cg3() {

  }
  set cg3(cg3) {

  }
  get params() {

  }
  set params(params) {

  }
}

module.exports = Sentence;
