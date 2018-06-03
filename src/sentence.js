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
  get length() {
    return this.tokens.length;
  }

  get(index) { // get the <index>th token or subtoken, assuming current analysis
    let i=0;
    while (i<this.length) {
      let ana = this.tokens[i].analysis;
      if (i===index)
        return ana;
      for (let j=0; j<ana.length; j++) {
        i++;
        if (i===index)
          return ana.tokens[j].analysis;
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

        const superToken = new Token();
        superToken.conllu = lines[i];
        for (let j=subTokenIndices[0]; j<=subTokenIndices[1]; j++) {
          const subToken = new Token();
          subToken.conllu = lines[j + this.comments.length];
          i++;
          superToken.insertSubToken(subToken);
        }
        this.tokens.push(superToken);

      } else {
        if (lines[i].trim().length) {
          const token = new Token();
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
}

module.exports = Sentence;
