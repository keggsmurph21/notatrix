'use strict';

function combine(arr, k) {

  if (k > arr.length || k <= 0)
    return [];

  if (k === arr.length)
    return [arr];

  if (k === 1)
    return arr.map(e => [e]);

  let combs = [];
  for (let i = 0; i < arr.length - k + 1; i++) {

    const head = arr.slice(i, i+1);
    const tailCombs = combine(arr.slice(i+1), k-1);
    tailCombs.forEach(tailComb => {
      combs.push(head.concat(tailComb));
    });

  }
  return combs;
}

module.exports = {

  isJSONSerializable: obj => {

    if (typeof obj === 'string') {

      try {
        JSON.parse(obj);
      } catch (e) {
        return false;
      }

    } else {

      try {
        JSON.stringify(obj);
      } catch (e) {
        return false;
      }

    }

    return true;
  },

  noop: arg => arg,

  thin: arg => !!arg ? arg : undefined,

  combine,

};
