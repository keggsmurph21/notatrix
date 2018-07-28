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
        let clean = str => utils.clean(str, []);
        switch (format) {
          case ('CoNLL-U'):
            clean = str => utils.clean(str, [
              utils.spacesToTabs,
              line => line.trim(),
            ]);
            break;
          case ('CG3'):
            clean = str => utils.clean(str, [
              utils.spacesToTabs,
            ]);
            break;
          case ('Params'):
            clean = obj => obj.forEach(token => _.omit(token, 'index'));
            break;
          case ('plain text'):
            clean = str => str.trim();
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
          case ('CG3:nested'):
          case ('CG3:with_semicolumn'):
          case ('CG3:apertium_kaz_1'):
          case ('CG3:apertium_kaz_2'):
            options.omitIndices = true;
            break;
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
          case ('CoNLL-U:ud_example_tabs'):
            options.depsShowDeprel = true;
            break;
        }

        const sent = new nx.Sentence(text, options);
        const generated = nx.generate[format](sent, options);
        const detected = nx.detect.as[format](generated);

        expect(detected).to.equal(format);
        expect(clean(generated)).to.equal(clean(text));

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
