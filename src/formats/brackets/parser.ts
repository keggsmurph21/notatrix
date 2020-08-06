"use strict";

import * as _ from "underscore";

import {DetectorError, ParserError} from "utils";
import detect from "./detector";
import {SentenceOptions, SentenceSerial} from "nx/sentence";
import {TokenSerial} from "nx/base-token";

abstract class Parented {
  public parent: Parented = null;
  public num: number = 0;
  constructor() {}
  abstract push(token: Token): void;
}

class Sentence extends Parented {
  public root: Token = null;
  public comments: null[] = [];
  constructor(public readonly input: string,
              public readonly options: SentenceOptions) {
    super();
  }

  serialize(): SentenceSerial {
    this.root.index(0);

    return {
      input: this.input,
      options: this.options,
      comments: this.comments,
      tokens: this.root.serialize([])
    };
  }

  push(token: Token) { this.root = token; }
}

class Token extends Parented {
  public deprel: string = null;
  public before: Token[] = [];
  public words: string[] = [];
  public after: Token[] = [];
  constructor() { super(); }

  eachBefore(callback: (token: Token, i?: number) => void): void {
    for (let i = 0; i < this.before.length; i++) {
      callback(this.before[i], i);
    }
  }

  eachAfter(callback: (token: Token, i?: number) => void): void {
    for (let i = 0; i < this.after.length; i++) {
      callback(this.after[i], i);
    }
  }

  index(num: number): number {
    this.eachBefore(before => { num = before.index(num); });
    this.num = ++num;
    this.eachAfter(after => {num = after.index(num)});

    return num;
  }

  serialize(tokens: TokenSerial[]): TokenSerial[] {
    this.eachBefore(before => { before.serialize(tokens); });

    tokens.push({
      form: this.form,
      heads: [{
        index: (this.parent.num || 0).toString(),
        deprel: this.deprel,
      }],
      index: this.num,
    });

    this.eachAfter(after => { after.serialize(tokens); });

    return tokens;
  }

  get form(): string { return this.words.join("_"); }

  push(token: Token): void {
    if (this.words.length) {
      this.after.push(token);
    } else {
      this.before.push(token);
    }
  }

  addWord(word: string): void {
    if (!word)
      return;

    if (this.deprel) {
      this.words.push(word);
    } else {
      this.deprel = word;
    }
  }
}

export default function(text: string,
                        options: SentenceOptions): SentenceSerial {
  // console.log();
  // console.log(text);

  options = _.defaults(options, {
    allowEmptyString: false,
  });

  try {
    detect(text, options);
  } catch (e) {
    if (e instanceof DetectorError)
      throw new ParserError(e.message, text, options);

    throw e;
  }

  let sent = new Sentence(text, options);
  let parsing: Parented = sent;
  let parent: Parented = null;
  let word = "";

  _.each(text, char => {
    switch (char) {
    case ("["):
      parent = parsing;
      parsing = new Token();
      parsing.parent = parent;
      if (parent && parent.push)
        parent.push(parsing as Token)
        word = "";
      break;

    case ("]"):
      if (parsing instanceof Token)
        parsing.addWord(word);
      parsing = parsing.parent;
      parent = parsing.parent;
      word = "";
      break;

    case (" "):
      if (parsing instanceof Token)
        parsing.addWord(word);
      word = "";
      break;

    default:
      word += char;
      break;
    }
  });

  // console.log(sent.serialize())
  return sent.serialize();
}
