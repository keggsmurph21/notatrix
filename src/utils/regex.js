module.exports = {

  doubleNewlines: /\n{2,}/g,
  punctuation: /[.,!?]+/g,
  sentenceThenPunctuation: /([^.,!?]*[.,!?]*)/g,
  comment: /^#\s*(.*)$/,
  conlluTokenLine: /(\d+(\.\d)*(\-\d+(\.\d)*)?).+/,
  conlluTokenLineTenParams: /(\d+(\.\d)*(\-\d+(\.\d)*)?)(\s+\S+){8,9}/,
  cg3TokenStart: /^["']<(.|\\")*>["']/,
  cg3TokenContent: /^;?\s+"(.|\\")*"/,
  whitespace: /(\s+)/,
  whiteline: /^(\s*)$/,
  sdDependency: /^\s*([\w.]+)\(([\w.]+),\s*([\w.]+)\)\s*$/,
  sdDependencyNoWhitespace: /^([\w.]+)\(([\w.]+),\s*([\w.]+)\)$/,

};
