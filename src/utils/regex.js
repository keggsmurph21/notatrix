module.exports = {

  multiNewlines: /\n{2,}/g,
  punctuation: /[.,!?;]+/g,
  allPunctuation: /^[.,!?;]+$/,
  sentenceThenPunctuation: /([^.!?]*[.!?]*)/g,
  spaceBeforePunctuation: /\s+([.,!?;]+)/g,
  comment: /^(#\s*(.*))(\n|$)/,
  conlluTokenLine: /^((\d+(\.\d+)?)(\-(\d+(\.\d+)?))?)(.+)/,
  conlluTokenLineTenParams: /^((\d+(\.\d+)?)(\-(\d+(\.\d+)?))?)((\s+\S+){8,9})/,
  conlluEmptyIndex: /(\d+)(\.\d+)?/,
  cg3TokenStart: /^["']<((.|\\")*)>["']/,
  cg3TokenContent: /^(;?)(\s+)"((.|\\")*)"((\s+[\w@#\->:=]+)*)/,
  cg3Dependency: /#?\d+(->\d*)?$/,
  cg3Head: /#\d+->(\d*)$/,
  cg3Index: /#(\d+)/,
  cg3Deprel: /^@(.*)/,
  cg3Other: /([^;].*(:.+)?)/,
  whitespace: /(\s+)/,
  whiteline: /^(\s*)(\n|$)/,
  sdDependency: /^\s*([\w.]+)\(([\w.]+),\s*([\w.]+)\)\s*$/,
  sdDependencyNoWhitespace: /^([\w.]+)\(([\w.]+),\s*([\w.]+)\)$/,
  fallback: /^_$/,
  commentLabel: /(\s*)(labels?|tags?)\s*=\s*(\w.*)/,
  commentSentId: /(\s*)sent.?id\s*=\s*(\w*)/i,

};
