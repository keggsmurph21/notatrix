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
    this.comments = serial.comments.map(com => new Comment(com, options));
    this.tokens = serial.tokens.map(tok => new Token(tok, options));
    this.root = undefined;

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
  }

  attach() {
    this.iterate((token, i, j, k) => {

      const head = token.serial.head;

      if (head === '0' || head === 0) {

        token._head = new RootToken();
        token.deprel = 'root';
        this.setRoot(token);

      } else if (head) {

        const query = this.query(token => token.serial.index === head);
        if (query.length !== 1) {
          console.log(token.serial)
          throw new SentenceError(`cannot locate token with serial index "${head}"`);
        }

        token._head = query[0];
        token.deprel = token.deprel || utils.guessDeprel(head, token);

      }

      (token.serial.deps || '').split('|').forEach(fullDep => {

        fullDep = fullDep.split(':');
        const dep = fullDep[0];
        const deprel = fullDep[1] || null;

        if (dep === '0') {

        } else if (dep) {

          const query = this.query(token => token.serial.index === dep);
          if (query.length !== 1)
            throw new SentenceError(`cannot locate token with serial index "${dep}"`);

          token.addDep(query[0], deprel);
        }
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

  getCytoscapeEles(format) {
    this.index();

    function toSubscript(str) {
      const subscripts = { 0:'₀', 1:'₁', 2:'₂', 3:'₃', 4:'₄', 5:'₅',
        6:'₆', 7:'₇', 8:'₈', 9:'₉', '-':'₋', '(':'₍', ')':'₎' };

      if (str == null)
        return '';

      return str.split('').map((char) => {
        return (subscripts[char] || char);
      }).join('');
    }

    let eles = [];

    this.iterate(token => {

      if (token.indices.cytoscape == null && !token.isSuperToken)
        return;

      let id = format === 'CoNLL-U'
        ? token.indices.conllu
        : format === 'CG3'
          ? token.indices.cg3
          : token.indices.absolute;
      let num = token.indices.absolute - 1;
      let clump = token.indices.cytoscape;
      let pos = format === 'CG3'
        ? token.xpostag || token.upostag
        : token.upostag || token.xpostag;

      if (token.isSuperToken) {

        eles.push({ // multiword label
          data: {
            id: `multiword-${id}`,
            num: num,
            clump: clump,
            name: `multiword`,
            label: `${token.form} ${toSubscript(id)}`,
            /*length: `${token.form.length > 3
              ? token.form.length * 0.7
              : token.form.length}em`*/
          },
          classes: 'multiword'
        });

      } else {

        eles.push({ // "number" node
          data: {
            id: `num-${id}`,
            num: num,
            clump: clump,
            name: 'number',
            label: id,
            pos: pos,
            parent: token.name === 'SubToken' ? `multiword-${id}` : undefined,
            token: token,
          },
          classes: 'number'
        }, { // "form" node
          data: {
            id: `form-${id}`,
            num: num,
            clump: clump,
            name: 'form',
            attr: 'form',
            form: token.form,
            label: token.form,
            length: `${(token.form || '').length > 3
              ? (token.form || '').length * 0.7
              : (token.form || '').length}em`,
            state: `normal`,
            parent: `num-${id}`,
            token: token,
          },
          classes: `form${this.root === token ? ' root' : ''}`,
        }, { // "pos" node
          data: {
            id: `pos-node-${id}`,
            num: num,
            clump: clump,
            name: `pos-node`,
            attr: format === 'CG3' ? `xpostag` : `upostag`,
            pos: pos,
            label: pos || '',
            length: `${(pos || '').length * 0.7 + 1}em`,
            token: token,
          },
          classes: 'pos'
        }, { // "pos" edge
          data: {
            id: `pos-edge-${id}`,
            num: num,
            clump: clump,
            name: `pos-edge`,
            pos: pos,
            source: `form-${id}`,
            target: `pos-node-${id}`
          },
          classes: 'pos'
        });

        const getDependencyEdges = (token, deprel) => {

          if (token.name === 'RootToken')
            return;

          let headId = format === 'CoNLL-U'
            ? token.indices.conllu
            : format === 'CG3'
              ? token.indices.cg3
              : token.indices.absolute;

          eles.push({
            data: {
              id: `dep_${id}_${headId}`,
              name: `dependency`,
              attr: `deprel`,
              deprel: (deprel || ''),
              source: `form-${id}`,
              sourceToken: token,
              target: `form-${headId}`,
              targetToken: token,
              length: `${(deprel || '').length / 3}em`,
              label: null, // NB overwrite this before use
              ctrl: null   // NB overwrite this before use
            },
            classes: null  // NB overwrite this before use
          });
        };

        if (this.options.enhanced) {
          token.mapDeps(getDependencyEdges);
        } else if (token._head) {
          getDependencyEdges(token._head, token.deprel);
        }
      }
    });

    return eles;
  }

  enhance() {
    this.options.enhanced = true;

    this.iterate(token => {
      if (!token._head)
        return;

      token.addDep(token._head, token.deprel);

    })
  }
}

module.exports = Sentence;
