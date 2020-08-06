"use strict";

import * as _ from "underscore";

import {dedup, NxError, ToolError} from "utils";
import parse from "../parser";
import {parseAs} from "../parser";
import generate from "../generator";

import {NxBaseClass} from "./base-class";
import {Comment} from "./comment";
import {BaseToken, TokenSerial} from "./base-token";
import {Token} from "./token";
import {RootToken} from "./root-token";
import {Analysis} from "./analysis";
import {SubToken} from "./sub-token";
import type {Corpus} from "./corpus";

export interface SentenceSerial {
  input?: string;
  meta?: SentenceMeta;
  options?: SentenceOptions;
  isParsed?: boolean;
  comments?: string[];
  tokens?: TokenSerial[];
}

export interface SentenceOptions {
  allowBookendWhitespace?: boolean;
  allowEmptyList?: boolean;
  allowEmptyString?: boolean;
  allowLeadingWhitespace?: boolean;
  allowMissingIndices?: boolean;
  allowMissingLemma?: boolean;
  allowNewlines?: boolean;
  allowNoDependencies?: boolean;
  allowTrailingWhitespace?: boolean;
  allowZeroFields?: boolean;
  allowZeroTokens?: boolean;
  bracketsAllowanceTreshold?: number;
  coerceMultipleSpacesAfterSemicolonToTab?: boolean;
  enhanced?: boolean;
  equalizeWhitespace?: boolean;
  indentString?: string|RegExp;
  interpretAs?: string;
  omitIndices?: boolean;
  requireOne?: boolean;
  requireOneMatch?: boolean;
  requireTenParams?: boolean;
  returnAllMatches?: boolean;
  returnAllPossibilities?: boolean;
  spacesPerTab?: number;
  suppressDetectorErrors?: boolean;
  suppressParserErrors?: boolean;
  trimChunks?: boolean;
  useTabIndent?: boolean;
}

export interface SentenceMeta {
  //
}

interface SuperToken {
  token: Token;
  start: string|null;
  stop: string|null;
  analysis: number;
}

/**
 * Abstraction over a Sentence.  Holds an array of comments and of tokens,
 *  plus some metadata.
 */
export class Sentence extends NxBaseClass {
  public _meta: SentenceMeta = {};
  public input: string;
  public isParsed: boolean = false;
  public Error: NxError|null = null;
  public options: SentenceOptions;
  public root: RootToken;
  public comments: Comment[];
  public tokens: BaseToken[];
  public size: number;
  public _index: number;
  public corpus: Corpus = null;
  constructor(serial?: SentenceSerial|string, options?: SentenceOptions) {
    super("Sentence");

    serial = serial || "";
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

    // @ts-ignore 2339
    this.input = serial.input == null ? serial : serial.input;

    let serialObj: SentenceSerial = {};
    try {
      if (options.interpretAs) {
        // interpret as a particular format if passed option
        // @ts-ignore: 7053
        serialObj = parseAs[options.interpretAs](serial, options);

      } else {
        // otherwise, get an array of possible interpretations
        const parsed = parse(serial, options);
        let serialObjs: SentenceSerial[];
        if (parsed instanceof Array) {
          serialObjs = parsed;
        } else {
          serialObjs = [parsed];
        }

        // choose one of them if possible
        if (serialObjs.length === 0) {
          throw new NxError("Unable to parse: unrecognized format", this);
        } else if (serialObjs.length === 1) {
          serialObj = serialObjs[0];
        } else {
          throw new NxError(
              `Unable to parse: ambiguous format (${serialObjs.join(", ")})`,
              this);
        }

        if ((serial as SentenceSerial).isParsed === false)
          throw new NxError("Cannot parse explicitly unparsed serial");
      }

      this.options = serialObj.options;

      this.root = new RootToken(this);
      this.comments = serialObj.comments.map(com => new Comment(this, com));
      this.tokens = serialObj.tokens.map(tok => new Token(this, tok));

      this.attach();
      this.isParsed = true;

    } catch (e) {
      if ((e instanceof NxError || e instanceof ToolError)) {
        this.options = serialObj.options || options;
        this.comments = [];
        this.tokens = [];
        this.Error = e;

      } else {
        throw e;
      }
    }
  }

