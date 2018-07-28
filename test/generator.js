'use strict';

const _ = require('underscore'),
  expect = require('chai').expect,
  sinon = require('sinon'),
  utils = require('./utils'),
  nx = require('..');

describe('generator', () => {

  describe('generate output in input format from nx.Sentence instances', () => {

    utils.forEachText((text, format, name) => {
      it(`${format}:${name}`, () => {

        // massage the inputs and outputs to not break at pointless places
        let maps = [];
        switch (format) {
          case ('CoNLL-U'):
            maps = [
              utils.spacesToTabs,
              line => line.trim(),
            ];
            break;
        }

        let options = {
          addHeadOnModifyFailure: false,
          addHeadsWhenAddingDeps: false,
          headsShowDeprel: false,
          addDepOnModifyFailure: false,
          addDepsWhenAddingHeads: false,
          depsShowDeprel: false,
          showEnhancedDependencies: false,
        };

        // some data has weird stuff that needs to be set
        switch (`${format}:${name}`) {
          case ('CoNLL-U:ud_example_modified'):
            options.headsShowDeprel = true;
            options.depsShowDeprel = true;
            options.showEnhancedDependencies = true;
            break;
          case ('CoNLL-U:ud_example_spaces'):
            options.headsShowDeprel = true;
            options.depsShowDeprel = true;
            options.showRootDeprel = false;
            options.showEnhancedDependencies = true;
            break;
          default:
            return;
        }

        const sent = new nx.Sentence(text, options);
        const generated = nx.generate[format](sent, options);
        const detected = nx.detect.as[format](generated);

        expect(detected).to.equal(format);
        expect(
          utils.clean(generated, maps)
        ).to.equal(
          utils.clean(text, maps)
        );

      });
    });
  });

  if (false)
  describe('generate output in input format from any format', () => {

    const options = {};

    utils.forEachText((text, format, name) => {
      it(`${format}:${name}`, () => {

        if (format === 'CoNLL-U')
          nx.generate[format](text, options);

      });
    });
  });

  /*
  describe('parse formats implicitly to notatrix serial', () => {

    const options = {};

    utils.forEachText((text, format, name) => {
      it(`${format}:${name}`, () => {

        const possibilities = nx.parse(text, options);
        _.each(possibilities, possibility => {
          expect(() => nx.detect.as.notatrixSerial(possibility)).to.not.throw();
        });

      });
    });
  });
  */

});
