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
    allowMissingIndices: true,
  });

  try {
    detect(text, options);
  } catch (e) {
    if (e instanceof utils.DetectorError)
      throw new ParserError(e.message);

    throw e;
  }

  //console.log();
  //console.log(text);

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
      tokenContent[5].split(/\s/).filter(utils.thin).forEach(subChunk => {

        const dependency = subChunk.match(utils.re.cg3Dependency),
          head = subChunk.match(utils.re.cg3Head),
          index = subChunk.match(utils.re.cg3Id),
          deprel = subChunk.match(utils.re.cg3Deprel),
          other = subChunk.match(utils.re.cg3Other);

        if (dependency) {

          if (head) {
            if (chunk.head)
              throw new ParserError('unexpected subChunk, head already set', text, options);

            chunk.head = head[1];
          }

          if (index) {
            if (chunk.index)
              throw new ParserError('unexpected subChunk, index already set', text, options);

            chunk.index = index[1];
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

      if (token) {
        if (token.analyses.length === 1 && token.analyses[0].subTokens.length === 1)
          token = _.omit(_.extend(token, token.analyses[0].subTokens[0]), 'analyses');

        tokens.push(_.omit(token, 'currentIndent'));
      }

      token = {
        form: chunk.form,
        currentIndent: 0,
        analyses: [],
      };
      analysis = null;

      expecting = ['content'];

    } else if (chunk.type === 'content') {

      if (!token)
        throw new ParserError('cannot parse content chunk without a token', text, options);

      if (chunk.indent > token.currentIndent + 1)
        throw new ParserError(`invalid indent change (${token.currentIndent}=>${chunk.indent})`, text, options)

      if (chunk.indent === 1) {
        if (analysis)
          token.analyses.push(analysis);

        if (chunk.index === undefined && !options.allowMissingIndices)
          throw new ParserError('cannot parse token without index', text, options);

        analysis = {
          subTokens: [
            {
              semicolon: chunk.semicolon,
              lemma: chunk.lemma || null,
              head: chunk.head || null,
              index: chunk.index || null,
              deprel: chunk.deprel || null,
              xpostag: chunk.other.pop() || null,
              other: chunk.other || null,
            }
          ]
        };
      } else {
        if (!analysis)
          throw new ParserError('cannot parse content chunk without an analysis', text, options);

        if (chunk.index === undefined && !options.allowMissingIndices)
          throw new ParserError('cannot parse token without index', text, options);

        analysis.subTokens.push({
          semicolon: chunk.semicolon,
          lemma: chunk.lemma || null,
          head: chunk.head || null,
          index: chunk.index || null,
          deprel: chunk.deprel || null,
          xpostag: chunk.other.pop() || null,
          other: chunk.other || null,
        });

      }

      token.currentIndent = chunk.indent;
      expecting = ['content', 'form'];

    } else {
      throw new ParserError(`unrecognized chunk type: ${chunk.type}`, text, options);

    }

  });

  //console.log(comments);
  //console.log(tokens);

  return {
    input: text,
    options: options,
    comments: comments,
    tokens: tokens,
  };
};