  /**
   * Output Sentence to a given format
   *
   * @param {String} format
   * @param {Object} options
   */
  to(format: string, options: SentenceOptions) {
    // @ts-ignore: 7053
    return generate[format](this, options);
  }

  /**
   * Output Sentence to a notatrix-serial string
   */
  serialize(master = {}) {
    return {
      meta: this._meta,
      input: this.input,
      isParsed: this.isParsed,
      options: dedup(master, this.options),
      comments: this.isParsed ? this.comments.map(com => com.serialize()) : [],
      tokens: this.isParsed ? this.tokens.map(token => token.serialize()) : [],
    };
  }

  /**
   * Apply a callback function for every token in the sentence
   *
   * @param {Function} callback
   */
  iterate(callback: (token: BaseToken, tokenIndex?: number,
                     analysisIndex?: number|null,
                     subTokenIndex?: number|null) => void) {
    for (let i = 0; i < this.tokens.length; i++) {
      const token = this.tokens[i];
      callback(token, i, null, null);

      for (let j = 0; j < token._analyses.length; j++) {
        for (let k = 0; k < token._analyses[j]._subTokens.length; k++) {
          const subToken = token._analyses[j]._subTokens[k];
          callback(subToken, i, j, k);
        }
      }
    }
  }

  /**
   * Return all tokens where `predicate(token)` is truth-y
   */
  query(predicate: (token: BaseToken) => boolean): BaseToken[] {
    let matches: BaseToken[] = [];
    this.iterate(token => {
      if (predicate(token))
        matches.push(token);
    });

    return matches;
  }

  index(): Sentence {
    let absolute = 0;
    let majorToken: Token|null = null;
    let superToken: SuperToken|null = null;
    let empty = 0;
    let conllu = 0;
    let cg3 = 0;
    let cytoscape = -1;

    this.iterate((token, i, j, k) => {
      token.indices.sup = i;
      token.indices.ana = j;
      token.indices.sub = k;
      token.indices.absolute = ++absolute;

      if (!token._analyses || !token._analyses.length)
        token.indices.cg3 = ++cg3;

      if (!token.isSuperToken && superToken && superToken.analysis === j)
        token.indices.cytoscape = ++cytoscape;

      if (token instanceof Token && token.subTokens.length === 0)
        token.indices.cytoscape = ++cytoscape;

      if (j === null || k === null) {
        if (!(token instanceof Token))
          throw new NxError("Invalid state ...");
        majorToken = token;

        if (superToken) {
          superToken.token.indices.conllu =
              superToken.start + "-" + superToken.stop;
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

          token.indices.conllu =
              empty ? conllu + "." + empty : conllu.toString();
        }

      } else {
        if (majorToken._i === j) {
          if (token.isEmpty) {
            empty += 1;
          } else {
            empty = 0;
            conllu += 1;
          }

          token.indices.conllu =
              empty ? conllu + "." + empty : conllu.toString();
        }

        if (superToken) {
          if (superToken.start === null) {
            superToken.start = empty ? conllu + "." + empty : conllu.toString();
          } else {
            superToken.stop = empty ? conllu + "." + empty : conllu.toString();
          }
        }
      }
    });

    if (superToken) {
      superToken.token.indices.conllu =
          `${superToken.start}-${superToken.stop}`;
      superToken = null;
    }

    this.size = absolute;
    return this;
  }

  attach() {
    this.iterate(token => {
      (token._heads || []).forEach((dependency, i: number) => {
        if (i)
          token.sent.options.enhanced = true;

        if (dependency.index == "0") {
          token.addHead(token.sent.root, "root");

        } else {
          const query = token.sent.query((token: BaseToken) =>
                                             token.indices.serial.toString() ===
                                             dependency.index);
          if (query.length !== 1) {
            // console.log(token)
            throw new NxError(
                `cannot locate token with serial index "${dependency.index}"`);
          }

          token.addHead(query[0], dependency.deprel);
        }
      });

      delete token._heads;
    });

    return this.index();
  }

  /**
   * Tell Sentence to output in enhanced dependency format
   */
  enhance() {
    this.options.enhanced = true;
    return this;
  }

