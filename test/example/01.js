'use strict';

const expect = require('chai').expect;
const nx = require('../../src/index');

function output(sent) {
  console.log(' - text:');
  console.log(sent.text);
  console.log('\n - CoNLL-U:');
  console.log(sent.conllu);
  console.log('');
}

console.log(' *** Example 1 *** ');
let s1 = new nx.Sentence();

output(s1);

let t1 = new nx.Token(s1, { form: 'hello' });
let t2 = nx.Token.fromParams(s1, { form: 'world' });
let t3 = nx.Token.fromConllu(s1, '0\tI\tI\tprn');
let t4 = new nx.Token(s1);
t4.params = { lemma: 'am' };
let t5 = new nx.Token(s1);
let a5 = new nx.Analysis(t5, { form: 'testing', lemma: 'test' });
t5.analysis = a5;

s1.tokens = [t1, t2];
output(s1);

s1.options.help.lemma = false;
output(s1);

s1.pushToken(t3).pushToken(t4).pushToken(t5);
output(s1);

let t5_copy = s1.removeTokenAt(4);
expect(t5_copy).to.equal(t5);
t5_copy.analysis.form = 'Yoda';
t5_copy.analysis.lemma = null;
t5_copy.analysis.misc = 'formerly_testing';
s1.insertTokenAt(2, t5_copy);

output(s1);

t5.analysis.misc = null;
s1.moveTokenAt(4, 3);

output(s1);

console.log(' *** Example 2 *** ');
let s2 = nx.Sentence.fromConllu(`# this is a comment
# and this is another comment
1-1\thello
1\tworld`);

output(s2);

expect(s2[0]).to.equal(s2.getById('1-1'));
expect(s2[0][0]).to.equal(s2.getToken(0).analysis.getSubToken(0).analysis);

s2[0].insertSubTokenAt(0, new nx.Token(s2, { form: 'again' }));
s2[0].pushSubToken(new nx.Token(s2, { form: '!' }));

output(s2);

let t = s2[0].popSubToken();
s2.pushToken(t);

output(s2);

// uncomment next line to see a potential lossless output format
// console.log(s2.nx);
