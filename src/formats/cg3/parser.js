'use strict';

const _ = require('underscore');

const nx = require('../../nx');
const utils = require('../../utils');
const ParserError = utils.ParserError;
const detect = require('./detector');

module.exports = (text, options) => {

  function getIndentNum(str, options) {

    const count = (str, reg) => str.match(reg).length;

    if (options.indentString) {

      const regex = options.indentString instanceof RegExp
        ? options.indentString
        : new RegExp(options.indentString, 'g');

      return count(str, regex);

    } else if (options.useTabIndent) {

      return count(str, /\t/g);

    } else if (options.spacesPerTab) {

      const regex = new RegExp(` {${options.spacesPerTab}}`, 'g');
      return count(str, regex);

    } else if (options.equalizeWhitespace) {

      return count(str, /\s/g);

    } else {
      throw new ParserError('can\'t get the indent number, insufficient options set', text, options);

    }
  }

  options = _.defaults(options, {
    allowEmptyString: false,
    indentString: null,
    useTabIndent: false,
    spacesPerTab: null,
    equalizeWhitespace: true,
    coerceMultipleSpacesAfterSemicolonToTab: true,
  });

  try {
    detect(text, options);
  } catch (e) {
    if (e instanceof utils.DetectorError)
      throw new ParserError(e.message);

    throw e;
  }

  console.log(text);
  console.log();

  // "tokenize" into chunks
  let i = 0, chunks = [];
  while (i < text.length) {

    const remains = text.slice(i),
      whiteline = remains.match(utils.re.whiteline),
      comment = remains.match(utils.re.comment),
      tokenStart = remains.match(utils.re.cg3TokenStart),
      tokenContent = remains.match(utils.re.cg3TokenContent);

    if (whiteline) {

      i += whiteline[0].length;

    } else if (comment) {

      chunks.push({
        type: 'comment',
        body: comment[2]
      });
      i += comment[1].length;

    } else if (tokenStart) {

      chunks.push({
        type: 'form',
        form: tokenStart[1]
      });
      i += tokenStart[0].length;

      while (utils.re.whitespace.test(text[i]) && text[i] !== '\n')
        i++;
      i++;

    } else if (tokenContent) {

      // some real BS right here, overfitting my data hard
      const indent = options.coerceMultipleSpacesAfterSemicolonToTab
        ? !!tokenContent[1]
          ? tokenContent[2].replace(/ +/, '\t')
          : tokenContent[2]
        : tokenContent[2];

      let chunk = {
        type: 'content',
        semicolon: !!tokenContent[1],
        indent: getIndentNum(indent, options),
        lemma: tokenContent[3],
        other: [],
      };
      tokenContent[5].split(/\s/).filter(subChunk => {
        if (subChunk)
          return subChunk;
      }).forEach(subChunk => {

        const dependency = subChunk.match(utils.re.cg3Dependency),
          head = subChunk.match(utils.re.cg3Head),
          id = subChunk.match(utils.re.cg3Id),
          deprel = subChunk.match(utils.re.cg3Deprel),
          other = subChunk.match(utils.re.cg3Other);

        if (dependency) {

          if (head) {
            if (chunk.head)
              throw new ParserError('unexpected subChunk, head already set', text, options);

            chunk.head = head[1];
          }

          if (id) {
            if (chunk.id)
              throw new ParserError('unexpected subChunk, id already set', text, options);

            chunk.id = id[1];
          }

        } else if (deprel) {

          if (chunk.deprel)
            throw new ParserError('unexpected subChunk, deprel already set', text, options);

          chunk.deprel = deprel[1];

        } else if (other) {

          chunk.other.push(other[0]);

        }
      });

      chunks.push(chunk);
      i += tokenContent[0].length;

    } else {
      throw new ParserError(`unable to match remains: ${remains}`, text, options);

    }
  }

  //console.log(chunks);

  // turn the chunks into tokens and comments
  let tokens = [];
  let comments = [];
  let expecting = ['comment', 'form'];
  let token = null;
  let analysis = null;

  chunks.forEach(chunk => {

    if (expecting.indexOf(chunk.type) === -1)
      throw new ParserError(`expecting ${expecting.join('|')}, got ${chunk.type}`, text, options);

    if (chunk.type === 'comment') {

      comments.push(chunk.body);
      expecting = ['comment', 'form'];
      token = null;
      analysis = null;

    } else if (chunk.type === 'form') {

      if (analysis)
        token.analyses.push(analysis);

      if (token)
        tokens.push(token);

      token = {
        form: chunk.form,
        current_indent: 0,
        analyses: [],
      };
      analysis = null;

      expecting = ['content'];

    } else if (chunk.type === 'content') {

      if (!token)
        throw new ParserError('cannot parse content chunk without a token', text, options);

      if (chunk.indent > token.current_indent + 1)
        throw new ParserError(`invalid indent change (${token.current_indent}=>${chunk.indent})`, text, options)

      if (chunk.indent === 1) {
        if (analysis)
          token.analyses.push(analysis);

        analysis = {
          words: [{
            semicolon: chunk.semicolon,
            lemma: chunk.lemma,
            head: chunk.head,
            id: chunk.id,
            deprel: chunk.deprel,
            other: chunk.other,
          }]
        }
      } else {
        if (!analysis)
          throw new ParserError('cannot parse content chunk without an analysis', text, options);

        analysis.words.push({
          semicolon: chunk.semicolon,
          lemma: chunk.lemma,
          head: chunk.head,
          id: chunk.id,
          deprel: chunk.deprel,
          other: chunk.other,
        });

      }

      token.current_indent = chunk.indent;
      expecting = ['content', 'form'];

    } else {
      throw new ParserError(`unrecognized chunk type: ${chunk.type}`, text, options);

    }

  });

  const ret = {
    chunks: chunks,
    comments: comments,
    tokens: tokens,
  };

  console.log(ret);

  let sent = new nx.Sentence(options);
  sent.comments = comments;

  tokens.forEach(token => {

    let nxToken = new nx.Token(sent)
  })

  return ret;
  /*
  class Sentence {
    constructor() {
      this.parent = null;
      this.root = [];
      this.comments = [];
    }

    encode() {
      let sent = new nx.Sentence();

      sent = this.root.tokenize(sent);
      sent.index();
      sent = this.root.dependize(sent, 0);
      sent.comments = this.comments;

      return sent;
    }

    push(token) {
      this.root = token;
    }
  }

  class Token {
    constructor(parent) {
      this.parent = parent;

      this.deprel = null;
      this.before = [];
      this.words  = [];
      this.after  = [];
    }

    eachBefore(callback) {
      for (let i=0; i<this.before.length; i++) {
        callback(this.before[i], i);
      }
    }

    eachAfter(callback) {
      for (let i=0; i<this.after.length; i++) {
        callback(this.after[i], i);
      }
    }

    tokenize(sent) {

      this.eachBefore(before => {
        sent = before.tokenize(sent);
      });

      let token = nx.Token.fromParams(sent, {
        form: this.words.join('-'),
        deprel: this.deprel
      });
      sent.insertTokenAt(Infinity, token);

      this.eachAfter(after => {
        sent = after.tokenize(sent);
      });

      this.analysis = token.analysis;

      return sent;
    }

    dependize(sent, id) {

      this.eachBefore(before => {
        sent = before.dependize(sent, this.analysis.id);
      });

      const head = sent.getById(id);
      if (head)
        this.analysis.addHead(head, this.deprel);

      this.eachAfter(after => {
        sent = after.dependize(sent, this.analysis.id);
      });

      return sent;
    }

    push(token) {
      if (this.words.length) {
        this.after.push(token);
      } else {
        this.before.push(token);
      }
    }

    addWord(word) {
      if (!word)
        return;

      if (this.deprel) {
        this.words.push(word);
      } else {
        this.deprel = word;
      }
    }
  }

  let sent = new Sentence(),
    parsing = sent,
    parent = null,
    word = '';

  _.each(text, char => {
    switch (char) {
      case ('['):
        parent = parsing;
        parsing = new Token(parent);
        if (parent && parent.push)
          parent.push(parsing)
        word = '';
        break;

      case (']'):
        if (parsing.addWord)
          parsing.addWord(word);
        parsing = parsing.parent;
        parent = parsing.parent;
        word = '';
        break;

      case (' '):
        if (parsing.addWord)
          parsing.addWord(word);
        word = '';
        break;

      default:
        word += char;
        break;
    }
  });

  return sent.encode();
  */

};


