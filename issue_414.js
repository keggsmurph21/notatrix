const nx = require(".");

const s = new nx.Sentence(nx.data.conllu.ud_annotatrix_issue_414);

console.log(nx.data.conllu.ud_annotatrix_issue_414);
console.log(s.to("CoNLL-U").output);
//console.log(s);

