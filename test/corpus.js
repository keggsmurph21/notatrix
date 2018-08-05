'use strict';

const _ = require('underscore'),
  expect = require('chai').expect,
  sinon = require('sinon'),
  utils = require('./utils'),
  nx = require('..');

describe('corpus', () => {
	it(`should navigate between sentences correctly`, () => {

    let corpus = new nx.Corpus();

		expect(corpus.length).to.equal(0);
    expect(corpus.index).to.equal(-1);
		corpus.first();
		expect(corpus.index).to.equal(-1);
		corpus.last();
		expect(corpus.index).to.equal(-1);
		corpus.prev();
		expect(corpus.index).to.equal(-1);
		corpus.next();
		expect(corpus.index).to.equal(-1);
		corpus.index = -1;
		expect(corpus.index).to.equal(-1);
		corpus.index = Infinity;
		expect(corpus.index).to.equal(-1);
		corpus.index = null;
		expect(corpus.index).to.equal(-1);

    corpus.insertSentence(0, 'hello');

		expect(corpus.length).to.equal(1);
		corpus.first();
		expect(corpus.index).to.equal(0);
		corpus.last();
		expect(corpus.index).to.equal(0);
		corpus.prev();
		expect(corpus.index).to.equal(0);
		corpus.next();
		expect(corpus.index).to.equal(0);
		corpus.index = -1;
		expect(corpus.index).to.equal(0);
		corpus.index = Infinity;
		expect(corpus.index).to.equal(0);
		corpus.index = null;
		expect(corpus.index).to.equal(0);

		corpus.insertSentence(1, 'hello');
    corpus.insertSentence(2, 'world');

		expect(corpus.length).to.equal(3);
		corpus.first();
		expect(corpus.index).to.equal(0);
		corpus.last();
		expect(corpus.index).to.equal(2);
		corpus.prev();
		expect(corpus.index).to.equal(1);
		corpus.prev();
		expect(corpus.index).to.equal(0);
		corpus.prev();
		expect(corpus.index).to.equal(0);
		corpus.next();
		expect(corpus.index).to.equal(1);
		corpus.next();
		expect(corpus.index).to.equal(2);
		corpus.next();
		expect(corpus.index).to.equal(2);
		corpus.index = -1;
		expect(corpus.index).to.equal(0);
		corpus.index = Infinity;
		expect(corpus.index).to.equal(0);
		corpus.index = null;
		expect(corpus.index).to.equal(0);
		corpus.index = 0;
		expect(corpus.index).to.equal(0);
		corpus.index = 1;
		expect(corpus.index).to.equal(1);
		corpus.index = 2;
		expect(corpus.index).to.equal(2);
		corpus.index = 3;
		expect(corpus.index).to.equal(2);

	});

	it(`should insert and remove sentences correctly`, () => {

    const text = index => {
      const sent = corpus.getSentence(index);

      if (!sent)
        return sent;

      return sent.to('plain text').output;
    }

    var corpus = nx.Corpus.fromString('test0');

		expect(corpus.length).to.equal(1);
		expect(corpus.index).to.equal(0);
		expect(text(0)).to.equal('test0');
		expect(text(1)).to.equal(null);

		corpus.insertSentence('test1');
		expect(corpus.length).to.equal(2);
		expect(corpus.index).to.equal(1);
		expect(text(0)).to.equal('test0');
		expect(text(1)).to.equal('test1');
		expect(text(2)).to.equal(null);

		corpus.insertSentence(0, 'test2');
		expect(corpus.length).to.equal(3);
		expect(corpus.index).to.equal(0);
		expect(text(0)).to.equal('test2');
		expect(text(1)).to.equal('test0');
		expect(text(2)).to.equal('test1');
		expect(text(3)).to.equal(null);

		corpus.insertSentence(-30, 'test3');
		expect(corpus.length).to.equal(4);
		expect(corpus.index).to.equal(0);
		expect(text(0)).to.equal('test3');
		expect(text(1)).to.equal('test2');
		expect(text(2)).to.equal('test0');
		expect(text(3)).to.equal('test1');
		expect(text(4)).to.equal(null);

		corpus.insertSentence(2, 'test4');
		expect(corpus.length).to.equal(5);
		expect(corpus.index).to.equal(2);
		expect(text(0)).to.equal('test3');
		expect(text(1)).to.equal('test2');
		expect(text(2)).to.equal('test4');
		expect(text(3)).to.equal('test0');
		expect(text(4)).to.equal('test1');
		expect(text(5)).to.equal(null);

		corpus.insertSentence(10000, 'test5');
		expect(corpus.length).to.equal(6);
		expect(corpus.index).to.equal(5);
		expect(text(0)).to.equal('test3');
		expect(text(1)).to.equal('test2');
		expect(text(2)).to.equal('test4');
		expect(text(3)).to.equal('test0');
		expect(text(4)).to.equal('test1');
		expect(text(5)).to.equal('test5');
		expect(text(6)).to.equal(null);

		let removed;

		removed = corpus.removeSentence();
		expect(corpus.length).to.equal(5);
		expect(corpus.index).to.equal(4);
		expect(text(0)).to.equal('test3');
		expect(text(1)).to.equal('test2');
		expect(text(2)).to.equal('test4');
		expect(text(3)).to.equal('test0');
		expect(text(4)).to.equal('test1');
		expect(text(5)).to.equal(null);
		expect(removed.to('plain text').output).to.equal('test5');

		removed = corpus.removeSentence(2);
		expect(corpus.length).to.equal(4); // NOTE: extra space
		expect(corpus.index).to.equal(3);
		expect(text(0)).to.equal('test3');
		expect(text(1)).to.equal('test2');
		expect(text(2)).to.equal('test0');
		expect(text(3)).to.equal('test1');
		expect(text(4)).to.equal(null);
		expect(removed.to('plain text').output).to.equal('test4');

		removed = corpus.removeSentence(-100);
		expect(corpus.length).to.equal(3);
		expect(corpus.index).to.equal(2);
		expect(text(0)).to.equal('test2');
		expect(text(1)).to.equal('test0');
		expect(text(2)).to.equal('test1');
		expect(text(3)).to.equal(null);
		expect(removed.to('plain text').output).to.equal('test3');

		removed = corpus.removeSentence(100);
		expect(corpus.length).to.equal(2);
		expect(corpus.index).to.equal(1);
		expect(text(0)).to.equal('test2');
		expect(text(1)).to.equal('test0');
		expect(text(2)).to.equal(null);
		expect(removed.to('plain text').output).to.equal('test1');

		expect(() => corpus.insertSentence(null, 'error')).to.throw(nx.NxError);
		expect(() => corpus.removeSentence(null)).to.throw(nx.NxError);

		corpus.pushSentence('push1');
		corpus.pushSentence('push2');
		expect(corpus.length).to.equal(4);
		expect(corpus.index).to.equal(3);
		expect(text(0)).to.equal('test2');
		expect(text(1)).to.equal('test0');
		expect(text(2)).to.equal('push1');
		expect(text(3)).to.equal('push2');
		expect(text(4)).to.equal(null);

		removed = corpus.popSentence();
		expect(corpus.length).to.equal(3);
		expect(corpus.index).to.equal(2);
		expect(text(0)).to.equal('test2');
		expect(text(1)).to.equal('test0');
		expect(text(2)).to.equal('push1');
		expect(text(3)).to.equal(null);
		expect(removed.to('plain text').output).to.equal('push2');

		corpus.setSentence(1, 'set2');
    corpus.setSentence(0, 'set1');
		corpus.setSentence(2, 'set3');
		corpus.setSentence('set5');
		expect(text(0)).to.equal('set1');
		expect(text(1)).to.equal('set2');
		expect(text(2)).to.equal('set5');
		expect(text(3)).to.equal(null);

	});
});
