# Notatrix

Experimental notational system for ud-annotatrix, combines CoNLL-U and CG3 into one backend.

## Use

First require the module:
```js
var Nx = require('notatrix');
```

### Initializing
Then you can create a `Sentence` from ...
 - a `CoNLL-U` serial string
```js
var sent = new Nx.Sentence();
sent.conllu = some_serial_string;
```

- a `CG3` serial string
```js
var sent = new Nx.Sentence();
sent.cg3 = some_serial_string;
```

- a set of parameters
```js
var sent = new Nx.Sentence();
sent.params = { form: 'did', lemma: 'do', upostag: 'vblex' };
```

### Getting
Get the current analysis of the `n`th token (incl. subtokens)
```js
var sent = new Nx.Sentence();
sent.conllu = `1	They	they	PRON	PRP	Case=Nom|Number=Plur	2	nsubj	2:nsubj|4:nsubj	_
2	buy	buy	VERB	VBP	Number=Plur|Person=3|Tense=Pres	0	root	0:root	_
3	and	and	CONJ	CC	_	4	cc	4:cc	_
4	sell	sell	VERB	VBP	Number=Plur|Person=3|Tense=Pres	2	conj	0:root|2:conj	_
5	books	book	NOUN	NNS	Number=Plur	2	obj	2:obj|4:obj	_
6	.	.	PUNCT	.	_	2	punct	2:punct	_`;

var books = sent.getToken(4); // note: ignores CoNLL-U index numbering
console.log(books.conllu);
// Expected output: `5	books	book	NOUN	NNS	Number=Plur	2	obj	2:obj|4:obj	_`
```


## Include

Copy the (minified) file `build/notatrix.min.js` to your public javascript path (e.g. `public/js`), then simply include the following after the `body` in your project's `html`
```html
<script src=/js/notatrix.min.js></script>
```

Then you can access it with by including
```js
var Nx = require('notatrix');
```
in your javascript.

## Develop

Get the repository, install the dependencies, run tests
```sh
git clone https://github.com/keggsmurph21/notatrix.git
cd notatrix
npm install
npm test
```


