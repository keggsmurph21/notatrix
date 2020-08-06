"use strict";

import * as _ from "underscore";
import * as nx from "nx";
import {C, noop, thin} from "utils";
import {data} from "data";

export function spacesToTabs(str: string): string {
  return str.replace(/[ \t]+/g, "\t");
}

export function trimAndConvertToTabs(str: string): string {
  return str.trim().replace(/[ \t]+/g, "\t").trim();
}

export function cleanText(str: string): string {
  return str.trim().replace(/([.,?!]+)$/, " $1").replace(/(\s)+/, " ").trim();
}

export function ignoreSemicolons(str: string): string {
  return trimAndConvertToTabs(str)
      .split("\n")
      .map(line => { return line.replace(/^;/, ""); })
      .join("\n");
}

export function ignoreIndices(str: string): string {
  return trimAndConvertToTabs(str.split("\t").slice(1).join("\t"));
}

export function ignoreAfterLemma(str: string): string {
  return str.split("\n")
      .map(line => { return line.split("\t").slice(0, 3).join(" "); })
      .join(" ");
}

export function countHeads(tok: nx.BaseToken): number {
  let acc = 0;
  tok.mapHeads(() => { acc++; });
  return acc;
}

export function countDeps(tok: nx.BaseToken): number {
  let acc = 0;
  tok.mapDependents(() => { acc++; });
  return acc;
}

export function currentForms(sentence: nx.Sentence): string {
  let forms: string[] = [];
  sentence.tokens.forEach((tok: nx.Token) => {
    tok.analysis.subTokens.forEach(
        (subTok: nx.SubToken) => { forms.push(subTok.form); });
  });
  return forms.join(" ");
}

export function forEachText(
    callback: (text: string, format: string, name: string) => void): void {
  callback = callback || noop;

  _.each(data, (texts, format) => {
    if (C.formats.indexOf(format) > -1)
      _.each(texts, (text, name) => {
        // @ts-ignore: 2345
        callback(text, format, name);
      });
  });
}

export function randomInt(min: number, max: number|undefined): number {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * max) + min;
}

export function forEachFormat(callback: (format: string) => void): void {
  callback = callback || noop;
  _.each(C.formats, callback);
}

export function cleanConllu(str: string): string {
  return str.split("\n")
      .map(spacesToTabs)
      .map(line => { return line.trim(); })
      .filter(thin)
      .join("\n");
}

type CleanCallback = (line: string) => string;

export function clean(str: string, callbacks: CleanCallback[]): string {
  let lines = str.split("\n");
  callbacks.forEach(map => { lines = lines.map(map); });
  return lines.filter(thin).join("\n");
}
