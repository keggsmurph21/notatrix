## Classes

<dl>
<dt><a href="#Analysis">Analysis</a></dt>
<dd><p>this class contains all the information associated with an analysis, including
  a value for each of form, lemma, upostag, xpostag, feats, head, deprel,
  deps, &amp; misc ... also keeps an array of subTokens and an index</p>
</dd>
<dt><a href="#Sentence">Sentence</a></dt>
<dd><p>this class contains all the information associated with a sentence, including
  an comments array, a tokens array, and a list of options/settings that apply
  to all subelements of this sentence</p>
</dd>
<dt><a href="#Token">Token</a></dt>
<dd><p>this class contains all the information associated with a token, including
  a possible superToken, an array of possible analyses, an index to the
  current analysis, and a Boolean representing whether it is an &quot;empty&quot; token</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#sanitize">sanitize(str)</a> ⇒ <code>String</code></dt>
<dd><p>strip whitespace from a string</p>
</dd>
<dt><a href="#parseEnhancedString">parseEnhancedString(str)</a> ⇒ <code>Array</code></dt>
<dd><p>take a string possibly given in enhanced notation and extract the head
  and deprel</p>
<p>e.g. <code>2:ccomp|3:nsubj</code> =&gt; <code>[
  { token: 2, deprel: &#39;ccomp&#39; },
  { token: 3, deprel: &#39;nsubj&#39; } ]</code></p>
</dd>
<dt><a href="#evaluatePunctPos">evaluatePunctPos(ana, string)</a> ⇒ <code>undefined</code></dt>
<dd><p>automatically add PUNCT pos tags to strings that consist of only punctuation</p>
<p>NOTE: only has an effect if sentence-level options help.upostag|help.xpostag
  are set to true (default: true)</p>
</dd>
<dt><a href="#cg3FormatOutput">cg3FormatOutput(ana, tabs)</a> ⇒ <code>String</code></dt>
<dd><p>helper function for Analysis::cg3 [get] ... actually does the work of
  deciding how we want to display the information contained in an analysis</p>
</dd>
<dt><a href="#split">split(str)</a> ⇒ <code>Array</code></dt>
<dd><p>helper function to split on whitespace</p>
</dd>
<dt><a href="#getIndent">getIndent(line)</a> ⇒ <code>Number</code></dt>
<dd><p>helper function to count the number of leading <code>\t</code> characters in a string</p>
</dd>
<dt><a href="#cg3StringGetForm">cg3StringGetForm(line)</a> ⇒ <code>undefined</code> | <code>String</code></dt>
<dd><p>extract the <code>form</code> parameter from a given string</p>
</dd>
<dt><a href="#cg3StringGetTags">cg3StringGetTags(line)</a> ⇒ <code>Object</code></dt>
<dd><p>extract all the other (not <code>form</code>) tags from a given string</p>
</dd>
<dt><a href="#cg3StringParseAnalysis">cg3StringParseAnalysis(token, lines)</a> ⇒ <code>undefined</code></dt>
<dd><p>parse an array of strings representing a CG3 analysis ... recall that in CG3,
  subTokens have an increasingly hanging indent from their superToken</p>
</dd>
</dl>

<a name="Analysis"></a>

## Analysis
this class contains all the information associated with an analysis, including
  a value for each of form, lemma, upostag, xpostag, feats, head, deprel,
  deps, & misc ... also keeps an array of subTokens and an index

**Kind**: global class  

* [Analysis](#Analysis)
    * [.length](#Analysis+length) ⇒ <code>Number</code>
    * [.nx](#Analysis+nx) ⇒ <code>Object</code>
    * [.text](#Analysis+text) ⇒ <code>String</code>
    * [.conllu](#Analysis+conllu) ⇒ <code>String</code>
    * [.cg3](#Analysis+cg3) ⇒ <code>String</code>
    * [.eles](#Analysis+eles) ⇒ <code>Array</code>
    * [.form](#Analysis+form) ⇒ <code>String</code> \| <code>undefined</code>
    * [.form](#Analysis+form) ⇒ <code>undefined</code>
    * [.lemma](#Analysis+lemma) ⇒ <code>String</code> \| <code>undefined</code>
    * [.lemma](#Analysis+lemma) ⇒ <code>undefined</code>
    * [.pos](#Analysis+pos) ⇒ <code>String</code> \| <code>undefined</code>
    * [.upostag](#Analysis+upostag) ⇒ <code>String</code> \| <code>undefined</code>
    * [.upostag](#Analysis+upostag) ⇒ <code>undefined</code>
    * [.xpostag](#Analysis+xpostag) ⇒ <code>String</code> \| <code>undefined</code>
    * [.xpostag](#Analysis+xpostag) ⇒ <code>undefined</code>
    * [.feats](#Analysis+feats) ⇒ <code>String</code> \| <code>undefined</code>
    * [.feats](#Analysis+feats) ⇒ <code>undefined</code>
    * [.head](#Analysis+head) ⇒ <code>String</code>
    * [.head](#Analysis+head) ⇒ <code>undefined</code>
    * [.deprel](#Analysis+deprel) ⇒ <code>String</code> \| <code>undefined</code>
    * [.deprel](#Analysis+deprel) ⇒ <code>undefined</code>
    * [.deps](#Analysis+deps) ⇒ <code>String</code>
    * [.deps](#Analysis+deps) ⇒ <code>undefined</code>
    * [.misc](#Analysis+misc) ⇒ <code>String</code> \| <code>undefined</code>
    * [.misc](#Analysis+misc) ⇒ <code>undefined</code>
    * [.superToken](#Analysis+superToken) ⇒ [<code>Token</code>](#Token) \| <code>null</code>
    * [.isSubToken](#Analysis+isSubToken) ⇒ <code>Boolean</code>
    * [.isSuperToken](#Analysis+isSuperToken) ⇒ <code>Boolean</code>
    * [.isCurrent](#Analysis+isCurrent) ⇒ <code>Boolean</code>
    * [.get](#Analysis+get) ⇒ <code>Mixed</code>
    * [.getSubToken(index)](#Analysis+getSubToken) ⇒ <code>null</code> \| [<code>Token</code>](#Token)
    * [.insertSubTokenAt(index, token)](#Analysis+insertSubTokenAt) ⇒ [<code>Analysis</code>](#Analysis)
    * [.removeSubTokenAt(index)](#Analysis+removeSubTokenAt) ⇒ <code>null</code> \| [<code>Token</code>](#Token)
    * [.moveSubTokenAt(sourceIndex, targetIndex)](#Analysis+moveSubTokenAt) ⇒ [<code>Analysis</code>](#Analysis)
    * [.pushSubToken(token)](#Analysis+pushSubToken) ⇒ [<code>Analysis</code>](#Analysis)
    * [.popSubToken()](#Analysis+popSubToken) ⇒ <code>null</code> \| [<code>Analysis</code>](#Analysis)
    * [.mapHeads(callback)](#Analysis+mapHeads) ⇒ [<code>Analysis</code>](#Analysis)
    * [.addHead(head, deprel)](#Analysis+addHead) ⇒ [<code>Analysis</code>](#Analysis)
    * [.removeHead(head)](#Analysis+removeHead) ⇒ [<code>Analysis</code>](#Analysis)
    * [.changeHead(head, deprel)](#Analysis+changeHead) ⇒ [<code>Analysis</code>](#Analysis) \| <code>null</code>
    * [.mapDeps(callback)](#Analysis+mapDeps) ⇒ [<code>Analysis</code>](#Analysis)
    * [.addDep(dep, deprel)](#Analysis+addDep) ⇒ [<code>Analysis</code>](#Analysis)
    * [.removeDep(dep)](#Analysis+removeDep) ⇒ [<code>Analysis</code>](#Analysis)
    * [.changeDep(dep, deprel)](#Analysis+changeDep) ⇒ [<code>Analysis</code>](#Analysis) \| <code>null</code>

<a name="Analysis+length"></a>

### analysis.length ⇒ <code>Number</code>
**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
**Returns**: <code>Number</code> - total number of subTokens for this analysis  
<a name="Analysis+nx"></a>

### analysis.nx ⇒ <code>Object</code>
get a serial version of the internal analysis representation

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+text"></a>

### analysis.text ⇒ <code>String</code>
get a plain-text formatted string of the analysis

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+conllu"></a>

### analysis.conllu ⇒ <code>String</code>
get a CoNLL-U formatted string representing the analysis

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
**Throws**:

- <code>NotatrixError</code> if id has not been set

<a name="Analysis+cg3"></a>

### analysis.cg3 ⇒ <code>String</code>
get a CG3 formatted string representing the analysis

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+eles"></a>

### analysis.eles ⇒ <code>Array</code>
get an array of nodes relating to this analysis for export to an external 
  graphing library (e.g. Cytoscape, D3)

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+form"></a>

### analysis.form ⇒ <code>String</code> \| <code>undefined</code>
get the `form` ... if none defined, `help.form` setting `= true` (default:
  `true`), and `lemma` is set, return `lemma` instead

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+form"></a>

### analysis.form ⇒ <code>undefined</code>
set the `form` ... if the form is just punctuation, possibly set the pos tags
  to `PUNCT` (see [evaluatePunctPos](#evaluatePunctPos))

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+lemma"></a>

### analysis.lemma ⇒ <code>String</code> \| <code>undefined</code>
get the `lemma` ... if none defined, `help.lemma` setting `= true` (default:
  `true`), and `form` is set, return `form` instead

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+lemma"></a>

### analysis.lemma ⇒ <code>undefined</code>
set the `lemma` ... if the lemma is just punctuation, possibly set the pos tags
  to `PUNCT` (see [evaluatePunctPos](#evaluatePunctPos))

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+pos"></a>

### analysis.pos ⇒ <code>String</code> \| <code>undefined</code>
get the `pos`, which is just `upostag || xpostag`

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+upostag"></a>

### analysis.upostag ⇒ <code>String</code> \| <code>undefined</code>
get the `upostag`

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+upostag"></a>

### analysis.upostag ⇒ <code>undefined</code>
set the `upostag`

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+xpostag"></a>

### analysis.xpostag ⇒ <code>String</code> \| <code>undefined</code>
get the `xpostag`

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+xpostag"></a>

### analysis.xpostag ⇒ <code>undefined</code>
set the `xpostag`

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+feats"></a>

### analysis.feats ⇒ <code>String</code> \| <code>undefined</code>
get the `feats`

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+feats"></a>

### analysis.feats ⇒ <code>undefined</code>
set the `feats`

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+head"></a>

### analysis.head ⇒ <code>String</code>
get the `head` ... if the `showEnhanced` setting `= true` (default: `true`)
  will return a `|`-delimited list of `index`:`deprel` pairs

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+head"></a>

### analysis.head ⇒ <code>undefined</code>
set the `head` ... if the `Analysis` is `initializing`, just save a plain
  string, otherwise try to get the head by index (see [getById](#Sentence+getById))

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+deprel"></a>

### analysis.deprel ⇒ <code>String</code> \| <code>undefined</code>
get the `deprel`

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+deprel"></a>

### analysis.deprel ⇒ <code>undefined</code>
set the `deprel`

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+deps"></a>

### analysis.deps ⇒ <code>String</code>
get the `deps` returns a `|`-delimited list of `index`:`deprel` pairs

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+deps"></a>

### analysis.deps ⇒ <code>undefined</code>
set the `deps` ... if the `Analysis` is `initializing`, just save a plain
  string, otherwise try to get the dep by index (see [getById](#Sentence+getById))

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+misc"></a>

### analysis.misc ⇒ <code>String</code> \| <code>undefined</code>
get the `misc`

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+misc"></a>

### analysis.misc ⇒ <code>undefined</code>
set the `misc`

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+superToken"></a>

### analysis.superToken ⇒ [<code>Token</code>](#Token) \| <code>null</code>
returns this analysis's superToken if it exists

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+isSubToken"></a>

### analysis.isSubToken ⇒ <code>Boolean</code>
returns true iff this analysis is a subToken of some other token

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+isSuperToken"></a>

### analysis.isSuperToken ⇒ <code>Boolean</code>
returns true iff this analysis has subTokens

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+isCurrent"></a>

### analysis.isCurrent ⇒ <code>Boolean</code>
returns true iff this analysis is the current analysis

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+get"></a>

### analysis.get ⇒ <code>Mixed</code>
Proxy so that we can get subTokens using Array-like syntax

NOTE: usage: `ana[8]` would return the analysis of the subToken at index 8
NOTE: if `name` is not a Number, fall through to normal object

**Kind**: instance property of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+getSubToken"></a>

### analysis.getSubToken(index) ⇒ <code>null</code> \| [<code>Token</code>](#Token)
get subToken at the given index or null

**Kind**: instance method of [<code>Analysis</code>](#Analysis)  

| Param | Type |
| --- | --- |
| index | <code>Number</code> | 

<a name="Analysis+insertSubTokenAt"></a>

### analysis.insertSubTokenAt(index, token) ⇒ [<code>Analysis</code>](#Analysis)
insert a subToken BEFORE the given index

NOTE: if the index is out of bounds (<0 or >length), then it will be adjusted
  to fit the bounds. this means that you can call this with `index=-Infinity`
  to push to the front of the subTokens array or with `index=Infinity` to push
  to the end

**Kind**: instance method of [<code>Analysis</code>](#Analysis)  
**Throws**:

- <code>NotatrixError</code> if given invalid index or analysis (see below)


| Param | Type |
| --- | --- |
| index | <code>Number</code> | 
| token | [<code>Token</code>](#Token) | 

<a name="Analysis+removeSubTokenAt"></a>

### analysis.removeSubTokenAt(index) ⇒ <code>null</code> \| [<code>Token</code>](#Token)
remove a subToken at the given index

NOTE: if the index is out of bounds (<0 or >length - 1), then it will be
  adjusted to fit the bounds. this means that you can call this with
  `index=-Infinity` to remove the first element of the subTokens array or
  with `index=Infinity` to remove the last

**Kind**: instance method of [<code>Analysis</code>](#Analysis)  
**Throws**:

- <code>NotatrixError</code> if given invalid index


| Param | Type |
| --- | --- |
| index | <code>Number</code> | 

<a name="Analysis+moveSubTokenAt"></a>

### analysis.moveSubTokenAt(sourceIndex, targetIndex) ⇒ [<code>Analysis</code>](#Analysis)
move a subToken from sourceIndex to targetIndex

NOTE: if either index is out of bounds (<0 or >length - 1), then it will
  be adjusted to fit the bounds. this means that you can call this with
  `sourceIndex=-Infinity` to select the first element of the subTokens array
  or with `sourceIndex=Infinity` to select the last

**Kind**: instance method of [<code>Analysis</code>](#Analysis)  
**Throws**:

- <code>NotatrixError</code> if given invalid sourceIndex or targetIndex


| Param | Type |
| --- | --- |
| sourceIndex | <code>Number</code> | 
| targetIndex | <code>Number</code> | 

<a name="Analysis+pushSubToken"></a>

### analysis.pushSubToken(token) ⇒ [<code>Analysis</code>](#Analysis)
push a subToken to the end of the subTokens array ... sugar for
  Analysis::insertSubTokenAt(Infinity, analysis)

**Kind**: instance method of [<code>Analysis</code>](#Analysis)  

| Param | Type |
| --- | --- |
| token | [<code>Token</code>](#Token) | 

<a name="Analysis+popSubToken"></a>

### analysis.popSubToken() ⇒ <code>null</code> \| [<code>Analysis</code>](#Analysis)
pop a subToken from the end of the subTokens array ... sugar for
  Analysis::removeSubTokenAt(Infinity)

**Kind**: instance method of [<code>Analysis</code>](#Analysis)  
<a name="Analysis+mapHeads"></a>

### analysis.mapHeads(callback) ⇒ [<code>Analysis</code>](#Analysis)
iterate over the `head`s for this analysis and apply a callback to each

**Kind**: instance method of [<code>Analysis</code>](#Analysis)  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="Analysis+addHead"></a>

### analysis.addHead(head, deprel) ⇒ [<code>Analysis</code>](#Analysis)
add a head on the given token with a dependency relation

**Kind**: instance method of [<code>Analysis</code>](#Analysis)  

| Param | Type | Description |
| --- | --- | --- |
| head | [<code>Analysis</code>](#Analysis) | pointer directly to the analysis |
| deprel | <code>String</code> |  |

<a name="Analysis+removeHead"></a>

### analysis.removeHead(head) ⇒ [<code>Analysis</code>](#Analysis)
remove a head from the given analysis if it exists

**Kind**: instance method of [<code>Analysis</code>](#Analysis)  

| Param | Type |
| --- | --- |
| head | [<code>Analysis</code>](#Analysis) | 

<a name="Analysis+changeHead"></a>

### analysis.changeHead(head, deprel) ⇒ [<code>Analysis</code>](#Analysis) \| <code>null</code>
change the dependency relation for a given head ... returns null if unable
  to make the change

**Kind**: instance method of [<code>Analysis</code>](#Analysis)  

| Param | Type |
| --- | --- |
| head | [<code>Analysis</code>](#Analysis) | 
| deprel | <code>String</code> | 

<a name="Analysis+mapDeps"></a>

### analysis.mapDeps(callback) ⇒ [<code>Analysis</code>](#Analysis)
iterate over the `deps`s for this analysis and apply a callback to each

**Kind**: instance method of [<code>Analysis</code>](#Analysis)  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="Analysis+addDep"></a>

### analysis.addDep(dep, deprel) ⇒ [<code>Analysis</code>](#Analysis)
add a dep on the given token with a dependency relation

**Kind**: instance method of [<code>Analysis</code>](#Analysis)  

| Param | Type | Description |
| --- | --- | --- |
| dep | [<code>Analysis</code>](#Analysis) | pointer directly to the analysis |
| deprel | <code>String</code> |  |

<a name="Analysis+removeDep"></a>

### analysis.removeDep(dep) ⇒ [<code>Analysis</code>](#Analysis)
remove a dep from the given analysis if it exists

**Kind**: instance method of [<code>Analysis</code>](#Analysis)  

| Param | Type |
| --- | --- |
| dep | [<code>Analysis</code>](#Analysis) | 

<a name="Analysis+changeDep"></a>

### analysis.changeDep(dep, deprel) ⇒ [<code>Analysis</code>](#Analysis) \| <code>null</code>
change the dependency relation for a given dep ... returns null if unable
  to make the change

**Kind**: instance method of [<code>Analysis</code>](#Analysis)  

| Param | Type |
| --- | --- |
| dep | [<code>Analysis</code>](#Analysis) | 
| deprel | <code>String</code> | 

<a name="Sentence"></a>

## Sentence
this class contains all the information associated with a sentence, including
  an comments array, a tokens array, and a list of options/settings that apply
  to all subelements of this sentence

**Kind**: global class  

* [Sentence](#Sentence)
    * _instance_
        * [.length](#Sentence+length) ⇒ <code>Number</code>
        * [.nx](#Sentence+nx) ⇒ <code>String</code>
        * [.text](#Sentence+text) ⇒ <code>String</code>
        * [.conllu](#Sentence+conllu) ⇒ <code>String</code> \| <code>null</code>
        * [.conllu](#Sentence+conllu) ⇒ <code>String</code>
        * [.cg3](#Sentence+cg3) ⇒ <code>String</code> \| <code>null</code>
        * [.cg3](#Sentence+cg3) ⇒ <code>String</code>
        * [.params](#Sentence+params) ⇒ <code>Array</code> \| <code>null</code>
        * [.params](#Sentence+params) ⇒ <code>Array</code> \| <code>null</code>
        * [.eles](#Sentence+eles) ⇒ <code>Array</code>
        * [.isValidConllu](#Sentence+isValidConllu) ⇒ <code>Boolean</code>
        * [.isValidCG3](#Sentence+isValidCG3) ⇒ <code>Boolean</code>
        * [.get](#Sentence+get) ⇒ <code>Mixed</code>
        * [.forEach(callback)](#Sentence+forEach) ⇒ [<code>Sentence</code>](#Sentence)
        * [.getComment(index)](#Sentence+getComment) ⇒ <code>String</code> \| <code>null</code>
        * [.getToken(index)](#Sentence+getToken) ⇒ [<code>Token</code>](#Token) \| <code>null</code>
        * [.getById(index)](#Sentence+getById) ⇒ [<code>Analysis</code>](#Analysis) \| <code>null</code>
        * [.insertTokenAt(index, token)](#Sentence+insertTokenAt) ⇒ [<code>Sentence</code>](#Sentence)
        * [.removeTokenAt(index)](#Sentence+removeTokenAt) ⇒ [<code>Token</code>](#Token) \| <code>null</code>
        * [.moveTokenAt(sourceIndex, targetIndex)](#Sentence+moveTokenAt) ⇒ [<code>Sentence</code>](#Sentence)
        * [.pushToken(token)](#Sentence+pushToken) ⇒ [<code>Sentence</code>](#Sentence)
        * [.popToken()](#Sentence+popToken) ⇒ [<code>Token</code>](#Token) \| <code>null</code>
        * [.index()](#Sentence+index) ⇒ [<code>Sentence</code>](#Sentence)
        * [.attach()](#Sentence+attach) ⇒ [<code>Sentence</code>](#Sentence)
    * _static_
        * [.fromConllu(serial, options)](#Sentence.fromConllu) ⇒ [<code>Sentence</code>](#Sentence)
        * [.fromCG3(serial, options)](#Sentence.fromCG3) ⇒ [<code>Sentence</code>](#Sentence)
        * [.fromParams(paramsList, options)](#Sentence.fromParams) ⇒ [<code>Sentence</code>](#Sentence)

<a name="Sentence+length"></a>

### sentence.length ⇒ <code>Number</code>
**Kind**: instance property of [<code>Sentence</code>](#Sentence)  
**Returns**: <code>Number</code> - total number of tokens/subTokens in this sentence  
<a name="Sentence+nx"></a>

### sentence.nx ⇒ <code>String</code>
get a serial version of the internal sentence representation

**Kind**: instance property of [<code>Sentence</code>](#Sentence)  
<a name="Sentence+text"></a>

### sentence.text ⇒ <code>String</code>
get a plain-text formatted string of the sentence's current analysis text

**Kind**: instance property of [<code>Sentence</code>](#Sentence)  
<a name="Sentence+conllu"></a>

### sentence.conllu ⇒ <code>String</code> \| <code>null</code>
get a CoNLL-U formatted string representing the sentence's current analysis

**Kind**: instance property of [<code>Sentence</code>](#Sentence)  
<a name="Sentence+conllu"></a>

### sentence.conllu ⇒ <code>String</code>
parse a CoNLL-U formatted string and save its contents to the sentence

**Kind**: instance property of [<code>Sentence</code>](#Sentence)  

| Param | Type |
| --- | --- |
| conllu | <code>String</code> | 

<a name="Sentence+cg3"></a>

### sentence.cg3 ⇒ <code>String</code> \| <code>null</code>
get a CG3 formatted string representing all of the sentence's analyses

**Kind**: instance property of [<code>Sentence</code>](#Sentence)  
<a name="Sentence+cg3"></a>

### sentence.cg3 ⇒ <code>String</code>
parse a CG3 formatted string and save its contents to the sentence

**Kind**: instance property of [<code>Sentence</code>](#Sentence)  

| Param | Type |
| --- | --- |
| conllu | <code>String</code> | 

<a name="Sentence+params"></a>

### sentence.params ⇒ <code>Array</code> \| <code>null</code>
get an array of token parameters representing the sentence

NOTE: fails (returns null) if we have subTokens or ambiguous analyses

**Kind**: instance property of [<code>Sentence</code>](#Sentence)  
<a name="Sentence+params"></a>

### sentence.params ⇒ <code>Array</code> \| <code>null</code>
parse an array of token parameters and save contents to the sentence

**Kind**: instance property of [<code>Sentence</code>](#Sentence)  

| Param | Type |
| --- | --- |
| paramsList | <code>Array</code> | 

<a name="Sentence+eles"></a>

### sentence.eles ⇒ <code>Array</code>
get an array of the elements of this sentence, useful for exporting the data
  to visualization libraries such as Cytoscape or D3

**Kind**: instance property of [<code>Sentence</code>](#Sentence)  
<a name="Sentence+isValidConllu"></a>

### sentence.isValidConllu ⇒ <code>Boolean</code>
iterate through the tokens and determine if they could be converted into
  a CoNLL-U formatted string

NOTE: currently, only returns false if it contains one/more ambiguous analyses

**Kind**: instance property of [<code>Sentence</code>](#Sentence)  
<a name="Sentence+isValidCG3"></a>

### sentence.isValidCG3 ⇒ <code>Boolean</code>
iterate through the tokens and determine if they could be converted into
  a CG3 formatted string

NOTE: currently, always returns true (see update below)

**Kind**: instance property of [<code>Sentence</code>](#Sentence)  
<a name="Sentence+get"></a>

### sentence.get ⇒ <code>Mixed</code>
Proxy so that we can get tokens using Array-like syntax

NOTE: usage: `sent[8]` would return the analysis of the token at index 8
NOTE: if `name` is not a Number, fall through to normal object

**Kind**: instance property of [<code>Sentence</code>](#Sentence)  
<a name="Sentence+forEach"></a>

### sentence.forEach(callback) ⇒ [<code>Sentence</code>](#Sentence)
loop through every token in the sentence and apply a callback

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | function to be applied to every token |

<a name="Sentence+getComment"></a>

### sentence.getComment(index) ⇒ <code>String</code> \| <code>null</code>
return the comment at the given index, or null

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  

| Param | Type |
| --- | --- |
| index | <code>Number</code> | 

<a name="Sentence+getToken"></a>

### sentence.getToken(index) ⇒ [<code>Token</code>](#Token) \| <code>null</code>
return the token at the given index (note: this is regular token OR subToken),
  or null.  to choose by superToken index, use Sentence[index] syntax.  this
  function assumes only the current analysis is desired.

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  

| Param | Type |
| --- | --- |
| index | <code>Number</code> | 

<a name="Sentence+getById"></a>

### sentence.getById(index) ⇒ [<code>Analysis</code>](#Analysis) \| <code>null</code>
return the current analysis of the token that matches a given index string

NOTE: tokens outside the current analysis will have id=null and cannot be retrieved
  with this function

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  

| Param | Type |
| --- | --- |
| index | <code>String</code> | 

<a name="Sentence+insertTokenAt"></a>

### sentence.insertTokenAt(index, token) ⇒ [<code>Sentence</code>](#Sentence)
insert a token BEFORE the given index

NOTE: if the index is out of bounds (<0 or >length), then it will be adjusted
  to fit the bounds. this means that you can call this with `index=-Infinity`
  to push to the front of the tokens array or with `index=Infinity` to push
  to the end

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  
**Throws**:

- <code>NotatrixError</code> if given invalid index or token


| Param | Type |
| --- | --- |
| index | <code>Number</code> | 
| token | [<code>Token</code>](#Token) | 

<a name="Sentence+removeTokenAt"></a>

### sentence.removeTokenAt(index) ⇒ [<code>Token</code>](#Token) \| <code>null</code>
remove a token at the given index

NOTE: if the index is out of bounds (<0 or >length - 1), then it will be
  adjusted to fit the bounds. this means that you can call this with
  `index=-Infinity` to remove the first element of the tokens array or
  with `index=Infinity` to remove the last

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  
**Throws**:

- <code>NotatrixError</code> if given invalid index


| Param | Type |
| --- | --- |
| index | <code>Number</code> | 

<a name="Sentence+moveTokenAt"></a>

### sentence.moveTokenAt(sourceIndex, targetIndex) ⇒ [<code>Sentence</code>](#Sentence)
move a token from sourceIndex to targetIndex

NOTE: if either index is out of bounds (<0 or >length - 1), then it will
  be adjusted to fit the bounds. this means that you can call this with
  `sourceIndex=-Infinity` to select the first element of the tokens array
  or with `sourceIndex=Infinity` to select the last

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  
**Throws**:

- <code>NotatrixError</code> if given invalid sourceIndex or targetIndex


| Param | Type |
| --- | --- |
| sourceIndex | <code>Number</code> | 
| targetIndex | <code>Number</code> | 

<a name="Sentence+pushToken"></a>

### sentence.pushToken(token) ⇒ [<code>Sentence</code>](#Sentence)
push a token to the end of the tokens array ... sugar for
  Sentence::insertTokenAt(Infinity, token)

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  

| Param | Type |
| --- | --- |
| token | [<code>Token</code>](#Token) | 

<a name="Sentence+popToken"></a>

### sentence.popToken() ⇒ [<code>Token</code>](#Token) \| <code>null</code>
pop a token from the end of the tokens array ... sugar for
  Sentence::removeTokenAt(Infinity)

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  
<a name="Sentence+index"></a>

### sentence.index() ⇒ [<code>Sentence</code>](#Sentence)
iterate through the tokens and set an appropriate index for each (following
  CoNLL-U indexing scheme with, e.g. 1 for regular token, 1-2 for superToken,
  1.1 for "empty" token)

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  
<a name="Sentence+attach"></a>

### sentence.attach() ⇒ [<code>Sentence</code>](#Sentence)
iterate through the tokens and try to convert a plain string index to a
  head to the actual token given by that index (called after parsing
  CoNLL-U, CG3, or params)

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  
<a name="Sentence.fromConllu"></a>

### Sentence.fromConllu(serial, options) ⇒ [<code>Sentence</code>](#Sentence)
static method allowing us to construct a new Sentence directly from a
  CoNLL-U string

**Kind**: static method of [<code>Sentence</code>](#Sentence)  

| Param | Type | Description |
| --- | --- | --- |
| serial | <code>String</code> |  |
| options | <code>Object</code> | (optional) |

<a name="Sentence.fromCG3"></a>

### Sentence.fromCG3(serial, options) ⇒ [<code>Sentence</code>](#Sentence)
static method allowing us to construct a new Sentence directly from a
  CG3 string

**Kind**: static method of [<code>Sentence</code>](#Sentence)  

| Param | Type | Description |
| --- | --- | --- |
| serial | <code>String</code> |  |
| options | <code>Object</code> | (optional) |

<a name="Sentence.fromParams"></a>

### Sentence.fromParams(paramsList, options) ⇒ [<code>Sentence</code>](#Sentence)
static method allowing us to construct a new Sentence directly from an
  array of parameters

**Kind**: static method of [<code>Sentence</code>](#Sentence)  

| Param | Type | Description |
| --- | --- | --- |
| paramsList | <code>Array</code> |  |
| options | <code>Object</code> | (optional) |

<a name="Token"></a>

## Token
this class contains all the information associated with a token, including
  a possible superToken, an array of possible analyses, an index to the
  current analysis, and a Boolean representing whether it is an "empty" token

**Kind**: global class  

* [Token](#Token)
    * _instance_
        * [.length](#Token+length) ⇒ <code>Number</code>
        * [.current](#Token+current) ⇒ <code>Number</code>
        * [.current](#Token+current) ⇒ <code>Number</code>
        * [.analysis](#Token+analysis) ⇒ <code>null</code> \| [<code>Analysis</code>](#Analysis)
        * [.analysis](#Token+analysis) ⇒ [<code>Token</code>](#Token)
        * [.subTokens](#Token+subTokens) ⇒ <code>null</code> \| <code>Array</code>
        * [.nx](#Token+nx) ⇒ <code>Object</code>
        * [.text](#Token+text) ⇒ <code>String</code>
        * [.conllu](#Token+conllu) ⇒ <code>String</code>
        * [.conllu](#Token+conllu) ⇒ <code>undefined</code>
        * [.cg3](#Token+cg3) ⇒ <code>String</code>
        * [.cg3](#Token+cg3) ⇒ <code>undefined</code>
        * [.params](#Token+params) ⇒ <code>Object</code>
        * [.params](#Token+params) ⇒ <code>Object</code>
        * [.eles](#Token+eles) ⇒ <code>Array</code>
        * [.isSubToken](#Token+isSubToken) ⇒ <code>Boolean</code>
        * [.isSuperToken](#Token+isSuperToken) ⇒ <code>Boolean</code>
        * [.isEmpty](#Token+isEmpty) ⇒ <code>Boolean</code>
        * [.isAmbiguous](#Token+isAmbiguous) ⇒ <code>Boolean</code>
        * [.forEach(callback)](#Token+forEach) ⇒ [<code>Token</code>](#Token)
        * [.prev()](#Token+prev) ⇒ [<code>Token</code>](#Token)
        * [.next()](#Token+next) ⇒ [<code>Token</code>](#Token)
        * [.insertAnalysisAt(index, analysis)](#Token+insertAnalysisAt) ⇒ [<code>Token</code>](#Token)
        * [.removeAnalysisAt(index)](#Token+removeAnalysisAt) ⇒ <code>null</code> \| [<code>Analysis</code>](#Analysis)
        * [.moveAnalysisAt(sourceIndex, targetIndex)](#Token+moveAnalysisAt) ⇒ [<code>Token</code>](#Token)
        * [.pushAnalysis(analysis)](#Token+pushAnalysis) ⇒ [<code>Token</code>](#Token)
        * [.popAnalysis()](#Token+popAnalysis) ⇒ <code>null</code> \| [<code>Analysis</code>](#Analysis)
        * [.index(id, empty)](#Token+index) ⇒ <code>Array</code>
    * _static_
        * [.fromConllu(sent, serial)](#Token.fromConllu) ⇒ [<code>Token</code>](#Token)
        * [.fromCG3(sent, tokenLines)](#Token.fromCG3) ⇒ [<code>Token</code>](#Token)
        * [.fromParams(sent, params)](#Token.fromParams) ⇒ [<code>Token</code>](#Token)

<a name="Token+length"></a>

### token.length ⇒ <code>Number</code>
**Kind**: instance property of [<code>Token</code>](#Token)  
**Returns**: <code>Number</code> - total number of analyses in this token  
<a name="Token+current"></a>

### token.current ⇒ <code>Number</code>
return the _current index

**Kind**: instance property of [<code>Token</code>](#Token)  
<a name="Token+current"></a>

### token.current ⇒ <code>Number</code>
set the _current index to the given index if possible

**Kind**: instance property of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| current | <code>Number</code> | 

<a name="Token+analysis"></a>

### token.analysis ⇒ <code>null</code> \| [<code>Analysis</code>](#Analysis)
get the current analysis for the token or null if none exist

**Kind**: instance property of [<code>Token</code>](#Token)  
<a name="Token+analysis"></a>

### token.analysis ⇒ [<code>Token</code>](#Token)
set the current analysis for the token

NOTE: if there is already an analysis, overwrite

**Kind**: instance property of [<code>Token</code>](#Token)  
**Throws**:

- <code>NotatrixError</code> if given invalid analysis


| Param | Type |
| --- | --- |
| analysis | [<code>Analysis</code>](#Analysis) | 

<a name="Token+subTokens"></a>

### token.subTokens ⇒ <code>null</code> \| <code>Array</code>
if we have a current analysis, return its subTokens

**Kind**: instance property of [<code>Token</code>](#Token)  
<a name="Token+nx"></a>

### token.nx ⇒ <code>Object</code>
get a serial version of the internal token representation

**Kind**: instance property of [<code>Token</code>](#Token)  
<a name="Token+text"></a>

### token.text ⇒ <code>String</code>
get a plain-text formatted string of the current analysis text

**Kind**: instance property of [<code>Token</code>](#Token)  
**Throws**:

- <code>NotatrixError</code> if no analysis

<a name="Token+conllu"></a>

### token.conllu ⇒ <code>String</code>
get a CoNLL-U formatted string representing the current analysis

**Kind**: instance property of [<code>Token</code>](#Token)  
**Throws**:

- <code>NotatrixError</code> if no analysis
- <code>InvalidCoNLLUError</code> if ambiguous

<a name="Token+conllu"></a>

### token.conllu ⇒ <code>undefined</code>
parse a CoNLL-U formatted string and save its contents to the current analysis

**Kind**: instance property of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| serial | <code>String</code> | 

<a name="Token+cg3"></a>

### token.cg3 ⇒ <code>String</code>
get a CG3 formatted string representing the current analysis

**Kind**: instance property of [<code>Token</code>](#Token)  
**Throws**:

- <code>NotatrixError</code> if no analysis

<a name="Token+cg3"></a>

### token.cg3 ⇒ <code>undefined</code>
parse a CG3 formatted string and save its contents to the current analysis

**Kind**: instance property of [<code>Token</code>](#Token)  

| Param | Type | Description |
| --- | --- | --- |
| tokenLines | <code>Array</code> | generated in Sentence::cg3 [set] by splitting   a serial string on newlines |

<a name="Token+params"></a>

### token.params ⇒ <code>Object</code>
get the token parameters for the current analysis

**Kind**: instance property of [<code>Token</code>](#Token)  
**Throws**:

- <code>NotatrixError</code> if no analysis

<a name="Token+params"></a>

### token.params ⇒ <code>Object</code>
set a set of parameters as the current analysis

**Kind**: instance property of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| params | <code>Object</code> | 

<a name="Token+eles"></a>

### token.eles ⇒ <code>Array</code>
get an array of elements for exporting to external visualization libraries
  for all the analyses of this token

**Kind**: instance property of [<code>Token</code>](#Token)  
<a name="Token+isSubToken"></a>

### token.isSubToken ⇒ <code>Boolean</code>
returns true iff this token is a subToken of some other token

**Kind**: instance property of [<code>Token</code>](#Token)  
<a name="Token+isSuperToken"></a>

### token.isSuperToken ⇒ <code>Boolean</code>
returns true iff this token has subTokens

**Kind**: instance property of [<code>Token</code>](#Token)  
<a name="Token+isEmpty"></a>

### token.isEmpty ⇒ <code>Boolean</code>
returns true iff this token or its superToken is an "empty" token

**Kind**: instance property of [<code>Token</code>](#Token)  
<a name="Token+isAmbiguous"></a>

### token.isAmbiguous ⇒ <code>Boolean</code>
return true iff this token has more than one analysis

**Kind**: instance property of [<code>Token</code>](#Token)  
<a name="Token+forEach"></a>

### token.forEach(callback) ⇒ [<code>Token</code>](#Token)
loop through every analysis in the sentence and apply a callback

**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | function to be applied to every analysis |

<a name="Token+prev"></a>

### token.prev() ⇒ [<code>Token</code>](#Token)
decrement the _current counter by one (set "previous" analysis as current)

**Kind**: instance method of [<code>Token</code>](#Token)  
<a name="Token+next"></a>

### token.next() ⇒ [<code>Token</code>](#Token)
increment the _current counter by one (set "next" analysis as current)

**Kind**: instance method of [<code>Token</code>](#Token)  
<a name="Token+insertAnalysisAt"></a>

### token.insertAnalysisAt(index, analysis) ⇒ [<code>Token</code>](#Token)
insert an analysis BEFORE the given index

NOTE: if the index is out of bounds (<0 or >length), then it will be adjusted
  to fit the bounds. this means that you can call this with `index=-Infinity`
  to push to the front of the analyses array or with `index=Infinity` to push
  to the end

**Kind**: instance method of [<code>Token</code>](#Token)  
**Throws**:

- <code>NotatrixError</code> if given invalid index or analysis


| Param | Type |
| --- | --- |
| index | <code>Number</code> | 
| analysis | [<code>Analysis</code>](#Analysis) | 

<a name="Token+removeAnalysisAt"></a>

### token.removeAnalysisAt(index) ⇒ <code>null</code> \| [<code>Analysis</code>](#Analysis)
remove an analysis at the given index

NOTE: if the index is out of bounds (<0 or >length - 1), then it will be
  adjusted to fit the bounds. this means that you can call this with
  `index=-Infinity` to remove the first element of the analyses array or
  with `index=Infinity` to remove the last

**Kind**: instance method of [<code>Token</code>](#Token)  
**Throws**:

- <code>NotatrixError</code> if given invalid index


| Param | Type |
| --- | --- |
| index | <code>Number</code> | 

<a name="Token+moveAnalysisAt"></a>

### token.moveAnalysisAt(sourceIndex, targetIndex) ⇒ [<code>Token</code>](#Token)
move an analysis from sourceIndex to targetIndex

NOTE: if either index is out of bounds (<0 or >length - 1), then it will
  be adjusted to fit the bounds. this means that you can call this with
  `sourceIndex=-Infinity` to select the first element of the analyses array
  or with `sourceIndex=Infinity` to select the last

**Kind**: instance method of [<code>Token</code>](#Token)  
**Throws**:

- <code>NotatrixError</code> if given invalid sourceIndex or targetIndex


| Param | Type |
| --- | --- |
| sourceIndex | <code>Number</code> | 
| targetIndex | <code>Number</code> | 

<a name="Token+pushAnalysis"></a>

### token.pushAnalysis(analysis) ⇒ [<code>Token</code>](#Token)
push an analysis to the end of the analyses array ... sugar for
  Token::insertAnalysisAt(Infinity, analysis)

**Kind**: instance method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| analysis | [<code>Analysis</code>](#Analysis) | 

<a name="Token+popAnalysis"></a>

### token.popAnalysis() ⇒ <code>null</code> \| [<code>Analysis</code>](#Analysis)
pop an analysis from the end of the analyses array ... sugar for
  Token::insertRemoveAt(Infinity)

**Kind**: instance method of [<code>Token</code>](#Token)  
<a name="Token+index"></a>

### token.index(id, empty) ⇒ <code>Array</code>
iterate over this token and its subTokens (if we have any) for the current
  analysis, using the `id` and `empty` params to set indices

**Kind**: instance method of [<code>Token</code>](#Token)  
**Returns**: <code>Array</code> - [Number, Number]  
**Throws**:

- <code>NotatrixError</code> if given invalid id or empty


| Param | Type | Description |
| --- | --- | --- |
| id | <code>Number</code> | "overall" index |
| empty | <code>Number</code> |  |

<a name="Token.fromConllu"></a>

### Token.fromConllu(sent, serial) ⇒ [<code>Token</code>](#Token)
static method allowing us to construct a new Token directly from a
  CoNLL-U string and bind it to a sentence

**Kind**: static method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| sent | [<code>Sentence</code>](#Sentence) | 
| serial | <code>String</code> | 

<a name="Token.fromCG3"></a>

### Token.fromCG3(sent, tokenLines) ⇒ [<code>Token</code>](#Token)
static method allowing us to construct a new Token directly from a
  CG3 string

**Kind**: static method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| sent | [<code>Sentence</code>](#Sentence) | 
| tokenLines | <code>Array</code> | 

<a name="Token.fromParams"></a>

### Token.fromParams(sent, params) ⇒ [<code>Token</code>](#Token)
static method allowing us to construct a new Token directly from a set
  of parameters

**Kind**: static method of [<code>Token</code>](#Token)  

| Param | Type |
| --- | --- |
| sent | [<code>Sentence</code>](#Sentence) | 
| params | <code>Object</code> | 

<a name="sanitize"></a>

## sanitize(str) ⇒ <code>String</code>
strip whitespace from a string

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="parseEnhancedString"></a>

## parseEnhancedString(str) ⇒ <code>Array</code>
take a string possibly given in enhanced notation and extract the head
  and deprel

e.g. `2:ccomp|3:nsubj` => `[
  { token: 2, deprel: 'ccomp' },
  { token: 3, deprel: 'nsubj' } ]`

**Kind**: global function  
**Returns**: <code>Array</code> - [[Object]]  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="evaluatePunctPos"></a>

## evaluatePunctPos(ana, string) ⇒ <code>undefined</code>
automatically add PUNCT pos tags to strings that consist of only punctuation

NOTE: only has an effect if sentence-level options help.upostag|help.xpostag
  are set to true (default: true)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ana | [<code>Analysis</code>](#Analysis) | the analysis to evaluate for |
| string | <code>String</code> |  |

<a name="cg3FormatOutput"></a>

## cg3FormatOutput(ana, tabs) ⇒ <code>String</code>
helper function for Analysis::cg3 [get] ... actually does the work of
  deciding how we want to display the information contained in an analysis

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ana | [<code>Analysis</code>](#Analysis) |  |
| tabs | <code>Number</code> | current indent level |

<a name="split"></a>

## split(str) ⇒ <code>Array</code>
helper function to split on whitespace

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="getIndent"></a>

## getIndent(line) ⇒ <code>Number</code>
helper function to count the number of leading `\t` characters in a string

**Kind**: global function  

| Param | Type |
| --- | --- |
| line | <code>String</code> | 

<a name="cg3StringGetForm"></a>

## cg3StringGetForm(line) ⇒ <code>undefined</code> \| <code>String</code>
extract the `form` parameter from a given string

**Kind**: global function  

| Param | Type |
| --- | --- |
| line | <code>String</code> | 

<a name="cg3StringGetTags"></a>

## cg3StringGetTags(line) ⇒ <code>Object</code>
extract all the other (not `form`) tags from a given string

**Kind**: global function  

| Param | Type |
| --- | --- |
| line | <code>String</code> | 

<a name="cg3StringParseAnalysis"></a>

## cg3StringParseAnalysis(token, lines) ⇒ <code>undefined</code>
parse an array of strings representing a CG3 analysis ... recall that in CG3,
  subTokens have an increasingly hanging indent from their superToken

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| token | [<code>Token</code>](#Token) | token to attach the analyses to |
| lines | <code>Array</code> | [[String]] |