/*

// TODO: Sentence
this.comments = [];
this.tokens = [];

// since this parsing is more complicated than CoNLL-U parsing, keep this
//   array of lines for the current token we're parsing
// NOTE: CG3 tokens are separated by lines of the form `/^"<EXAMPLE>"/`
//   and lines beginning with one/more indent give data for that token
let tokenLines = [];

// split on newlines
const lines = cg3.trim().split('\n');
for (let i=0; i<lines.length; i++) {

  // decide what the current line is
  let isToken = regex.cg3TokenStart.test(lines[i]);
  let isContent = regex.cg3TokenContent.test(lines[i]);

  // current line is the start of a new token
  if (isToken) {

    // if we already have stuff in our tokenLines buffer, parse it as a token
    if (tokenLines.length)
      this.tokens.push(Token.fromCG3(this, tokenLines));

    // reset tokenLines buffer
    tokenLines = [ lines[i] ];

  } else {

    // add content lines to tokenLines buffer
    if (tokenLines.length && isContent) {
      tokenLines.push(lines[i]);

    // push comment
    } else {
      this.comments.push(lines[i].match(regex.commentContent)[1]);
    }
  }
}

// clear tokenLines buffer
if (tokenLines.length)
  this.tokens.push(Token.fromCG3(this, tokenLines));

// attach heads and return CG3 string
return this.attach().cg3;







// TODO: Token
set cg3(tokenLines) {
  // again, we have complicated parsing here ... first make sure we get an
  //   array of the important information (minimally the form on the first line)
  let analysis = [ tokenLines[0] ];

  // iterate over the strings
  for (let i=1; i<tokenLines.length; i++) {

    let line = tokenLines[i];
    if (/^;/.test(line)) {
      // strip leading semicolons
      line = line.replace(/^;/, '');
      // TODO: save this information somewhere
    }

    // determine line indent
    let indent = getIndent(line);

    // if we're back at indent=1 and we already have stuff in our analysis
    //   buffer, parse it as an analysis
    if (indent === 1 && i > 1) {
      // parse as analysis
      cg3StringParseAnalysis(this, analysis);
      // reset buffer
      analysis = [ tokenLines[0] ];
    }

    // add to buffer
    analysis.push(line);
  }

  // parse and clear buffer
  cg3StringParseAnalysis(this, analysis);
}







// TODO: Analysis
*/
