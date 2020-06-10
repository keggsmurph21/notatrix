## Classes

<dl>
<dt><a href="#Analysis">Analysis</a></dt>
<dd><p>Abstraction over a CG3 analysis.  Most sentences have just one of these for
 each token.</p>
</dd>
<dt><a href="#BaseToken">BaseToken</a></dt>
<dd><p>Ancestor of Token, SubToken, SuperToken.  Implements methods common
 to all three of them.</p>
</dd>
<dt><a href="#Comment">Comment</a></dt>
<dd><p>Abstraction over a CoNLL-U or CG3 comment, allows us to extract and then
 manipulate data in some useful ways across a Corpus.</p>
</dd>
<dt><a href="#Corpus">Corpus</a></dt>
<dd><p>Abstraction over a collection of Sentences.  NOTE: this class is
 out-of-date and will be replaced soon :)</p>
</dd>
<dt><a href="#Label">Label</a></dt>
<dd><p>Allows us to extract labels from &quot;field = value&quot;-type comments, so that
 we can filter a corpus by Label and arbitrarily apply that label to
 multiple Sentences.</p>
</dd>
<dt><a href="#Labeler">Labeler</a></dt>
<dd><p>Abstraction to hold a mapping of String =&gt; Label pairs, as well as some
 methods for doing work on those labels.</p>
</dd>
<dt><a href="#Sentence">Sentence</a></dt>
<dd><p>Abstraction over a Sentence.  Holds an array of comments and of tokens,
 plus some metadata.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Labeler_SortReturnT">Labeler_SortReturnT</a></dt>
<dd></dd>
</dl>

<a name="Analysis"></a>

## Analysis
Abstraction over a CG3 analysis.  Most sentences have just one of these for
 each token.

**Kind**: global class  
<a name="BaseToken"></a>

## BaseToken
Ancestor of Token, SubToken, SuperToken.  Implements methods common
 to all three of them.

**Kind**: global class  

