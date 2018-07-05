'use strict';

const expect = require('chai').expect;
const nx = require('../..');

const conllu = `1	word	word	_	_	_	_	_	_	_
2-3	super	super	_	_	_	_	_	_	_
2	sub1	sub1	_	_	_	_	_	_	_
3	sub2	sub2	_	_	_	_	_	_	_`;

let s = nx.Sentence.fromConllu(conllu);
let eles = s.eles;

/*console.log(eles);
console.log(eles.length);
console.log(eles[0]);*/

for (let i=0; i<eles.length; i++) {
  let ele = eles[i];
  
  if (ele.data.name === 'number')
          console.log(i, ele);
}

