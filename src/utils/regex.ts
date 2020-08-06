export const multiNewlines = /\n{2,}/g;
export const punctuation = /[.,!?;]+/g;
export const allPunctuation = /^[.,!?;]+$/;
export const sentenceThenPunctuation = /([^.!?]*[.!?]*)/g;
export const spaceBeforePunctuation = /\s+([.,!?;]+)/g;
export const comment = /^(#\s*(.*))(\n|$)/;
export const conlluTokenLine = /^((\d+(\.\d+)?)(\-(\d+(\.\d+)?))?)(.+)/;
export const conlluTokenLineTenParams =
    /^((\d+(\.\d+)?)(\-(\d+(\.\d+)?))?)((\s+\S+){8,9})/;
export const conlluEmptyIndex = /^(\d+)(\.\d+)?/;
export const cg3TokenStart = /^["']<((.|\\")*)>["']/;
export const cg3TokenContent = /^(;?)(\s+)"((.|\\")*)"(([ \t]+\S+)*)/;
export const cg3Dependency = /#?\d+(->\d*)?$/;
export const cg3Head = /#\d+->(\d*)$/;
export const cg3Index = /#(\d+)/;
export const cg3Deprel = /\s@([\w=]*)/;
export const cg3Other = /([^;].*(=.+)?)/;
export const whitespace = /(\s+)/;
export const whitespaceLine = /^(\s*)$/;
export const whiteline = /^(\s*)(\n|$)/;
export const sdDependency = /^\s*([\w.]+)\(([\w.]+),\s*([\w.]+)\)\s*$/;
export const sdDependencyNoWhitespace = /^([\w.]+)\(([\w.]+),\s*([\w.]+)\)$/;
export const fallback = /^_$/;
export const commentLabel = /(\s*)(labels?|tags?)\s*=\s*(\w.*)/;
export const commentSentId = /(\s*)sent.?id\s*=\s*(\w*)/i;
export const hexColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
export const hexColorSixDigit = /^#?([a-f\d]{6})/i;