* [BaseToken](#BaseToken)
    * [.addHead(head, deprel)](#BaseToken+addHead)
    * [.modifyHead(head, deprel)](#BaseToken+modifyHead)
    * [.removeHead(head)](#BaseToken+removeHead)
    * [.removeAllHeads()](#BaseToken+removeAllHeads)
    * [.mapHeads()](#BaseToken+mapHeads)
    * [.mapDependents()](#BaseToken+mapDependents)
    * [.getHead(format)](#BaseToken+getHead) ⇒ <code>String</code>
    * [.setEmpty(isEmpty)](#BaseToken+setEmpty)
    * [.walk(callback)](#BaseToken+walk)
    * [.hashFields(...fields)](#BaseToken+hashFields) ⇒ <code>String</code>
    * [.serialize()](#BaseToken+serialize)

<a name="BaseToken+addHead"></a>

### baseToken.addHead(head, deprel)
Add a head to a token with a dependency relation.

**Kind**: instance method of [<code>BaseToken</code>](#BaseToken)  

| Param | Type |
| --- | --- |
| head | [<code>BaseToken</code>](#BaseToken) | 
| deprel | <code>String</code> | 

<a name="BaseToken+modifyHead"></a>

### baseToken.modifyHead(head, deprel)
Change the dependency relation for a given head.

**Kind**: instance method of [<code>BaseToken</code>](#BaseToken)  

| Param | Type |
| --- | --- |
| head | [<code>BaseToken</code>](#BaseToken) | 
| deprel | <code>String</code> | 

<a name="BaseToken+removeHead"></a>

### baseToken.removeHead(head)
Remove a head and its dependency relation.

**Kind**: instance method of [<code>BaseToken</code>](#BaseToken)  

| Param | Type |
| --- | --- |
| head | [<code>BaseToken</code>](#BaseToken) | 

<a name="BaseToken+removeAllHeads"></a>

### baseToken.removeAllHeads()
Remove all heads

**Kind**: instance method of [<code>BaseToken</code>](#BaseToken)  
<a name="BaseToken+mapHeads"></a>

### baseToken.mapHeads()
Apply a callback to each of a token's heads

**Kind**: instance method of [<code>BaseToken</code>](#BaseToken)  
<a name="BaseToken+mapDependents"></a>

### baseToken.mapDependents()
Apply a callback to each of token's dependents

**Kind**: instance method of [<code>BaseToken</code>](#BaseToken)  
<a name="BaseToken+getHead"></a>

### baseToken.getHead(format) ⇒ <code>String</code>
Get the head index for a given format

**Kind**: instance method of [<code>BaseToken</code>](#BaseToken)  

| Param | Type |
| --- | --- |
| format | <code>String</code> | 

<a name="BaseToken+setEmpty"></a>

### baseToken.setEmpty(isEmpty)
Mark this token as "empty" (aka "null")

**Kind**: instance method of [<code>BaseToken</code>](#BaseToken)  

| Param | Type |
| --- | --- |
| isEmpty | <code>boolean</code> | 

<a name="BaseToken+walk"></a>

### baseToken.walk(callback)
Apply a callback to each of a token's analyses and subTokens

**Kind**: instance method of [<code>BaseToken</code>](#BaseToken)  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="BaseToken+hashFields"></a>

### baseToken.hashFields(...fields) ⇒ <code>String</code>
Hash a list of fields to a string

**Kind**: instance method of [<code>BaseToken</code>](#BaseToken)  

| Param | Type |
| --- | --- |
| ...fields | <code>Array.&lt;String&gt;</code> | 

<a name="BaseToken+serialize"></a>

### baseToken.serialize()
Serialize a token to JSON format

**Kind**: instance method of [<code>BaseToken</code>](#BaseToken)  
<a name="Comment"></a>

## Comment
Abstraction over a CoNLL-U or CG3 comment, allows us to extract and then
 manipulate data in some useful ways across a Corpus.

**Kind**: global class  
<a name="Corpus"></a>

## Corpus
Abstraction over a collection of Sentences.  NOTE: this class is
 out-of-date and will be replaced soon :)

**Kind**: global class  
<a name="Label"></a>

## Label
Allows us to extract labels from "field = value"-type comments, so that
 we can filter a corpus by Label and arbitrarily apply that label to
 multiple Sentences.

**Kind**: global class  
<a name="Labeler"></a>

## Labeler
Abstraction to hold a mapping of String => Label pairs, as well as some
 methods for doing work on those labels.

**Kind**: global class  

* [Labeler](#Labeler)
    * [.sort()](#Labeler+sort) ⇒ [<code>Labeler_SortReturnT</code>](#Labeler_SortReturnT)
    * [.get(name)](#Labeler+get) ⇒ [<code>Label</code>](#Label)
    * [.count(name)](#Labeler+count) ⇒ <code>Number</code>
    * [.sentenceHasLabel(sent, searching)](#Labeler+sentenceHasLabel) ⇒ <code>Boolean</code>
    * [.sentenceInFilter(sent)](#Labeler+sentenceInFilter) ⇒ <code>Boolean</code>
    * [.addToFilter(name)](#Labeler+addToFilter)
    * [.removeFromFilter(name)](#Labeler+removeFromFilter)
    * [.onAdd(sent)](#Labeler+onAdd)
    * [.onRemove(sent)](#Labeler+onRemove)
    * [.addLabel(name, [sents])](#Labeler+addLabel)
    * [.removeLabel(name, sents)](#Labeler+removeLabel)
    * [.changeLabelName(oldName, newName)](#Labeler+changeLabelName) ⇒ [<code>Label</code>](#Label)
    * [.changeLabelColor(name, color)](#Labeler+changeLabelColor) ⇒ <code>Boolean</code>
    * [.changeLabelDesc(name, desc)](#Labeler+changeLabelDesc) ⇒ <code>Boolean</code>

<a name="Labeler+sort"></a>

### labeler.sort() ⇒ [<code>Labeler_SortReturnT</code>](#Labeler_SortReturnT)
Sort all labels in Corpus by number of Sentences with that label

**Kind**: instance method of [<code>Labeler</code>](#Labeler)  
<a name="Labeler+get"></a>

### labeler.get(name) ⇒ [<code>Label</code>](#Label)
Get a Label given its name

**Kind**: instance method of [<code>Labeler</code>](#Labeler)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="Labeler+count"></a>

### labeler.count(name) ⇒ <code>Number</code>
Get the number of sentences with a given Label

**Kind**: instance method of [<code>Labeler</code>](#Labeler)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="Labeler+sentenceHasLabel"></a>

### labeler.sentenceHasLabel(sent, searching) ⇒ <code>Boolean</code>
Crawl through a sentence's comments to see if it has a particular Label

**Kind**: instance method of [<code>Labeler</code>](#Labeler)  

| Param | Type |
| --- | --- |
| sent | [<code>Sentence</code>](#Sentence) | 
| searching | <code>String</code> | 

<a name="Labeler+sentenceInFilter"></a>

### labeler.sentenceInFilter(sent) ⇒ <code>Boolean</code>
Checks if a given Sentence should be filtered

**Kind**: instance method of [<code>Labeler</code>](#Labeler)  

| Param | Type |
| --- | --- |
| sent | [<code>Sentence</code>](#Sentence) | 

<a name="Labeler+addToFilter"></a>

### labeler.addToFilter(name)
Adds a Label name to the filter

**Kind**: instance method of [<code>Labeler</code>](#Labeler)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="Labeler+removeFromFilter"></a>

### labeler.removeFromFilter(name)
Removes a Label name from the filter

**Kind**: instance method of [<code>Labeler</code>](#Labeler)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="Labeler+onAdd"></a>

### labeler.onAdd(sent)
Callback to be triggered whenever we add a new Sentence to a Corpus

**Kind**: instance method of [<code>Labeler</code>](#Labeler)  

| Param | Type |
| --- | --- |
| sent | [<code>Sentence</code>](#Sentence) | 

<a name="Labeler+onRemove"></a>

### labeler.onRemove(sent)
Callback to be triggered whenever we remove a Sentence from a Corpus

**Kind**: instance method of [<code>Labeler</code>](#Labeler)  

| Param | Type |
| --- | --- |
| sent | [<code>Sentence</code>](#Sentence) | 

<a name="Labeler+addLabel"></a>

### labeler.addLabel(name, [sents])
Add new Label with the given name (if it doesn't already exist) and
 attach it to a list of Sentences.

**Kind**: instance method of [<code>Labeler</code>](#Labeler)  

| Param | Type | Default |
| --- | --- | --- |
| name | <code>String</code> |  | 
| [sents] | [<code>Array.&lt;Sentence&gt;</code>](#Sentence) | <code>[]</code> | 

<a name="Labeler+removeLabel"></a>

### labeler.removeLabel(name, sents)
Remove a Label by name (if it exists) from a set of Sentences (can
 be omitted).

**Kind**: instance method of [<code>Labeler</code>](#Labeler)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| sents | [<code>Array.&lt;Sentence&gt;</code>](#Sentence) | 

<a name="Labeler+changeLabelName"></a>

### labeler.changeLabelName(oldName, newName) ⇒ [<code>Label</code>](#Label)
Change the name of a Label from oldName => newName

**Kind**: instance method of [<code>Labeler</code>](#Labeler)  

| Param | Type |
| --- | --- |
| oldName | <code>String</code> | 
| newName | <code>String</code> | 

<a name="Labeler+changeLabelColor"></a>

### labeler.changeLabelColor(name, color) ⇒ <code>Boolean</code>
Change the color of a Label to a given color

**Kind**: instance method of [<code>Labeler</code>](#Labeler)  
**Returns**: <code>Boolean</code> - - whether the operation succeeded  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| color | <code>String</code> | 

<a name="Labeler+changeLabelDesc"></a>

### labeler.changeLabelDesc(name, desc) ⇒ <code>Boolean</code>
Change the description of a Label to a given description

**Kind**: instance method of [<code>Labeler</code>](#Labeler)  
**Returns**: <code>Boolean</code> - - whether the operation succeeded  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| desc | <code>String</code> | 

<a name="Sentence"></a>

## Sentence
Abstraction over a Sentence.  Holds an array of comments and of tokens,
 plus some metadata.

**Kind**: global class  

* [Sentence](#Sentence)
    * [.to(format, options)](#Sentence+to)
    * [.serialize()](#Sentence+serialize)
    * [.iterate(callback)](#Sentence+iterate)
    * [.query()](#Sentence+query)
    * [.enhance()](#Sentence+enhance)
    * [.unenhance()](#Sentence+unenhance)
    * [.getSuperToken(token)](#Sentence+getSuperToken) ⇒ [<code>BaseToken</code>](#BaseToken)
    * [.merge(src, tar)](#Sentence+merge)
    * [.combine(src, tar)](#Sentence+combine)
    * [.split(src, splitAtIndex)](#Sentence+split)

<a name="Sentence+to"></a>

### sentence.to(format, options)
Output Sentence to a given format

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  

| Param | Type |
| --- | --- |
| format | <code>String</code> | 
| options | <code>Object</code> | 

<a name="Sentence+serialize"></a>

### sentence.serialize()
Output Sentence to a notatrix-serial string

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  
<a name="Sentence+iterate"></a>

### sentence.iterate(callback)
Apply a callback function for every token in the sentence

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="Sentence+query"></a>

### sentence.query()
Return all tokens where `predicate(token)` is truth-y

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  
<a name="Sentence+enhance"></a>

### sentence.enhance()
Tell Sentence to output in enhanced dependency format

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  
<a name="Sentence+unenhance"></a>

### sentence.unenhance()
Tell Sentence to stop outputting in enhanced dependency format

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  
<a name="Sentence+getSuperToken"></a>

### sentence.getSuperToken(token) ⇒ [<code>BaseToken</code>](#BaseToken)
Get the superToken for a given token

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  

| Param | Type |
| --- | --- |
| token | [<code>BaseToken</code>](#BaseToken) | 

<a name="Sentence+merge"></a>

### sentence.merge(src, tar)
Merge tokens into a single, regular token

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  

| Param | Type |
| --- | --- |
| src | [<code>BaseToken</code>](#BaseToken) | 
| tar | [<code>BaseToken</code>](#BaseToken) | 

<a name="Sentence+combine"></a>

### sentence.combine(src, tar)
Combine tokens into subTokens of some superToken

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  

| Param | Type |
| --- | --- |
| src | [<code>BaseToken</code>](#BaseToken) | 
| tar | [<code>BaseToken</code>](#BaseToken) | 

<a name="Sentence+split"></a>

### sentence.split(src, splitAtIndex)
Split a given token into two tokens.  If the given token is a
 superToken, make each of its subTokens into a regular token and
 delete the superToken.  Otherwise, split the token at the given
 index.

**Kind**: instance method of [<code>Sentence</code>](#Sentence)  

| Param | Type |
| --- | --- |
| src | [<code>BaseToken</code>](#BaseToken) | 
| splitAtIndex | <code>Number</code> | 

<a name="Labeler_SortReturnT"></a>

## Labeler_SortReturnT
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Label name |
| size | <code>Number</code> | Number of sentences with Label |