  /**
   * Tell Sentence to stop outputting in enhanced dependency format
   */
  unenhance() {
    this.options.enhanced = false;
    return this;
  }

  /**
   * Get the superToken for a given token
   *
   * @param {BaseToken} token
   * @return {BaseToken}
   */
  getSuperToken(token: BaseToken): BaseToken {
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

  /**
   * Merge tokens into a single, regular token
   *
   * @param {BaseToken} src
   * @param {BaseToken} tar
   */
  merge(src: BaseToken, tar: BaseToken): Sentence {
    if (!(src instanceof BaseToken) || !(tar instanceof BaseToken))
      throw new NxError("unable to merge: src and tar must both be tokens");

    if (src.isSuperToken || tar.isSuperToken)
      throw new NxError("unable to merge: cannot merge superTokens");

    if (src.className === "SubToken" || tar.className === "SuperToken")
      throw new NxError("unable to merge: cannot merge subTokens");

    if (Math.abs(tar.indices.absolute - src.indices.absolute) > 1)
      throw new NxError("unable to merge: tokens too far apart");

    // basic copying
    src.semicolon = src.semicolon || tar.semicolon;
    src.isEmpty = src.isEmpty || tar.isEmpty;
    src.form = (src.form || "") + (tar.form || "") || null;
    src.lemma = src.lemma || tar.lemma;
    src.upostag = src.upostag || tar.upostag;
    src.xpostag = src.xpostag || tar.xpostag;

    // array-type copying
    src._feats_inited = src._feats_inited || tar._feats_inited;
    src._feats = src._feats_inited ? (src._feats || []).concat(tar._feats || [])
                                   : undefined;
    src._misc_inited = src._misc_inited || tar._misc_inited;
    src._misc = src._misc_inited ? (src._misc || []).concat(tar._misc || [])
                                 : undefined;

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

  /**
   * Combine tokens into subTokens of some superToken
   *
   * @param {BaseToken} src
   * @param {BaseToken} tar
   */
  combine(src: BaseToken, tar: BaseToken): Sentence {
    if (!(src instanceof BaseToken) || !(tar instanceof BaseToken))
      throw new NxError("unable to combine: src and tar must both be tokens");

    if (src.isSuperToken || tar.isSuperToken)
      throw new NxError("unable to combine: cannot combine superTokens");

    if (src.className === "SubToken" || tar.className === "SuperToken")
      throw new NxError("unable to combine: cannot combine subTokens");

    if (Math.abs(tar.indices.absolute - src.indices.absolute) > 1)
      throw new NxError("unable to combine: tokens too far apart");

    // get a new token to put things into
    let superToken = new Token(this, {});
    superToken._analyses = [new Analysis(this, {subTokens: []})];
    superToken._i = 0;

    // get the new superToken form from the subTokens
    superToken.form = (src.form || "") + (tar.form || "") || null;

    // make new subToken objects from src and tar
    let _src = new SubToken(this, {});

    // basic copying
    _src.semicolon = src.semicolon;
    _src.isEmpty = src.isEmpty;
    _src.form = src.form;
    _src.lemma = src.lemma;
    _src.upostag = src.upostag;
    _src.xpostag = src.xpostag;

    // array-type copying
    _src._feats_inited = src._feats_inited;
    _src._feats = _src._feats_inited ? src._feats.slice() : undefined;
    _src._misc_inited = src._misc_inited;
    _src._misc = _src._misc_inited ? src._misc.slice() : undefined;

    // make new subToken objects from src and tar
    let _tar = new SubToken(this, {});

    // basic copying
    _tar.semicolon = tar.semicolon;
    _tar.isEmpty = tar.isEmpty;
    _tar.form = tar.form;
    _tar.lemma = tar.lemma;
    _tar.upostag = tar.upostag;
    _tar.xpostag = tar.xpostag;

    // array-type copying
    _tar._feats_inited = tar._feats_inited;
    _tar._feats = _tar._feats_inited ? tar._feats.slice() : undefined;
    _tar._misc_inited = tar._misc_inited;
    _tar._misc = _tar._misc_inited ? tar._misc.slice() : undefined;

    if (src.indices.absolute < tar.indices.absolute) {
      superToken.analysis._subTokens.push(_src, _tar);

    } else {
      superToken.analysis._subTokens.push(_tar, _src);
    }

    // remove within-superToken dependencies
    src.removeHead(tar);
    tar.removeHead(src);

    // transfer all the heads and dependents to the new subTokens
    src.mapHeads(head => {
      src.removeHead(head.token);
      _src.addHead(head.token, head.deprel);
    });

    src.mapDependents(dep => {
      dep.token.removeHead(src);
      dep.token.addHead(_src, dep.deprel);
    });

    tar.mapHeads(head => {
      tar.removeHead(head.token);
      _tar.addHead(head.token, head.deprel);
    });

    tar.mapDependents(dep => {
      dep.token.removeHead(tar);
      dep.token.addHead(_tar, dep.deprel);
    });

    // overwrite the src with the new token
    this.tokens[src.indices.sup] = superToken;

    // splice out the old target
    this.tokens.splice(tar.indices.sup, 1);

    return this.index();
  }

  /**
   * Split a given token into two tokens.  If the given token is a
   *  superToken, make each of its subTokens into a regular token and
   *  delete the superToken.  Otherwise, split the token at the given
   *  index.
   *
   * @param {BaseToken} src
   * @param {String} splitAtIndexStr
   */
  split(src: BaseToken, splitAtIndexStr: string): Sentence {
    if (!(src instanceof BaseToken))
      throw new NxError("unable to split: src must be a token");

    if (src.isSuperToken) {
      const tokens = (src as Token).subTokens.map(subToken => {
        let token = new Token(this, {});

        // basic copying
        token.semicolon = subToken.semicolon;
        token.isEmpty = subToken.isEmpty;
        token.form = subToken.form;
        token.lemma = subToken.lemma;
        token.upostag = subToken.upostag;
        token.xpostag = subToken.xpostag;

        // array-type copying
        token._feats_inited = subToken._feats_inited;
        token._feats = (subToken._feats || []).slice();
        token._misc_inited = subToken._misc_inited;
        token._misc = (subToken._misc || []).slice();

        // transfer all the heads and dependents from subToken to token
        subToken.mapHeads(head => {
          subToken.removeHead(head.token);
          token.addHead(head.token, head.deprel);
        });

        subToken.mapDependents(dep => {
          dep.token.removeHead(subToken);
          dep.token.addHead(token, dep.deprel);
        });

        return token;
      });

      const index = src.indices.sup;

      // splice out the old superToken
      this.tokens.splice(index, 1);

      // insert the new tokens into its place
      this.tokens = this.tokens.slice(0, index).concat(tokens).concat(
          this.tokens.slice(index));

    } else if (src.className === "SubToken") {
      const splitAtIndex = parseInt(splitAtIndexStr);
      if (isNaN(splitAtIndex))
        throw new NxError(
            `unable to split: cannot split at index ${splitAtIndexStr}`);

      let subToken = new SubToken(this, {});

      const beginning = (src.form || "").slice(0, splitAtIndex) || "_";
      const ending = (src.form || "").slice(splitAtIndex) || "_";

      src.form = beginning;
      subToken.form = ending;

      const superToken = this.getSuperToken(src);
      const subTokens = superToken._analyses[src.indices.ana]._subTokens;
      const index = src.indices.sub;

      // insert the new subToken after it
      superToken._analyses[src.indices.ana]._subTokens =
          subTokens.slice(0, index + 1)
              .concat(subToken)
              .concat(subTokens.slice(index + 1));

    } else {
      const splitAtIndex = parseInt(splitAtIndexStr);
      if (isNaN(splitAtIndex))
        throw new NxError(
            `unable to split: cannot split at index ${splitAtIndexStr}`);

      let token = new Token(this, {});

      const beginning = (src.form || "").slice(0, splitAtIndex) || "_";
      const ending = (src.form || "").slice(splitAtIndex) || "_";

      src.form = beginning;
      token.form = ending;

      const index = src.indices.sup;

      // insert the new token after it
      this.tokens = this.tokens.slice(0, index + 1)
                        .concat(token)
                        .concat(this.tokens.slice(index + 1));
    }

    return this.index();
  }
}
