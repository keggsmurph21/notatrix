'use strict';

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

};
