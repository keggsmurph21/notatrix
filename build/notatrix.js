(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nx = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
//     Underscore.js 1.9.1
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            this ||
            {};

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for their old module API. If we're in
  // the browser, add `_` as a global object.
  // (`nodeType` is checked to ensure that `module`
  // and `exports` are not HTML elements.)
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.9.1';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-argument case is omitted because we’re not using it.
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  var builtinIteratee;

  // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `identity`,
  // an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
    return _.property(value);
  };

  // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only argCount argument.
  _.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // Some functions take a variable number of arguments, or a few expected
  // arguments at the beginning and then a variable number of values to operate
  // on. This helper accumulates all remaining arguments past the function’s
  // argument length (or an explicit `startIndex`), into an array that becomes
  // the last argument. Similar to ES6’s "rest parameter".
  var restArguments = function(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var shallowProperty = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  var has = function(obj, path) {
    return obj != null && hasOwnProperty.call(obj, path);
  }

  var deepGet = function(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = shallowProperty('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  var createReduce = function(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if (!initial) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = restArguments(function(obj, path, args) {
    var contextPath, func;
    if (_.isFunction(path)) {
      func = path;
    } else if (_.isArray(path)) {
      contextPath = path.slice(0, -1);
      path = path[path.length - 1];
    }
    return _.map(obj, function(context) {
      var method = func;
      if (!method) {
        if (contextPath && contextPath.length) {
          context = deepGet(context, contextPath);
        }
        if (context == null) return void 0;
        method = context[path];
      }
      return method == null ? method : method.apply(context, args);
    });
  });

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection.
  _.shuffle = function(obj) {
    return _.sample(obj, Infinity);
  };

  // Sample **n** random values from a collection using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = _.random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }
    return sample.slice(0, n);
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior, partition) {
    return function(obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (has(result, key)) result[key]++; else result[key] = 1;
  });

  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (_.isString(obj)) {
      // Keep surrogate pair characters together
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null || array.length < 1) return n == null ? void 0 : [];
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null || array.length < 1) return n == null ? void 0 : [];
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, Boolean);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    output = output || [];
    var idx = output.length;
    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        // Flatten current level of array or arguments object.
        if (shallow) {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        } else {
          flatten(value, shallow, strict, output);
          idx = output.length;
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = restArguments(function(array, otherArrays) {
    return _.difference(array, otherArrays);
  });

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // The faster algorithm will not work with an iteratee if the iteratee
  // is not a one-to-one function, so providing an iteratee will disable
  // the faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted && !iteratee) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = restArguments(function(arrays) {
    return _.uniq(flatten(arrays, true, true));
  });

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = restArguments(function(array, rest) {
    rest = flatten(rest, true, true);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  });

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = restArguments(_.unzip);

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values. Passing by pairs is the reverse of _.pairs.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions.
  var createPredicateIndexFinder = function(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  };

  // Returns the first index on an array-like that passes a predicate test.
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions.
  var createIndexFinder = function(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Chunk a single array into multiple arrays, each containing `count` or fewer
  // items.
  _.chunk = function(array, count) {
    if (count == null || count < 1) return [];
    var result = [];
    var i = 0, length = array.length;
    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }
    return result;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments.
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = restArguments(function(func, context, args) {
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArguments(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder by default, allowing any combination of arguments to be
  // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
  _.partial = restArguments(function(func, boundArgs) {
    var placeholder = _.partial.placeholder;
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });

  _.partial.placeholder = _;

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = restArguments(function(obj, keys) {
    keys = flatten(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    while (index--) {
      var key = keys[index];
      obj[key] = _.bind(obj[key], obj);
    }
  });

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = restArguments(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArguments(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  _.restArguments = restArguments;

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  var collectNonEnumProps = function(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  };

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`.
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object.
  // In contrast to _.map it returns an object.
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = _.keys(obj),
        length = keys.length,
        results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  // The opposite of _.object.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`.
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test.
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Internal pick helper function to determine if `obj` has key `key`.
  var keyInObj = function(value, key, obj) {
    return key in obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = restArguments(function(obj, keys) {
    var result = {}, iteratee = keys[0];
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
      keys = _.allKeys(obj);
    } else {
      iteratee = keyInObj;
      keys = flatten(keys, false, false);
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  });

  // Return a copy of the object without the blacklisted properties.
  _.omit = restArguments(function(obj, keys) {
    var iteratee = keys[0], context;
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
      if (keys.length > 1) context = keys[1];
    } else {
      keys = _.map(flatten(keys, false, false), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  });

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq, deepEq;
  eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null) return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  };

  // Internal recursive comparison function for `isEqual`.
  deepEq = function(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
  var nodelist = root.document && root.document.childNodes;
  if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    return _.isNumber(obj) && isNaN(obj);
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, path) {
    if (!_.isArray(path)) {
      return has(obj, path);
    }
    var length = path.length;
    for (var i = 0; i < length; i++) {
      var key = path[i];
      if (obj == null || !hasOwnProperty.call(obj, key)) {
        return false;
      }
      obj = obj[key];
    }
    return !!length;
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  // Creates a function that, when passed an object, will traverse that object’s
  // properties down the given `path`, specified as an array of keys or indexes.
  _.property = function(path) {
    if (!_.isArray(path)) {
      return shallowProperty(path);
    }
    return function(obj) {
      return deepGet(obj, path);
    };
  };

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    if (obj == null) {
      return function(){};
    }
    return function(path) {
      return !_.isArray(path) ? obj[path] : deepGet(obj, path);
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

  // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // Traverses the children of `obj` along `path`. If a child is a function, it
  // is invoked with its parent as context. Returns the value of the final
  // child, or `fallback` if any child is undefined.
  _.result = function(obj, path, fallback) {
    if (!_.isArray(path)) path = [path];
    var length = path.length;
    if (!length) {
      return _.isFunction(fallback) ? fallback.call(obj) : fallback;
    }
    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];
      if (prop === void 0) {
        prop = fallback;
        i = length; // Ensure we don't continue iterating.
      }
      obj = _.isFunction(prop) ? prop.call(obj) : prop;
    }
    return obj;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var chainResult = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return chainResult(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return chainResult(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return String(this._wrapped);
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define == 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('underscore');

var NotatrixError = require('./errors').NotatrixError;

/**
 * convert a string to subscripts (for ele labels)
 *
 * @param {String} str string to be subscripted
 * @return {String}
 */
function toSubscript(str) {
  var subscripts = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅',
    6: '₆', 7: '₇', 8: '₈', 9: '₉', '-': '₋', '(': '₍', ')': '₎' };

  return str.split('').map(function (char) {
    return subscripts[char] || char;
  }).join('');
}

/**
 * strip whitespace from a string
 *
 * @param {String} str
 * @return {String}
 */
function sanitize(str) {
  return (str || '').replace(/\s/g, '');
}

/**
 * take a string possibly given in enhanced notation and extract the head
 *   and deprel
 *
 * e.g. `2:ccomp|3:nsubj` => `[
 *   { token: 2, deprel: 'ccomp' },
 *   { token: 3, deprel: 'nsubj' } ]`
 *
 * @param {String} str
 * @return {Array} [[Object]]
 */
function parseEnhancedString(str) {

  // strip whitespace in input
  str = sanitize(str);

  // keep our heads here
  var heads = [];

  // iterate over "|"-delimited chunks
  _.each(str.split('|'), function (head) {
    head = head.split(':');

    // ignore it if we don't parse a head
    if (head[0]) heads.push({
      token: head[0],
      deprel: head[1]
    });
  });
  return heads;
}

/**
 * automatically add PUNCT pos tags to strings that consist of only punctuation
 *
 * NOTE: only has an effect if sentence-level options help.upostag|help.xpostag
 *   are set to true (default: true)
 *
 * @param {Analysis} ana the analysis to evaluate for
 * @param {String} string
 * @return {undefined}
 */
function evaluatePunctPos(ana, string) {
  if (puncts.test(string)) {
    if (ana.sentence.options.help.upostag && !ana.upostag) ana.upostag = 'PUNCT';

    if (ana.sentence.options.help.xpostag && !ana.xpostag) ana.xpostag = 'PUNCT';
  }
}

/**
 * helper function for Analysis::cg3 [get] ... actually does the work of
 *   deciding how we want to display the information contained in an analysis
 *
 * @param {Analysis} ana
 * @param {Number} tabs current indent level
 * @return {String}
 */
function cg3FormatOutput(analysis, tabs) {

  var indent = new Array(tabs).fill('\t').join('');
  var tags = analysis.xpostag ? ' ' + analysis.xpostag.replace(/;/g, ' ') : '';
  var misc = analysis.misc ? ' ' + analysis.misc.replace(/;/g, ' ') : '';
  var deprel = analysis.deprel ? ' @' + analysis.deprel : '';
  var id = analysis.id ? ' #' + analysis.id + '->' : '';
  var head = id && analysis.head ? '' + analysis.head : '';
  var dependency = analysis.sentence.options.showEmptyDependencies || analysis.head ? '' + id + head : '';

  return indent + '"' + analysis.lemma + '"' + tags + misc + deprel + dependency;
}

// placeholder for CoNLL-U export in `undefined` fields
var fallback = '_';
// setteable fields
var fields = [
// NB: 'id' is not kept here
'form', 'lemma', 'upostag', 'xpostag', 'feats', 'head', 'deprel', 'deps', 'misc'];
// supported punctuation characters
var puncts = /[.,!?]/;

/**
 * this class contains all the information associated with an analysis, including
 *   a value for each of form, lemma, upostag, xpostag, feats, head, deprel,
 *   deps, & misc ... also keeps an array of subTokens and an index
 */

var Analysis = function () {
  function Analysis(token, params) {
    var _this = this;

    _classCallCheck(this, Analysis);

    // require token param
    if (!token) throw new NotatrixError('missing required arg: Token');

    // used to make sure we only add the head/deps strings on first pass, since
    //   we'll eventually call attach() whenever we're constructing like this
    this.initializing = true;

    // pointers to parents
    this.token = token;
    this.sentence = token.sentence;

    // internal arrays of Analyses
    this._heads = [];
    this._deps = [];

    // iterate over passed params
    _.each(params, function (value, key) {
      if (value === undefined || fields.indexOf(key) === -1) {
        // delete invalid parameters
        delete params[key];
      } else {
        // save valid ones (using our setters defined below)
        _this[key] = value;
      }
    });

    // save updated params (mostly for debugging purposes)
    this.params = params || {};

    // internal index (see Sentence::index and Token::index), don't change this!
    this.id = null;

    // array of Tokens
    this.subTokens = [];

    // safe to unset this now
    this.initializing = false;
  }

  /**
   * @return {Number} total number of subTokens for this analysis
   */


  _createClass(Analysis, [{
    key: 'getSubToken',


    // manipulate subTokens array

    /**
     * get subToken at the given index or null
     *
     * @param {Number} index
     * @return {(null|Token)}
     */
    value: function getSubToken(index) {
      return this.subTokens[index] || null;
    }

    /**
     * insert a subToken BEFORE the given index
     *
     * NOTE: if the index is out of bounds (<0 or >length), then it will be adjusted
     *   to fit the bounds. this means that you can call this with `index=-Infinity`
     *   to push to the front of the subTokens array or with `index=Infinity` to push
     *   to the end
     *
     * @param {Number} index
     * @param {Token} token
     * @return {Analysis}
     *
     * @throws {NotatrixError} if given invalid index or analysis (see below)
     */

  }, {
    key: 'insertSubTokenAt',
    value: function insertSubTokenAt(index, token) {

      // enforce only indices that can be cast as Numbers
      index = parseFloat(index); // catch Infinity
      if (isNaN(index)) throw new NotatrixError('unable to insert subToken: unable to cast index to int');

      // enforce token is a Token
      if (!token) throw new NotatrixError('unable to insert subToken: no subToken provided');

      // enforce token is a Token
      if (token.__proto__ !== this.token.__proto__) // hacky, but don't have access to Token class
        throw new NotatrixError('unable to insert subToken: not instance of Token');

      // enforce not trying to add a superToken as a subToken
      if (token.isSuperToken) throw new NotatrixError('unable to insert subToken: token has subTokens');

      // enforce not trying to add a subToken of some other token
      if (token.isSubToken) throw new NotatrixError('unable to insert subToken: token is already a subToken');

      // enforce not trying to add a subToken to a subToken
      if (this.isSubToken) throw new NotatrixError('unable to insert subToken: this is already a subToken');

      // bounds checking
      index = index < 0 ? 0 : index > this.length ? this.length : parseInt(index);

      // set the superToken pointer on the token
      token.superToken = this;

      // array insertion
      this.subTokens = this.subTokens.slice(0, index).concat(token).concat(this.subTokens.slice(index));

      // chaining
      return this;
    }

    /**
     * remove a subToken at the given index
     *
     * NOTE: if the index is out of bounds (<0 or >length - 1), then it will be
     *   adjusted to fit the bounds. this means that you can call this with
     *   `index=-Infinity` to remove the first element of the subTokens array or
     *   with `index=Infinity` to remove the last
     *
     * @param {Number} index
     * @return {(null|Token)}
     *
     * @throws {NotatrixError} if given invalid index
     */

  }, {
    key: 'removeSubTokenAt',
    value: function removeSubTokenAt(index) {
      var _this2 = this;

      // can't remove if we have an empty array
      if (!this.length) return null;

      index = parseFloat(index); // catch Infinity
      if (isNaN(index)) throw new NotatrixError('unable to remove subToken: unable to cast index to int');

      // bounds checking
      index = index < 0 ? 0 : index > this.length - 1 ? this.length - 1 : parseInt(index);

      // unlink heads and deps from the token to be removed
      this.sentence.forEach(function (token) {
        token.analysis.eachHead(function (head) {
          if (head === _this2[index]) token.analysis.removeHead(head);
        }).eachDep(function (dep) {
          if (dep === _this2[index]) token.analysis.removeDep(dep);
        });
      });

      // remove the superToken pointer from the removed token
      this.subTokens[index].superToken = null;

      // array splicing, return spliced element
      return this.subTokens.splice(index, 1)[0];
    }

    /**
     * move a subToken from sourceIndex to targetIndex
     *
     * NOTE: if either index is out of bounds (<0 or >length - 1), then it will
     *   be adjusted to fit the bounds. this means that you can call this with
     *   `sourceIndex=-Infinity` to select the first element of the subTokens array
     *   or with `sourceIndex=Infinity` to select the last
     *
     * @param {Number} sourceIndex
     * @param {Number} targetIndex
     * @return {Analysis}
     *
     * @throws {NotatrixError} if given invalid sourceIndex or targetIndex
     */

  }, {
    key: 'moveSubTokenAt',
    value: function moveSubTokenAt(sourceIndex, targetIndex) {

      sourceIndex = parseFloat(sourceIndex);
      targetIndex = parseFloat(targetIndex);
      if (isNaN(sourceIndex) || isNaN(targetIndex)) throw new NotatrixError('unable to move subToken: unable to cast indices to ints');

      // bounds checking
      sourceIndex = sourceIndex < 0 ? 0 : sourceIndex > this.length - 1 ? this.length - 1 : parseInt(sourceIndex);
      targetIndex = targetIndex < 0 ? 0 : targetIndex > this.length - 1 ? this.length - 1 : parseInt(targetIndex);

      if (sourceIndex === targetIndex) {
        // do nothing
      } else {

        // array splice and insert
        var subToken = this.subTokens.splice(sourceIndex, 1);
        this.subTokens = this.subTokens.slice(0, targetIndex).concat(subToken).concat(this.subTokens.slice(targetIndex));
      }

      // chaining
      return this;
    }

    /**
     * push a subToken to the end of the subTokens array ... sugar for
     *   Analysis::insertSubTokenAt(Infinity, analysis)
     *
     * @param {Token} token
     * @return {Analysis}
     */

  }, {
    key: 'pushSubToken',
    value: function pushSubToken(token) {
      return this.insertSubTokenAt(Infinity, token);
    }

    /**
     * pop a subToken from the end of the subTokens array ... sugar for
     *   Analysis::removeSubTokenAt(Infinity)
     *
     * @return {(null|Analysis)}
     */

  }, {
    key: 'popSubToken',
    value: function popSubToken() {
      return this.removeSubTokenAt(Infinity);
    }

    // external formats

    /**
     * get a serial version of the internal analysis representation
     *
     * @return {Object}
     */

  }, {
    key: 'eachHead',


    // array-field (heads & deps) manipulators

    /**
     * iterate over the `head`s for this analysis and apply a callback to each
     *
     * @param {Function} callback
     * @return {Analysis}
     */
    value: function eachHead(callback) {
      _.each(this._heads, function (head, i) {
        callback(head.token, head.deprel, i);
      });

      // chaining
      return this;
    }

    /**
     * add a head on the given token with a dependency relation
     *
     * @param {Analysis} head pointer directly to the analysis
     * @param {String} deprel
     * @return {Analysis}
     */

  }, {
    key: 'addHead',
    value: function addHead(head, deprel) {
      if (!(head instanceof Analysis)) throw new NotatrixError('can\'t add head: not Analysis instance');

      // first try to change an existing one (don't want duplicate heads)
      if (this.changeHead(head, deprel)) return this;

      // get rid of "empty" value
      if (this._heads.length === 1 && this._heads[0].token === '_') this._heads = [];

      // otherwise push a new one
      this._heads.push({
        token: head,
        deprel: deprel
      });

      // if applicable, add to the head's deps field too
      if (this.sentence.options.help.head) head._deps.push({
        token: this,
        deprel: deprel
      });

      // chaining
      return this;
    }

    /**
     * remove a head from the given analysis if it exists
     *
     * @param {Analysis} head
     * @return {Analysis}
     */

  }, {
    key: 'removeHead',
    value: function removeHead(head) {
      var _this3 = this;

      if (!(head instanceof Analysis)) throw new NotatrixError('can\'t remove head: not Analysis instance');

      // remove from _heads
      var removing = -1;
      this.eachHead(function (token, deprel, i) {
        if (token === head) removing = i;
      });
      if (removing > -1) this._heads.splice(removing, 1);

      // if applicable, also remove from head's _deps
      removing = -1;
      if (this.sentence.options.help.head) head.eachDep(function (token, deprel, i) {
        if (token === _this3) removing = i;
      });
      if (removing > -1) head._deps.splice(removing, 1);

      // chaining
      return this;
    }

    /**
     * change the dependency relation for a given head ... returns null if unable
     *   to make the change
     *
     * @param {Analysis} head
     * @param {String} deprel
     * @return {(Analysis|null)}
     */

  }, {
    key: 'changeHead',
    value: function changeHead(head, deprel) {
      var _this4 = this;

      if (!(head instanceof Analysis)) throw new NotatrixError('can\'t change head: not Analysis instance');

      // change for this head
      var done = false;
      this.eachHead(function (token, _deprel, i) {
        if (token === head) {
          _this4._heads[i].deprel = deprel || _deprel;
          done = true;
        }
      });

      // if applicable, change for the head's dep too
      if (this.sentence.options.help.head) head.eachDep(function (token, _deprel, i) {
        if (token === _this4) head._deps[i].deprel = deprel || _deprel;
      });

      return done ? this : null;
    }

    /**
     * iterate over the `deps`s for this analysis and apply a callback to each
     *
     * @param {Function} callback
     * @return {Analysis}
     */

  }, {
    key: 'eachDep',
    value: function eachDep(callback) {
      _.each(this._deps, function (dep, i) {
        callback(dep.token, dep.deprel, i);
      });

      // chaining
      return this;
    }

    /**
     * add a dep on the given token with a dependency relation
     *
     * @param {Analysis} dep pointer directly to the analysis
     * @param {String} deprel
     * @return {Analysis}
     */

  }, {
    key: 'addDep',
    value: function addDep(dep, deprel) {
      if (!(dep instanceof Analysis)) throw new NotatrixError('can\'t add dep: not Analysis instance');

      // first try to change an existing one (don't want duplicate deps)
      if (this.changeDep(dep, deprel)) return this;

      // get rid of "empty" value
      if (this._deps.length === 1 && this._deps[0].token === '_') this._deps = [];

      // otherwise push a new one
      this._deps.push({
        token: dep,
        deprel: deprel
      });

      // if applicable, add to the dep's head field too
      if (this.sentence.options.help.deps) dep._heads.push({
        token: this,
        deprel: deprel
      });

      // chaining
      return this;
    }

    /**
     * remove a dep from the given analysis if it exists
     *
     * @param {Analysis} dep
     * @return {Analysis}
     */

  }, {
    key: 'removeDep',
    value: function removeDep(dep) {
      var _this5 = this;

      if (!(dep instanceof Analysis)) throw new NotatrixError('can\'t remove dep: not Analysis instance');

      // remove from _deps
      var removing = -1;
      this.eachDep(function (token, deprel, i) {
        if (token === dep) removing = i;
      });
      if (removing > -1) this._deps.splice(removing, 1);

      // if applicable, also remove from dep's _heads
      removing = -1;
      if (this.sentence.options.help.deps) dep.eachHead(function (token, deprel, i) {
        if (token === _this5) removing = i;
      });
      if (removing > -1) dep._heads.splice(removing, 1);

      // chaining
      return this;
    }

    /**
     * change the dependency relation for a given dep ... returns null if unable
     *   to make the change
     *
     * @param {Analysis} dep
     * @param {String} deprel
     * @return {(Analysis|null)}
     */

  }, {
    key: 'changeDep',
    value: function changeDep(dep, deprel) {
      var _this6 = this;

      if (!(dep instanceof Analysis)) throw new NotatrixError('can\'t change dep: not Analysis instance');

      // change for this dep
      var done = false;
      this.eachDep(function (token, _deprel, i) {
        if (token === dep) {
          _this6._deps[i].deprel = deprel || _deprel;
          done = true;
        }
      });

      // if applicable, change for the dep's head too
      if (this.sentence.options.help.deps) dep.eachHead(function (token, _deprel, i) {
        if (token === _this6) dep._heads[i].deprel = deprel || _deprel;
      });

      return done ? this : null;
    }

    // field getters and setters

    /**
     * get the `form` ... if none defined, `help.form` setting `= true` (default:
     *   `true`), and `lemma` is set, return `lemma` instead
     *
     * @return {(String|undefined)}
     */

  }, {
    key: 'length',
    get: function get() {
      return this.subTokens.length;
    }
  }, {
    key: 'nx',
    get: function get() {
      var _this7 = this;

      // serialize "values" (getter/setter version of fields)
      var values = {};
      _.each(fields, function (field) {
        values[field] = _this7[field];
      });

      // serialize other data
      return {
        id: this.id,
        num: this.num,
        params: this.params,
        values: values,
        subTokens: this.subTokens.map(function (subToken) {
          return subToken.nx;
        })
      };
    }

    /**
     * get a plain-text formatted string of the analysis
     *
     * @return {String}
     */

  }, {
    key: 'text',
    get: function get() {

      // first check if we have a form
      if (this.form && this.form !== fallback) return this.form;

      // fall back to using lemma
      if (this.lemma && this.lemma !== fallback) return this.lemma;

      // if set, fall back to our fallback (defined above)
      if (this.sentence.fallbackOnText) return fallback;

      // otherwise just give an empty string
      return '';
    }

    /**
     * get a CoNLL-U formatted string representing the analysis
     *
     * @return {String}
     *
     * @throws {NotatrixError} if id has not been set
     */

  }, {
    key: 'conllu',
    get: function get() {
      var _this8 = this;

      // reindex just in case since this is crucial
      this.sentence.index();

      // we can't output CoNLL-U for analyses that aren't indexed, since that
      //   means they're not in the current analysis
      if (this.id === null || this.id === undefined) throw new NotatrixError('analysis is not currently indexed');

      // return a tab-delimited string with the information contained in each field
      //   and the index out front
      return this.id + '\t' + _.map(fields, function (field) {

        // if we have no data for a field, use our fallback to maintain
        //   the correct matrix structure
        return _this8[field] || fallback;
      }).join('\t');
    }

    /**
     * get a CG3 formatted string representing the analysis
     *
     * @return {String}
     */

  }, {
    key: 'cg3',
    get: function get() {

      // reindex just in case since this is crucial
      this.sentence.index();

      // either output this analysis or its subTokens
      if (this.isSuperToken) {
        return this.subTokens.map(function (subToken, i) {

          // recall subTokens get hanging indents
          return cg3FormatOutput(subToken.analysis, i + 1);
        }).join('\n');
      } else {

        // regular tokens get an index of 1
        return cg3FormatOutput(this, 1);
      }
    }

    /**
     * get an array of nodes relating to this analysis for export to an external
     *   graphing library (e.g. Cytoscape, D3)
     *
     * @return {Array}
     */

  }, {
    key: 'eles',
    get: function get() {
      var _this9 = this;

      var eles = [];

      if (this.isCurrent) {

        if (this.isSuperToken) {

          eles.push({ // multiword label
            data: {
              id: 'multiword-' + this.id,
              num: this.num,
              clump: this.clump,
              name: 'multiword',
              label: this.form + ' ' + toSubscript(this.id)
              /*length: `${this.form.length > 3
                ? this.form.length * 0.7
                : this.form.length}em`*/
            },
            classes: 'multiword' /*, {
                                 } */ });

          _.each(this.subTokens, function (subToken) {
            eles = eles.concat(subToken.eles);
          });
        } else {

          eles.push({ // "number" node
            data: {
              id: 'num-' + this.id,
              num: this.num,
              clump: this.clump,
              name: 'number',
              label: this.id,
              pos: this.pos,
              parent: this.superToken ? 'multiword-' + this.superToken.id : undefined,
              analysis: this
            },
            classes: 'number'
          }, { // "form" node
            data: {
              id: 'form-' + this.id,
              num: this.num,
              clump: this.clump,
              name: 'form',
              attr: 'form',
              form: this.form,
              label: this.form,
              length: (this.form.length > 3 ? this.form.length * 0.7 : this.form.length) + 'em',
              state: 'normal',
              parent: 'num-' + this.id,
              analysis: this
            },
            classes: 'form' + (this.head == 0 ? ' root' : '')
          }, { // "pos" node
            data: {
              id: 'pos-node-' + this.id,
              num: this.num,
              clump: this.clump,
              name: 'pos-node',
              attr: 'upostag',
              label: this.pos || '',
              length: (this.pos || '').length * 0.7 + 1 + 'em',
              analysis: this
            },
            classes: 'pos'
          }, { // "pos" edge
            data: {
              id: 'pos-edge-' + this.id,
              num: this.num,
              clump: this.clump,
              name: 'pos-edge',
              source: 'form-' + this.id,
              target: 'pos-node-' + this.id
            },
            classes: 'pos'
          });

          this.eachHead(function (head, deprel) {
            deprel = deprel || '';

            if (!head || !head.id) // ROOT
              return;

            eles.push({
              data: {
                id: 'dep_' + _this9.id + '_' + head.id,
                name: 'dependency',
                attr: 'deprel',
                source: 'form-' + _this9.id,
                sourceAnalysis: _this9,
                target: 'form-' + head.id,
                targetAnalysis: head,
                length: deprel.length / 3 + 'em',
                label: null, // NB overwrite this before use
                ctrl: null // NB overwrite this before use
              },
              classes: null // NB overwrite this before use
            });
          });
        }
      }

      return eles;
    }
  }, {
    key: 'form',
    get: function get() {
      return this.sentence.options.help.form ? this._form || this._lemma : this._form;
    }

    /**
     * set the `form` ... if the form is just punctuation, possibly set the pos tags
     *   to `PUNCT` (see {@link evaluatePunctPos})
     *
     * @return {undefined}
     */
    ,
    set: function set(form) {
      form = sanitize(form);
      evaluatePunctPos(this, form);
      this._form = form;
    }

    /**
     * get the `lemma` ... if none defined, `help.lemma` setting `= true` (default:
     *   `true`), and `form` is set, return `form` instead
     *
     * @return {(String|undefined)}
     */

  }, {
    key: 'lemma',
    get: function get() {
      return this.isSuperToken ? null : this.sentence.options.help.lemma ? this._lemma || this._form : this._lemma;
    }

    /**
     * set the `lemma` ... if the lemma is just punctuation, possibly set the pos tags
     *   to `PUNCT` (see {@link evaluatePunctPos})
     *
     * @return {undefined}
     */
    ,
    set: function set(lemma) {
      lemma = sanitize(lemma);
      evaluatePunctPos(this, lemma);
      this._lemma = lemma;
    }

    /**
     * get the `pos`, which is just `upostag || xpostag`
     *
     * @return {(String|undefined)}
     */

  }, {
    key: 'pos',
    get: function get() {
      return this.upostag || this.xpostag;
    }

    /**
     * get the `upostag`
     *
     * @return {(String|undefined)}
     */

  }, {
    key: 'upostag',
    get: function get() {
      return this.isSuperToken ? null : this._upostag;
    }

    /**
     * set the `upostag`
     *
     * @return {undefined}
     */
    ,
    set: function set(upostag) {
      this._upostag = sanitize(upostag);
    }

    /**
     * get the `xpostag`
     *
     * @return {(String|undefined)}
     */

  }, {
    key: 'xpostag',
    get: function get() {
      return this.isSuperToken ? null : this._xpostag;
    }

    /**
     * set the `xpostag`
     *
     * @return {undefined}
     */
    ,
    set: function set(xpostag) {
      this._xpostag = sanitize(xpostag);
    }

    /**
     * get the `feats`
     *
     * @return {(String|undefined)}
     */

  }, {
    key: 'feats',
    get: function get() {
      return this.isSuperToken ? null : this._feats;
    }

    /**
     * set the `feats`
     *
     * @return {undefined}
     */
    ,
    set: function set(feats) {
      this._feats = sanitize(feats);
    }

    /**
     * get the `head` ... if the `showEnhanced` setting `= true` (default: `true`)
     *   will return a `|`-delimited list of `index`:`deprel` pairs
     *
     * @return {(String)}
     */

  }, {
    key: 'head',
    get: function get() {
      var _this10 = this;

      if (this.isSuperToken) return null;

      if (this.sentence.options.showEnhanced) {
        var heads = [];
        this.eachHead(function (token, deprel) {
          if (token === _this10.sentence.getById(token.id) || !_this10.sentence.options.help.head) {
            heads.push('' + (token.id || token) + (deprel ? ':' + deprel : ''));
          } else {
            heads.push('' + token + (deprel ? ':' + deprel : ''));
          }
        });
        return heads.join('|') || null;
      } else {
        return this._heads.length ? this._heads[0].id || this._heads[0] : null;
      }
    }

    /**
     * set the `head` ... if the `Analysis` is `initializing`, just save a plain
     *   string, otherwise try to get the head by index (see {@link Sentence#getById})
     *
     * @return {undefined}
     */
    ,
    set: function set(heads) {
      var _this11 = this;

      heads = heads || [];
      if (typeof heads === 'string') heads = parseEnhancedString(heads);

      this._heads = heads.map(function (head) {
        return _this11.initializing ? {
          token: head.token,
          deprel: head.deprel
        } : {
          token: _this11.sentence.getById(head.token) || head.token,
          deprel: head.deprel
        };
      }).filter(function (head) {
        if (head.token !== fallback) return head;
      });
    }

    /**
     * get the `deprel`
     *
     * @return {(String|undefined)}
     */

  }, {
    key: 'deprel',
    get: function get() {
      return this.isSuperToken ? null : this._deprel;
    }

    /**
     * set the `deprel`
     *
     * @return {undefined}
     */
    ,
    set: function set(deprel) {
      this._deprel = sanitize(deprel);
    }

    /**
     * get the `deps` returns a `|`-delimited list of `index`:`deprel` pairs
     *
     * @return {(String)}
     */

  }, {
    key: 'deps',
    get: function get() {
      var _this12 = this;

      if (this.isSuperToken) return null;

      // don't worry about enhanced stuff for deps (always can be multiple)
      var deps = [];
      this.eachDep(function (token, deprel) {
        if (token === _this12.sentence.getById(token.id) || !_this12.sentence.options.help.deps) {
          deps.push('' + (token.id || token) + (deprel ? ':' + deprel : ''));
        } else {
          deps.push('' + token + (deprel ? ':' + deprel : ''));
        }
      });
      return deps.join('|') || null;
    }

    /**
     * set the `deps` ... if the `Analysis` is `initializing`, just save a plain
     *   string, otherwise try to get the dep by index (see {@link Sentence#getById})
     *
     * @return {undefined}
     */
    ,
    set: function set(deps) {
      var _this13 = this;

      deps = deps || [];
      if (typeof deps === 'string') deps = parseEnhancedString(deps);

      this._deps = deps.map(function (dep) {
        return _this13.initializing ? {
          token: dep.token,
          deprel: dep.deprel
        } : {
          token: _this13.sentence.getById(dep.token) || dep.token,
          deprel: dep.deprel
        };
      }).filter(function (dep) {
        if (dep.token !== fallback) return dep;
      });
    }

    /**
     * get the `misc`
     *
     * @return {(String|undefined)}
     */

  }, {
    key: 'misc',
    get: function get() {
      // superTokens can have "misc" field
      return this._misc;
    }

    /**
     * set the `misc`
     *
     * @return {undefined}
     */
    ,
    set: function set(misc) {
      this._misc = sanitize(misc);
    }

    // bool stuff

    /**
     * returns this analysis's superToken if it exists
     *
     * @return {(Token|null)}
     */

  }, {
    key: 'superToken',
    get: function get() {
      return this.token.superToken;
    }

    /**
     * returns true iff this analysis is a subToken of some other token
     *
     * @return {Boolean}
     */

  }, {
    key: 'isSubToken',
    get: function get() {
      return this.superToken !== null;
    }

    /**
     * returns true iff this analysis has subTokens
     *
     * @return {Boolean}
     */

  }, {
    key: 'isSuperToken',
    get: function get() {
      return this.subTokens.length > 0;
    }

    /**
     * returns true iff this analysis is the current analysis
     *
     * @return {Boolean}
     */

  }, {
    key: 'isCurrent',
    get: function get() {
      return this.token.analysis === this;
    }
  }]);

  return Analysis;
}();

/**
 * Proxy so that we can get subTokens using Array-like syntax
 *
 * NOTE: usage: `ana[8]` would return the analysis of the subToken at index 8
 * NOTE: if `name` is not a Number, fall through to normal object
 *
 * @return {Mixed}
 * @name Analysis#get
 */


Analysis.prototype.__proto__ = new Proxy(Analysis.prototype.__proto__, {

  // default getter, called any time we use Analysis.name or Analysis[name]
  get: function get(target, name, receiver) {

    // Symbols can't be cast to floats, so check here to avoid errors
    if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'symbol') return this[name];

    // cast, catch Infinity
    var id = parseFloat(name);
    if (!isNaN(id)) {

      // if we got a number, return analysis of subToken at that index
      id = parseInt(id);
      var token = receiver.subTokens[id];
      return token ? token.analysis : null;
    } else {

      // fall through to normal getting
      return this[name];
    }
  }
});

// expose to application
module.exports = Analysis;

},{"./errors":3,"underscore":1}],3:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotatrixError = function (_Error) {
  _inherits(NotatrixError, _Error);

  function NotatrixError() {
    var _ref;

    _classCallCheck(this, NotatrixError);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = NotatrixError.__proto__ || Object.getPrototypeOf(NotatrixError)).call.apply(_ref, [this].concat(args)));
  }

  return NotatrixError;
}(Error);

var InvalidCG3Error = function (_NotatrixError) {
  _inherits(InvalidCG3Error, _NotatrixError);

  function InvalidCG3Error() {
    var _ref2;

    _classCallCheck(this, InvalidCG3Error);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _possibleConstructorReturn(this, (_ref2 = InvalidCG3Error.__proto__ || Object.getPrototypeOf(InvalidCG3Error)).call.apply(_ref2, [this].concat(args)));
  }

  return InvalidCG3Error;
}(NotatrixError);

var InvalidCoNLLUError = function (_NotatrixError2) {
  _inherits(InvalidCoNLLUError, _NotatrixError2);

  function InvalidCoNLLUError() {
    var _ref3;

    _classCallCheck(this, InvalidCoNLLUError);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _possibleConstructorReturn(this, (_ref3 = InvalidCoNLLUError.__proto__ || Object.getPrototypeOf(InvalidCoNLLUError)).call.apply(_ref3, [this].concat(args)));
  }

  return InvalidCoNLLUError;
}(NotatrixError);

var TransformationError = function (_NotatrixError3) {
  _inherits(TransformationError, _NotatrixError3);

  function TransformationError() {
    var _ref4;

    _classCallCheck(this, TransformationError);

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return _possibleConstructorReturn(this, (_ref4 = TransformationError.__proto__ || Object.getPrototypeOf(TransformationError)).call.apply(_ref4, [this].concat(args)));
  }

  return TransformationError;
}(NotatrixError);

module.exports = {

  NotatrixError: NotatrixError,
  InvalidCG3Error: InvalidCG3Error,
  InvalidCoNLLUError: InvalidCoNLLUError,
  TransformationError: TransformationError

};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = {

  Error: require('./errors'),
  Sentence: require('./sentence'),
  Token: require('./token'),
  Analysis: require('./analysis')

};

},{"./analysis":2,"./errors":3,"./sentence":5,"./token":6}],5:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('underscore');

var NotatrixError = require('./errors').NotatrixError;
var InvalidCG3Error = require('./errors').InvalidCG3Error;
var InvalidCoNLLUError = require('./errors').InvalidCoNLLUError;

var Token = require('./token');
var Analysis = require('./analysis');

// define all the regex we use in this module here
var regex = {
  comment: /^\W*\#/,
  commentContent: /^\W*\#\W*(.*)/,
  superToken: /^\W*[0-9.]+\-[0-9.]+/,
  empty: /^\W*[0-9]+\.[0-9]+/,
  cg3TokenStart: /^"<(.|\\")*>"/,
  cg3TokenContent: /^;?\s+"(.|\\")*"/

  /**
   * this class contains all the information associated with a sentence, including
   *   an comments array, a tokens array, and a list of options/settings that apply
   *   to all subelements of this sentence
   */
};
var Sentence = function () {
  function Sentence(paramsList, options) {
    _classCallCheck(this, Sentence);

    // handle only receiving one arg better
    if (options === undefined && !Array.isArray(paramsList)) {
      options = paramsList;
      paramsList = undefined;
    }

    // save sentence-wide settings here
    this.options = _.defaults(options, {
      help: {
        form: true,
        lemma: true,
        upostag: true,
        xpostag: true,
        head: true,
        deps: true
      },
      prettyOutput: true,
      showEnhanced: true,
      showEmptyDependencies: true,
      catchInvalid: true,
      fallbackOnText: false
    });

    // the actual data
    this.comments = [];
    this.tokens = [];

    // try parsing a list of parameters
    if (paramsList) this.params = paramsList;
  }
  /**
   * @return {Number} total number of tokens/subTokens in this sentence
   */


  _createClass(Sentence, [{
    key: 'forEach',

    /**
     * loop through every token in the sentence and apply a callback
     *
     * @param {Function} callback function to be applied to every token
     * @return {Sentence}
     */
    value: function forEach(callback) {

      var t = 0;
      for (var i = 0; i < this.tokens.length; i++) {
        var token = this.tokens[i];
        callback(token, t);
        t++;
        for (var j = 0; j < token.subTokens.length; j++) {
          callback(token.subTokens[j], t);
          t++;
        }
      }

      // chaining
      return this;
    }
    /**
     * loop through the tokens in the sentence and return the superToken and
     *   subToken indices
     * @param {Token} tok token to search for
     * @return {(Object|null)}
     */

  }, {
    key: 'getIndices',
    value: function getIndices(tok) {

      var superTokenId = -1,
          subTokenId = -1,
          analysisId = 0,
          found = false,
          isSubToken = false;

      tok.sentence.forEach(function (token) {

        if (found) return;

        if (token.isSubToken) {
          subTokenId++;
          isSubToken = true;
        } else {
          superTokenId++;
          subTokenId = -1;
          isSubToken = false;
        }

        if (token === tok) found = true;
      });

      return superTokenId === -1 ? null : {
        super: superTokenId,
        sub: isSubToken ? subTokenId : null
      };
    }

    /**
     * return the comment at the given index, or null
     *
     * @param {Number} index
     * @return {(String|null)}
     */

  }, {
    key: 'getComment',
    value: function getComment(index) {
      return this.comments[index] || null;
    }

    /**
     * return the token at the given index (note: this is regular token OR subToken),
     *   or null.  to choose by superToken index, use Sentence[index] syntax.  this
     *   function assumes only the current analysis is desired.
     *
     * @param {Number} index
     * @return {(Token|null)}
     */

  }, {
    key: 'getToken',
    value: function getToken(index) {
      var t = 0,
          token = null;
      this.forEach(function (tok, t) {
        if (t === index) token = tok;
      });
      return token;
    }

    /**
     * return the current analysis of the token that matches a given index string
     *
     * NOTE: tokens outside the current analysis will have id=null and cannot be retrieved
     *   with this function
     *
     * @param {String} index
     * @return {(Analysis|null)}
     */

  }, {
    key: 'getById',
    value: function getById(index) {
      for (var i = 0; i < this.tokens.length; i++) {
        var token = this.tokens[i];
        if (token.analysis.id == index) return token.analysis;
        for (var j = 0; j < token.subTokens.length; j++) {
          var subToken = token.subTokens[j];
          if (subToken.analysis.id == index) return subToken.analysis;
        }
      }
      return null;
    }

    // manipulate token array

    /**
     * insert a token AFTER the given token
     *
     * NOTE: if only passed 1 arg, it will insert a token constructed from
     *   the params { form: 'inserted' }
     *
     * @param {Token} atToken
     * @param {(Token|null)} newToken
     * @return {Sentence}
     *
     * @throws {NotatrixError} if given invalid token for first param
     */

  }, {
    key: 'insertTokenBefore',
    value: function insertTokenBefore(atToken, newToken) {

      if (!(atToken instanceof Token)) throw new NotatrixError('unable to insert token: not instance of Token');

      if (!(newToken instanceof Token)) newToken = Token.fromParams(this, { form: 'inserted' });

      var indices = this.getIndices(atToken);
      if (indices === null) return null;

      return indices.sub === null ? this.insertTokenAt(indices.super, newToken) : this[indices.super].insertSubTokenAt(indices.sub, newToken);
    }

    /**
     * insert a token AFTER the given token
     *
     * NOTE: if only passed 1 arg, it will insert a token constructed from
     *   the params { form: 'inserted' }
     *
     * @param {Token} atToken
     * @param {(Token|null)} newToken
     * @return {Sentence}
     *
     * @throws {NotatrixError} if given invalid token for first param
     */

  }, {
    key: 'insertTokenAfter',
    value: function insertTokenAfter(atToken, newToken) {

      if (!(atToken instanceof Token)) throw new NotatrixError('unable to insert token: not instance of Token');

      if (!(newToken instanceof Token)) newToken = Token.fromParams(this, { form: 'inserted' });

      var indices = this.getIndices(atToken);
      if (indices === null) return null;

      return indices.sub === null ? this.insertTokenAt(indices.super + 1, newToken) : this[indices.super].insertSubTokenAt(indices.sub + 1, newToken);
    }

    /**
     * insert an analysis BEFORE the given analysis
     *
     * NOTE: if only passed 1 arg, it will insert an analysis constructed from
     *   the params { form: 'inserted' }
     *
     * @param {Analysis} atAnalysis
     * @param {(Analysis|null)} newAnalysis
     * @return {Sentence}
     *
     * @throws {NotatrixError} if given invalid analysis for first param
     */

  }, {
    key: 'insertAnalysisBefore',
    value: function insertAnalysisBefore(atAnalysis, newAnalysis) {

      if (!(atAnalysis instanceof Analysis)) throw new NotatrixError('unable to insert analysis: not instance of Analysis');

      if (!(newAnalysis instanceof Analysis)) newAnalysis = Token.fromParams(this, { form: 'inserted' }).analysis;

      var indices = this.getIndices(atAnalysis.token);
      if (indices === null) return null;

      var token = indices.sub === null ? this[indices.super].token : this[indices.super][indices.sub].token;

      var analysisId = -1;
      token.forEach(function (ana, i) {
        if (ana === atAnalysis) analysisId = i;
      });

      if (analysisId > -1) return token.insertAnalysisAt(analysisId, newAnalysis);
    }

    /**
     * insert an analysis AFTER the given analysis
     *
     * NOTE: if only passed 1 arg, it will insert an analysis constructed from
     *   the params { form: 'inserted' }
     *
     * @param {Analysis} atAnalysis
     * @param {(Analysis|null)} newAnalysis
     * @return {Sentence}
     *
     * @throws {NotatrixError} if given invalid analysis for first param
     */

  }, {
    key: 'insertAnalysisAfter',
    value: function insertAnalysisAfter(atAnalysis, newAnalysis) {

      if (!(atAnalysis instanceof Analysis)) throw new NotatrixError('unable to insert analysis: not instance of Analysis');

      if (!(newAnalysis instanceof Analysis)) newAnalysis = Token.fromParams(this, { form: 'inserted' }).analysis;

      var indices = this.getIndices(atAnalysis.token);
      if (indices === null) return null;

      var token = indices.sub === null ? this[indices.super].token : this[indices.super][indices.sub].token;

      var analysisId = -1;
      token.forEach(function (ana, i) {
        if (ana === atAnalysis) analysisId = i;
      });

      if (analysisId > -1) return token.insertAnalysisAt(analysisId + 1, newAnalysis);
    }

    /**
     * insert a token BEFORE the given index
     *
     * NOTE: if the index is out of bounds (<0 or >length), then it will be adjusted
     *   to fit the bounds. this means that you can call this with `index=-Infinity`
     *   to push to the front of the tokens array or with `index=Infinity` to push
     *   to the end
     *
     * @param {Number} index
     * @param {Token} token
     * @return {Sentence}
     *
     * @throws {NotatrixError} if given invalid index or token
     */

  }, {
    key: 'insertTokenAt',
    value: function insertTokenAt(index, token) {
      index = parseFloat(index); // catch Infinity
      if (isNaN(index)) throw new NotatrixError('unable to insert token: unable to cast index to int');

      if (!(token instanceof Token)) throw new NotatrixError('unable to insert token: not instance of Token');

      // bounds checking
      index = index < 0 ? 0 : index > this.length ? this.length : parseInt(index);

      // array insertion
      this.tokens = this.tokens.slice(0, index).concat(token).concat(this.tokens.slice(index));

      // chaining
      return this;
    }

    /**
     * remove a token at the given index
     *
     * NOTE: if the index is out of bounds (<0 or >length - 1), then it will be
     *   adjusted to fit the bounds. this means that you can call this with
     *   `index=-Infinity` to remove the first element of the tokens array or
     *   with `index=Infinity` to remove the last
     *
     * @param {Number} index
     * @return {(Token|null)}
     *
     * @throws {NotatrixError} if given invalid index
     */

  }, {
    key: 'removeTokenAt',
    value: function removeTokenAt(index) {
      var _this = this;

      // can't remove if we have an empty sentence
      if (!this.tokens.length) return null;

      index = parseFloat(index); // catch Infinity
      if (isNaN(index)) throw new NotatrixError('unable to remove token: unable to cast index to int');

      // bounds checking
      index = index < 0 ? 0 : index > this.tokens.length - 1 ? this.tokens.length - 1 : parseInt(index);

      // unlink heads and deps from the token to be removed
      this.forEach(function (token) {
        token.analysis.eachHead(function (head) {
          if (head === _this[index]) token.analysis.removeHead(head);
        }).eachDep(function (dep) {
          if (dep === _this[index]) token.analysis.removeDep(dep);
        });
      });

      // array splicing, return spliced element
      return this.tokens.splice(index, 1)[0];
    }

    /**
     * move a token from sourceIndex to targetIndex
     *
     * NOTE: if either index is out of bounds (<0 or >length - 1), then it will
     *   be adjusted to fit the bounds. this means that you can call this with
     *   `sourceIndex=-Infinity` to select the first element of the tokens array
     *   or with `sourceIndex=Infinity` to select the last
     *
     * @param {Number} sourceIndex
     * @param {Number} targetIndex
     * @return {Sentence}
     *
     * @throws {NotatrixError} if given invalid sourceIndex or targetIndex
     */

  }, {
    key: 'moveTokenAt',
    value: function moveTokenAt(sourceIndex, targetIndex) {
      sourceIndex = parseFloat(sourceIndex);
      targetIndex = parseFloat(targetIndex);
      if (isNaN(sourceIndex) || isNaN(targetIndex)) throw new NotatrixError('unable to move token: unable to cast indices to ints');

      // bounds checking
      sourceIndex = sourceIndex < 0 ? 0 : sourceIndex > this.tokens.length - 1 ? this.tokens.length - 1 : parseInt(sourceIndex);
      targetIndex = targetIndex < 0 ? 0 : targetIndex > this.tokens.length - 1 ? this.tokens.length - 1 : parseInt(targetIndex);

      if (sourceIndex === targetIndex) {
        // do nothing
      } else {

        // array splice and insert
        var token = this.tokens.splice(sourceIndex, 1);
        this.tokens = this.tokens.slice(0, targetIndex).concat(token).concat(this.tokens.slice(targetIndex));
      }

      // chaining
      return this;
    }

    /**
     * push a token to the end of the tokens array ... sugar for
     *   Sentence::insertTokenAt(Infinity, token)
     *
     * @param {Token} token
     * @return {Sentence}
     */

  }, {
    key: 'pushToken',
    value: function pushToken(token) {
      return this.insertTokenAt(Infinity, token);
    }

    /**
     * pop a token from the end of the tokens array ... sugar for
     *   Sentence::removeTokenAt(Infinity)
     *
     * @return {(Token|null)}
     */

  }, {
    key: 'popToken',
    value: function popToken() {
      return this.removeTokenAt(Infinity);
    }

    // external formats

    /**
     * get a serial version of the internal sentence representation
     *
     * @return {String}
     */

  }, {
    key: 'clean',
    value: function clean() {
      throw new Error('Sentence::clean is not implemented'); // TODO
    }

    /**
     * iterate through the tokens and set an appropriate index for each (following
     *   CoNLL-U indexing scheme with, e.g. 1 for regular token, 1-2 for superToken,
     *   1.1 for "empty" token)
     *
     * @return {Sentence}
     */

  }, {
    key: 'index',
    value: function index() {
      // track "overall" index number (id) and "empty" index number and "absolute" num
      // NOTE: CoNLL-U indices start at 1 (0 is root), so we will increment this
      //   index before using it (see Token::index)
      var id = 0,
          empty = 0,
          num = 0,
          clump = 0;
      _.each(this.tokens, function (token) {
        var _token$index = token.index(id, empty, num, clump);
        // allow each token to return counters for the next guy


        var _token$index2 = _slicedToArray(_token$index, 4);

        id = _token$index2[0];
        empty = _token$index2[1];
        num = _token$index2[2];
        clump = _token$index2[3];
      });

      // chaining
      return this;
    }

    /**
     * iterate through the tokens and try to convert a plain string index to a
     *   head to the actual token given by that index (called after parsing
     *   CoNLL-U, CG3, or params)
     *
     * @return {Sentence}
     */

  }, {
    key: 'attach',
    value: function attach() {
      // reindex in case we're out of date (valid index is crucial here)
      this.index();
      this.forEach(function (token) {
        token.analysis.head = token.analysis.head;
        token.analysis.deps = token.analysis.deps;
      });

      // chaining
      return this;
    }

    /**
     * iterate through the tokens and determine if they could be converted into
     *   a CoNLL-U formatted string
     *
     * NOTE: currently, only returns false if it contains one/more ambiguous analyses
     *
     * @return {Boolean}
     */

  }, {
    key: 'length',
    get: function get() {

      var acc = 0;
      this.forEach(function (token) {
        acc++;
      });
      return acc;
    }
  }, {
    key: 'nx',
    get: function get() {
      // update indices
      this.index();

      // serialize tokens
      var tokens = [];
      for (var i = 0; i < this.tokens.length; i++) {
        tokens.push(this.tokens[i].nx);
      }

      // serialize other data
      return JSON.stringify({
        comments: this.comments,
        options: this.options,
        tokens: tokens
      }, null, this.options.prettyOutput ? 2 : 0);
    }

    /**
     * get a plain-text formatted string of the sentence's current analysis text
     *
     * @return {String}
     */

  }, {
    key: 'text',
    get: function get() {
      // only care about tokens (not comments or settings)
      var tokens = [];
      this.forEach(function (token) {
        if (!token.isSubToken && !token.isEmpty) tokens.push(token.text);
      });
      return tokens.join(' ');
    }

    /**
     * parse a Plain text formatted string and save its contents to the sentence
     *
     * @param {String} text
     * @return {String}
     */
    ,
    set: function set(text) {
      var _this2 = this;

      // insert a space before final punctuation
      text = text.trim().replace(/([.,?!]+)$/, ' $1');

      // split on whitespace and add form-only tokens
      _.map(text.split(/\s/), function (chunk) {
        _this2.pushToken(Token.fromParams(_this2, { form: chunk }));
      });

      return this.text;
    }

    /**
     * static method allowing us to construct a new Sentence directly from a
     *   text string
     *
     * @param {String} serial
     * @param {Object} options (optional)
     * @return {Sentence}
     */

  }, {
    key: 'conllu',


    /**
     * get a CoNLL-U formatted string representing the sentence's current analysis
     *
     * @return {(String|null)}
     */
    get: function get() {
      // comments first
      var comments = _.map(this.comments, function (comment) {
        return '# ' + comment;
      });

      try {

        var tokens = [];
        this.forEach(function (token) {
          tokens.push(token.conllu);
        });
        return comments.concat(tokens).join('\n');
      } catch (e) {

        // if the sentence contains ambiguous analyses, we will get an error,
        // so catch only those types of errors here
        if (!(e instanceof InvalidCoNLLUError) || !this.options.catchInvalid) throw e;

        // if sentence is ambiguous
        return null;
      }
    }

    /**
     * parse a CoNLL-U formatted string and save its contents to the sentence
     *
     * @param {String} conllu
     * @return {String}
     */
    ,
    set: function set(conllu) {
      // clear existing data
      this.comments = [];
      this.tokens = [];

      // split on newlines
      var lines = conllu.trim().split('\n');
      for (var i = 0; i < lines.length; i++) {

        // extract comments
        if (regex.comment.test(lines[i])) {
          this.comments.push(lines[i].match(regex.commentContent)[1]);

          // extract tokens
        } else if (regex.superToken.test(lines[i])) {

          // the top-level token
          var superToken = Token.fromConllu(this, lines[i]);

          // check which subTokens belong to this superToken
          var k = i;
          var subTokenIndices = lines[i].match(regex.superToken)[0].trim().split('-').map(function (str) {
            return parseInt(str);
          });

          // push them all to the superToken's current analysis
          for (var j = 0; j <= subTokenIndices[1] - subTokenIndices[0]; j++) {
            superToken.analysis.pushSubToken(Token.fromConllu(this, lines[j + k + 1]));
            i++;
          }

          // push the superToken to the sentence
          this.pushToken(superToken);
        } else {

          // regular (non-super) tokens pushed to sentence here
          if (lines[i].trim().length) this.pushToken(Token.fromConllu(this, lines[i]));
        }
      }

      // attach heads and return CoNLL-U string
      return this.attach().conllu;
    }

    /**
     * static method allowing us to construct a new Sentence directly from a
     *   CoNLL-U string
     *
     * @param {String} serial
     * @param {Object} options (optional)
     * @return {Sentence}
     */

  }, {
    key: 'cg3',


    /**
     * get a CG3 formatted string representing all of the sentence's analyses
     *
     * @return {(String|null)}
     */
    get: function get() {
      // comments first
      var comments = _.map(this.comments, function (comment) {
        return '# ' + comment;
      });

      try {

        var tokens = [];
        for (var i = 0; i < this.tokens.length; i++) {
          // iterate over superTokens
          tokens.push(this.tokens[i].cg3);
        }
        return comments.concat(tokens).join('\n');
      } catch (e) {

        // if the sentence is not analyzeable as CG3, we'll get an error
        // NOTE: this doesn't currently happen under any circumstances
        if (!(e instanceof InvalidCG3Error) || !this.options.catchInvalid) throw e;

        return null;
      }
    }

    /**
     * parse a CG3 formatted string and save its contents to the sentence
     *
     * @param {String} conllu
     * @return {String}
     */
    ,
    set: function set(cg3) {
      // clear existing data
      this.comments = [];
      this.tokens = [];

      // since this parsing is more complicated than CoNLL-U parsing, keep this
      //   array of lines for the current token we're parsing
      // NOTE: CG3 tokens are separated by lines of the form `/^"<EXAMPLE>"/`
      //   and lines beginning with one/more indent give data for that token
      var tokenLines = [];

      // split on newlines
      var lines = cg3.trim().split('\n');
      for (var i = 0; i < lines.length; i++) {

        // decide what the current line is
        var isToken = regex.cg3TokenStart.test(lines[i]);
        var isContent = regex.cg3TokenContent.test(lines[i]);

        // current line is the start of a new token
        if (isToken) {

          // if we already have stuff in our tokenLines buffer, parse it as a token
          if (tokenLines.length) this.tokens.push(Token.fromCG3(this, tokenLines));

          // reset tokenLines buffer
          tokenLines = [lines[i]];
        } else {

          // add content lines to tokenLines buffer
          if (tokenLines.length && isContent) {
            tokenLines.push(lines[i]);

            // push comment
          } else {
            this.comments.push(lines[i].match(regex.commentContent)[1]);
          }
        }
      }

      // clear tokenLines buffer
      if (tokenLines.length) this.tokens.push(Token.fromCG3(this, tokenLines));

      // attach heads and return CG3 string
      return this.attach().cg3;
    }

    /**
     * static method allowing us to construct a new Sentence directly from a
     *   CG3 string
     *
     * @param {String} serial
     * @param {Object} options (optional)
     * @return {Sentence}
     */

  }, {
    key: 'params',


    /**
     * get an array of token parameters representing the sentence
     *
     * NOTE: fails (returns null) if we have subTokens or ambiguous analyses
     *
     * @return {(Array|null)}
     */
    get: function get() {
      try {

        var params = [];
        this.forEach(function (token) {

          if (token.isSuperToken || token.isSubToken) throw new InvalidCoNLLUError();
          if (token.isAmbiguous) throw new InvalidCG3Error();

          params.push(token.params);
        });
        return params;
      } catch (e) {
        if (e instanceof InvalidCoNLLUError && this.options.catchInvalid) {
          console.warn('cannot get params for this sentence: contains MultiWordTokens');
          return null;
        } else if (e instanceof InvalidCG3Error && this.options.catchInvalid) {
          console.warn('cannot get params for this sentence: contains ambiguous analyses');
          return null;
        } else {
          // throw other errors
          throw e;
        }
      }
    }

    /**
     * parse an array of token parameters and save contents to the sentence
     *
     * @param {Array} paramsList
     * @return {(Array|null)}
     */
    ,
    set: function set(paramsList) {
      var _this3 = this;

      // can only parse arrays
      if (!(paramsList instanceof Array)) return null;

      // clear existing data
      this.comments = [];
      this.tokens = [];

      // push a new token for each set of parameters
      _.each(paramsList, function (params) {
        _this3.tokens.push(Token.fromParams(_this3, params));
      });

      // attach heads and return validated parameter list
      return this.attach().params;
    }

    /**
     * static method allowing us to construct a new Sentence directly from an
     *   array of parameters
     *
     * @param {Array} paramsList
     * @param {Object} options (optional)
     * @return {Sentence}
     */

  }, {
    key: 'eles',


    /**
     * get an array of the elements of this sentence, useful for exporting the data
     *   to visualization libraries such as Cytoscape or D3
     *
     * @return {Array}
     */
    get: function get() {

      // just in case, since it's critical
      this.index();

      var eles = [];
      this.forEach(function (token) {
        eles = eles.concat(token.eles);
      });

      return eles;
    }
  }, {
    key: 'isValidConllu',
    get: function get() {
      var valid = true;
      this.forEach(function (token) {
        if (token.isAmbiguous) valid = false;
      });
      return valid;
    }

    /**
     * iterate through the tokens and determine if they could be converted into
     *   a CG3 formatted string
     *
     * NOTE: currently, always returns true (see update below)
     *
     * @return {Boolean}
     */

  }, {
    key: 'isValidCG3',
    get: function get() {
      var valid = true;
      this.forEach(function (token) {
        /*
        UPDATE 6/9/18: apparently CG3 can handle all this stuff, it's just a bit lossy
          (e.g. subTokens won't have their own `form` and `empty` tokens won't show up)
         if (token.isSubToken || token.isSuperToken || token.isEmpty)
          valid = false;
        */
      });
      return valid;
    }
  }], [{
    key: 'fromText',
    value: function fromText(serial, options) {
      var sent = new Sentence(options);
      sent.text = serial;
      return sent;
    }
  }, {
    key: 'fromConllu',
    value: function fromConllu(serial, options) {
      var sent = new Sentence(options);
      sent.conllu = serial;
      return sent;
    }
  }, {
    key: 'fromCG3',
    value: function fromCG3(serial, options) {
      var sent = new Sentence(options);
      sent.cg3 = serial;
      return sent;
    }
  }, {
    key: 'fromParams',
    value: function fromParams(paramsList, options) {
      var sent = new Sentence(options);
      sent.params = paramsList;
      return sent;
    }
  }]);

  return Sentence;
}();

/**
 * Proxy so that we can get tokens using Array-like syntax
 *
 * NOTE: usage: `sent[8]` would return the analysis of the token at index 8
 * NOTE: if `name` is not a Number, fall through to normal object
 *
 * @return {Mixed}
 * @name Sentence#get
 */


Sentence.prototype.__proto__ = new Proxy(Sentence.prototype.__proto__, {

  // default getter, called any time we use Sentence.name or Sentence[name]
  get: function get(target, name, receiver) {

    // Symbols can't be cast to floats, so check here to avoid errors
    if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'symbol') return this[name];

    // cast, catch Infinity
    var id = parseFloat(name);
    if (!isNaN(id)) {

      // if we got a number, return analysis at that index
      id = parseInt(id);
      var token = receiver.tokens[id];
      return token ? token.analysis : null;
    } else {

      // fall through to normal getting
      return this[name];
    }
  }
});

// expose to application
module.exports = Sentence;

},{"./analysis":2,"./errors":3,"./token":6,"underscore":1}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('underscore');

var NotatrixError = require('./errors').NotatrixError;
var InvalidCG3Error = require('./errors').InvalidCG3Error;
var InvalidCoNLLUError = require('./errors').InvalidCoNLLUError;

var Analysis = require('./analysis');

/**
 * helper function to split on whitespace
 *
 * @param {String} str
 * @return {Array}
 */
function split(str) {
  return (str || '').split(/\s+/);
}

/**
 * helper function to count the number of leading `\t` characters in a string
 *
 * @param {String} line
 * @return {Number}
 */
function getIndent(line) {

  var chars = line.split(''),
      i = 0;

  while (chars[i++] === '\t') {
    true;
  } // do nothing

  return i - 1;
}

// CG3 parser helper functions

/**
 * extract the `form` parameter from a given string
 *
 * @param {String} line
 * @return {(undefined|String)}
 */
function cg3StringGetForm(line) {

  return cg3Regex.form.test(line) ? line.match(cg3Regex.form)[1] : undefined;
}

/**
 * extract all the other (not `form`) tags from a given string
 *
 * @param {String} line
 * @return {Object}
 */
function cg3StringGetTags(line) {

  // initialize things
  var lemma = void 0,
      xpostag = [],
      head = void 0,
      deprel = void 0,
      deps = void 0,
      misc = [];

  // get lemma
  if (cg3Regex.lemma.test(line)) lemma = line.match(cg3Regex.lemma)[1];

  // only consider line after lemma (if it exists)
  line = lemma ? line.slice(line.indexOf(lemma) + lemma.length + 1).trim() : line;

  // split on whitespace
  var chunks = split(line);

  // iterate over each chunk
  for (var j = 0; j < chunks.length; j++) {

    // try to extract deprel
    if (cg3Regex.deprel.test(chunks[j])) {
      deprel = chunks[j].match(cg3Regex.deprel)[1];

      // try to extract head
    } else if (cg3Regex.dependency.test(chunks[j])) {
      head = chunks[j].match(cg3Regex.dependency)[2];

      // try to extract misc, track with array (can be multiple)
    } else if (cg3Regex.misc.test(chunks[j])) {
      misc.push(chunks[j]);

      // try to extract tags (and save to xpostag), track with an array (can be multiple)
    } else {
      xpostag.push(chunks[j]);
    }
  }

  // return our extracted data
  return {
    lemma: lemma,
    xpostag: xpostag.join(';') || undefined,
    head: head,
    deprel: deprel,
    deps: deps,
    misc: misc.join(';') || undefined
  };
}

/**
 * parse an array of strings representing a CG3 analysis ... recall that in CG3,
 *   subTokens have an increasingly hanging indent from their superToken
 *
 * @param {Token} token token to attach the analyses to
 * @param {Array} lines [[String]]
 * @return {undefined}
 */
function cg3StringParseAnalysis(token, lines) {

  if (lines.length === 2) {

    // no subTokens
    var tags = cg3StringGetTags(lines[1]); // extract tags
    tags.form = cg3StringGetForm(lines[0]); // extract the form
    token.pushAnalysis(new Analysis(token, tags)); // save to token
  } else {

    // has subTokens
    var analysis = new Analysis(token, {
      form: cg3StringGetForm(lines[0]) // superToken only save form
    });

    // for each subToken
    for (var i = 1; i < lines.length; i++) {
      var _tags = cg3StringGetTags(lines[i]); // extract tags
      var subToken = new Token(token.sentence, _tags); // make new subToken
      analysis.pushSubToken(subToken); // attach to this analysis
    }
    token.pushAnalysis(analysis); // save to token
  }
}

// define all the CG3-parsing regex here
var cg3Regex = {
  form: /^"<((.|\\")*)>"/,
  lemma: /["\]](.*)["\]](\s|$)/,
  head: /->(.*)$/,
  dependency: /^#(.+)->(.*)/,
  deprel: /^@(.*)/,
  misc: /.+:.*/
};

/**
 * this class contains all the information associated with a token, including
 *   a possible superToken, an array of possible analyses, an index to the
 *   current analysis, and a Boolean representing whether it is an "empty" token
 */

var Token = function () {
  function Token(sent, params) {
    _classCallCheck(this, Token);

    // require sentence param
    if (!sent) throw new NotatrixError('missing required arg: Sentence');

    // pointer to parent
    this.sentence = sent;

    // internal stuff
    this.superToken = null;
    this.analyses = []; // array of analyses
    this._current = null; // index of current analysis in array
    this._isEmpty = false; // used for CoNLL-U "empty" tokens

    // try parsing an analysis from params
    if (params) this.analysis = new Analysis(this, params);
  }

  /**
   *
   * @return {Number} total number of analyses in this token
   */


  _createClass(Token, [{
    key: 'forEach',


    /**
     * loop through every analysis in the sentence and apply a callback
     *
     * @param {Function} callback function to be applied to every analysis
     * @return {Token}
     */
    value: function forEach(callback) {

      for (var i = 0; i < this.length; i++) {
        callback(this.analyses[i], i);
      }

      // chaining
      return this;
    }

    // keeping track of ambiguous analyses

    /**
     * decrement the _current counter by one (set "previous" analysis as current)
     *
     * @return {Token}
     */

  }, {
    key: 'prev',
    value: function prev() {

      // if no analyses set whatsoever
      if (this._current === null) return null;

      // if we're not already at the first one
      if (this._current > 0) this._current--;

      // chaining
      return this;
    }

    /**
     * increment the _current counter by one (set "next" analysis as current)
     *
     * @return {Token}
     */

  }, {
    key: 'next',
    value: function next() {

      // if no analyses set whatsoever
      if (this._current === null) return null;

      // if we're not already at the last one
      if (this._current < this.length - 1) this._current++;

      // chaining
      return this;
    }

    /**
     * return the _current index
     *
     * @return {Number}
     */

  }, {
    key: 'insertAnalysisAt',


    // manipulate analyses array

    /**
     * insert an analysis BEFORE the given index
     *
     * NOTE: if the index is out of bounds (<0 or >length), then it will be adjusted
     *   to fit the bounds. this means that you can call this with `index=-Infinity`
     *   to push to the front of the analyses array or with `index=Infinity` to push
     *   to the end
     *
     * @param {Number} index
     * @param {Analysis} analysis
     * @return {Token}
     *
     * @throws {NotatrixError} if given invalid index or analysis
     */
    value: function insertAnalysisAt(index, analysis) {

      index = parseFloat(index); // catch Infinity
      if (isNaN(index)) throw new NotatrixError('unable to insert subToken: unable to cast index to int');

      if (!(analysis instanceof Analysis)) throw new NotatrixError('unable to insert analysis: not instance of Analysis');

      // if we had no analyses, make this the first
      if (this.current === null) this._current = 0;

      // bounds checking
      index = index < 0 ? 0 : index > this.length ? this.length : parseInt(index);

      // set the parent pointer on the analysis
      analysis.token = this;

      // array insertion
      this.analyses = this.analyses.slice(0, index).concat(analysis).concat(this.analyses.slice(index));

      // chaining
      return this;
    }

    /**
     * remove an analysis at the given index
     *
     * NOTE: if the index is out of bounds (<0 or >length - 1), then it will be
     *   adjusted to fit the bounds. this means that you can call this with
     *   `index=-Infinity` to remove the first element of the analyses array or
     *   with `index=Infinity` to remove the last
     *
     * @param {Number} index
     * @return {(null|Analysis)}
     *
     * @throws {NotatrixError} if given invalid index
     */

  }, {
    key: 'removeAnalysisAt',
    value: function removeAnalysisAt(index) {

      // can't remove if we have an empty array
      if (!this.length) return null;

      index = parseFloat(index); // catch Infinity
      if (isNaN(index)) throw new NotatrixError('unable to remove subToken: unable to cast index to int');

      // bounds checking
      index = index < 0 ? 0 : index > this.length - 1 ? this.length - 1 : parseInt(index);

      // go to previous analysis if we just deleted our current one or before it
      if (this.current >= index) this.prev();

      // if we now have an empty array, update _current
      if (this.length === 1) this._current = null;

      // array splicing, return spliced element
      return this.analyses.splice(index, 1)[0];
    }

    /**
     * move an analysis from sourceIndex to targetIndex
     *
     * NOTE: if either index is out of bounds (<0 or >length - 1), then it will
     *   be adjusted to fit the bounds. this means that you can call this with
     *   `sourceIndex=-Infinity` to select the first element of the analyses array
     *   or with `sourceIndex=Infinity` to select the last
     *
     * @param {Number} sourceIndex
     * @param {Number} targetIndex
     * @return {Token}
     *
     * @throws {NotatrixError} if given invalid sourceIndex or targetIndex
     */

  }, {
    key: 'moveAnalysisAt',
    value: function moveAnalysisAt(sourceIndex, targetIndex) {

      sourceIndex = parseFloat(sourceIndex);
      targetIndex = parseFloat(targetIndex);
      if (isNaN(sourceIndex) || isNaN(targetIndex)) throw new NotatrixError('unable to move analysis: unable to cast indices to ints');

      // bounds checking
      sourceIndex = sourceIndex < 0 ? 0 : sourceIndex > this.length - 1 ? this.length - 1 : parseInt(sourceIndex);
      targetIndex = targetIndex < 0 ? 0 : targetIndex > this.length - 1 ? this.length - 1 : parseInt(targetIndex);

      if (sourceIndex === targetIndex) {
        // do nothing
      } else {

        // array splice and insert
        var analysis = this.analyses.splice(sourceIndex, 1);
        this.analyses = this.analyses.slice(0, targetIndex).concat(analysis).concat(this.analyses.slice(targetIndex));
      }

      // chaining
      return this;
    }

    /**
     * push an analysis to the end of the analyses array ... sugar for
     *   Token::insertAnalysisAt(Infinity, analysis)
     *
     * @param {Analysis} analysis
     * @return {Token}
     */

  }, {
    key: 'pushAnalysis',
    value: function pushAnalysis(analysis) {
      return this.insertAnalysisAt(Infinity, analysis);
    }

    /**
     * pop an analysis from the end of the analyses array ... sugar for
     *   Token::insertRemoveAt(Infinity)
     *
     * @return {(null|Analysis)}
     */

  }, {
    key: 'popAnalysis',
    value: function popAnalysis() {
      return this.removeAnalysisAt(Infinity);
    }

    // token combining, merging, splitting

  }, {
    key: 'combineWith',
    value: function combineWith(token) {}
  }, {
    key: 'mergeWith',
    value: function mergeWith(token) {
      if (!(token instanceof Token)) throw new NotatrixError('unable to merge: not instance of Token');

      if (this === token) throw new NotatrixError('unable to merge: can\'t merge with self');

      if (this.isSuperToken || token.isSuperToken) throw new NotatrixError('unable to merge: can\'t merge superTokens');

      if (this.superToken !== token.superToken) throw new NotatrixError('unable to merge: can\'t merge tokens with different superTokens');

      var dist = Math.abs(this.analysis.clump - token.analysis.clump);
      if (dist !== 1) throw new NotatrixError('unable to merge: tokens must be adjacent');

      if (this.analysis === null || token.analysis === null) throw new NotatrixError('unable to merge: tokens must have at least one analysis');

      // combine the form and lemma fields
      this.analysis.form = (this.analysis.form || '') + (token.analysis.form || '') || null;
      this.analysis.lemma = (this.analysis.lemma || '') + (token.analysis.lemma || '') || null;

      // take one of these fields
      this.upostag = this.upostag || token.upostag || null;
      this.xpostag = this.xpostag || token.xpostag || null;
      this.feats = this.feats || token.feats || null;
      this.misc = this.misc || token.misc || null;

      // remove the token
      if (token.isSubToken) {

        var indices = this.sentence.getIndices(token);
        this.superToken.removeSubTokenAt(indices.sub);
      } else {

        var _indices = this.sentence.getIndices(token);
        this.sentence.removeTokenAt(_indices.super);
      }

      this.sentence.index();
      return this; // chaining
    }
  }, {
    key: 'split',
    value: function split() {}

    // internal format

    /**
     * get the current analysis for the token or null if none exist
     *
     * @return {(null|Analysis)}
     */

  }, {
    key: 'index',


    // external format stuff

    /**
     * iterate over this token and its subTokens (if we have any) for the current
     *   analysis, using the `id` and `empty` params to set indices
     *
     * @param {Number} id "overall" index
     * @param {Number} empty
     * @return {Array} [Number, Number]
     *
     * @throws {NotatrixError} if given invalid id or empty
     */
    value: function index(id, empty, num, clump) {
      var _this = this;

      id = parseInt(id);
      empty = parseInt(empty);
      num = parseInt(num);
      clump = parseInt(clump);

      if (isNaN(id) || isNaN(empty) || isNaN(num) || isNaN(clump)) throw new NotatrixError('can\'t index tokens using non-integers, make sure to call Sentence.index()');

      // if no analysis, nothing to do
      if (this.analysis === null) return [id, empty, num, clump];

      // iterate over analyses
      this.forEach(function (analysis) {

        // only set the "id" and "empty" indices on the current analysis
        if (analysis.isCurrent) {
          if (_this.isSuperToken) {

            // save the absolute index
            _this.analysis.num = num;
            _this.analysis.clump = null;
            num++;

            // index subTokens
            _.each(_this.analysis.subTokens, function (subToken) {
              if (subToken.isEmpty) {
                empty++; // incr empty counter
                subToken.analysis.id = id + '.' + empty; // dot syntax
              } else {
                id++; // incr regular counter
                subToken.analysis.id = '' + id; // vanilla syntax
                empty = 0; // reset empty counter
              }

              // save the absolute index
              subToken.forEach(function (analysis) {
                analysis.num = num;
                num++;
                analysis.clump = clump;
                clump++;
              });
            });

            // set special superToken index scheme
            var firstSubAnalysis = _this.subTokens[0].analysis;
            var lastSubAnalysis = _this.subTokens[_this.analysis.length - 1].analysis;
            _this.analysis.id = firstSubAnalysis.id + '-' + lastSubAnalysis.id;
          } else {

            // save the absolute index
            _this.analysis.num = num;
            num++;
            _this.analysis.clump = clump;
            clump++;

            if (_this.isEmpty) {
              empty++; // incr empty counter
              _this.analysis.id = id + '.' + empty; // dot syntax
            } else {
              id++; // incr regular counter
              _this.analysis.id = '' + id; // vanilla syntax
              empty = 0; // reset empty counter
            }
          }
        } else {

          // save the absolute index
          _this.analysis.num = num;
          num++;

          // non-current analyses get "id" and "empty" indices set to null
          analysis.id = null;
          _.each(analysis.subTokens, function (subToken) {
            subToken.analysis.id = null;

            subToken.forEach(function (analysis) {

              // save the absolute index
              _this.analysis.num = num;
              num++;
            });
          });
        }
      });

      // return updated indices
      return [id, empty, num, clump];
    }

    /**
     * get a serial version of the internal token representation
     *
     * @return {Object}
     */

  }, {
    key: 'length',
    get: function get() {

      return this.analyses.length;
    }
  }, {
    key: 'current',
    get: function get() {

      return this._current;
    }

    /**
     * set the _current index to the given index if possible
     *
     * @param {Number} current
     * @return {Number}
     */
    ,
    set: function set(current) {

      // force cast to int
      current = parseInt(current);
      if (isNaN(current)) return this.current;

      // bounds checking
      if (current < 0) return this.current;
      if (current > this.length - 1) return this.current;

      // set and return it
      this._current = current;
      return this.current;
    }
  }, {
    key: 'analysis',
    get: function get() {

      if (this.current === null) return null;
      return this.analyses[this.current];
    }

    /**
     * set the current analysis for the token
     *
     * NOTE: if there is already an analysis, overwrite
     *
     * @param {Analysis} analysis
     * @return {Token}
     *
     * @throws {NotatrixError} if given invalid analysis
     */
    ,
    set: function set(analysis) {

      if (!(analysis instanceof Analysis)) throw new NotatrixError('unable to set analysis: not instance of Analysis');

      if (this.analysis === null) {
        // push to front if we have no analyses
        this.insertAnalysisAt(0, analysis);
      } else {
        // otherwise overwrite
        analysis.token = this;
        this.analyses[this.current] = analysis;
      }

      return this;
    }

    /**
     * if we have a current analysis, return its subTokens
     *
     * @return {(null|Array)}
     */

  }, {
    key: 'subTokens',
    get: function get() {

      if (this.analysis === null) return null;
      return this.analysis.subTokens;
    }
  }, {
    key: 'nx',
    get: function get() {

      // serialize analyses
      var analyses = [];
      this.forEach(function (analysis) {
        analyses.push(analysis.nx);
      });

      // serialize other data
      return {
        current: this.current,
        analyses: analyses
      };
    }

    /**
     * get a plain-text formatted string of the current analysis text
     *
     * @return {String}
     *
     * @throws {NotatrixError} if no analysis
     */

  }, {
    key: 'text',
    get: function get() {

      if (this.analysis === null) throw new NotatrixError('no analysis to get text for');

      return this.analysis.text || '';
    }

    /**
     * get a CoNLL-U formatted string representing the current analysis
     *
     * @return {String}
     *
     * @throws {NotatrixError} if no analysis
     * @throws {InvalidCoNLLUError} if ambiguous
     */

  }, {
    key: 'conllu',
    get: function get() {

      if (this.analysis === null) throw new NotatrixError('no analysis to get CoNLL-U for');

      if (this.isAmbiguous) throw new InvalidCoNLLUError('Token is ambiguous, can\'t be converted to CoNNL-U');

      return this.analysis.conllu;
    }

    /**
     * parse a CoNLL-U formatted string and save its contents to the current analysis
     *
     * @param {String} serial
     * @return {undefined}
     */
    ,
    set: function set(serial) {
      // split serial string on whitespace
      var fields = split(serial);

      // check if serial index indicates an "empty" token
      this._isEmpty = /\./.test(fields[0]);

      // generate an analysis from the fields
      this.analysis = new Analysis(this, {
        form: fields[1],
        lemma: fields[2],
        upostag: fields[3],
        xpostag: fields[4],
        feats: fields[5],
        head: fields[6],
        deprel: fields[7],
        deps: fields[8],
        misc: fields[9]
      });
    }

    /**
     * static method allowing us to construct a new Token directly from a
     *   CoNLL-U string and bind it to a sentence
     *
     * @param {Sentence} sent
     * @param {String} serial
     * @return {Token}
     */

  }, {
    key: 'cg3',


    /**
     * get a CG3 formatted string representing the current analysis
     *
     * @return {String}
     *
     * @throws {NotatrixError} if no analysis
     */
    get: function get() {
      if (this.analysis === null) throw new NotatrixError('no analysis to get CG3 for');

      // the form goes on its own line, with each analysis below
      return ['"<' + this.analysis.form + '>"'].concat(this.analyses.map(function (analysis) {
        return analysis.cg3;
      })).join('\n');
    }

    /**
     * parse a CG3 formatted string and save its contents to the current analysis
     *
     * @param {Array} tokenLines generated in Sentence::cg3 [set] by splitting
     *   a serial string on newlines
     * @return {undefined}
     */
    ,
    set: function set(tokenLines) {
      // again, we have complicated parsing here ... first make sure we get an
      //   array of the important information (minimally the form on the first line)
      var analysis = [tokenLines[0]];

      // iterate over the strings
      for (var i = 1; i < tokenLines.length; i++) {

        // ignore leading semicolons (TODO: determine what these are)
        var line = tokenLines[i].replace(/^;/, '');

        // determine line indent
        var indent = getIndent(line);

        // if we're back at indent=1 and we already have stuff in our analysis
        //   buffer, parse it as an analysis
        if (indent === 1 && i > 1) {
          // parse as analysis
          cg3StringParseAnalysis(this, analysis);
          // reset buffer
          analysis = [tokenLines[0]];
        }

        // add to buffer
        analysis.push(line);
      }

      // parse and clear buffer
      cg3StringParseAnalysis(this, analysis);
    }

    /**
     * static method allowing us to construct a new Token directly from a
     *   CG3 string
     *
     * @param {Sentence} sent
     * @param {Array} tokenLines
     * @return {Token}
     */

  }, {
    key: 'params',


    /**
     * get the token parameters for the current analysis
     *
     * @return {Object}
     *
     * @throws {NotatrixError} if no analysis
     */
    get: function get() {
      if (this.analysis === null) throw new NotatrixError('no analysis to get params for');

      return this.analysis.params;
    }

    /**
     * set a set of parameters as the current analysis
     *
     * @param {Object} params
     * @return {Object}
     */
    ,
    set: function set(params) {
      this.analysis = new Analysis(this, params);
      return this.params;
    }

    /**
     * static method allowing us to construct a new Token directly from a set
     *   of parameters
     *
     * @param {Sentence} sent
     * @param {Object} params
     * @return {Token}
     */

  }, {
    key: 'eles',


    /**
     * get an array of elements for exporting to external visualization libraries
     *   for all the analyses of this token
     *
     * @return {Array}
     */
    get: function get() {
      var eles = [];
      this.forEach(function (analysis) {
        eles = eles.concat(analysis.eles);
      });

      return eles;
    }

    // bool stuff

    /**
     * returns true iff this token is a subToken of some other token
     *
     * @return {Boolean}
     */

  }, {
    key: 'isSubToken',
    get: function get() {
      return this.superToken !== null;
    }

    /**
     * returns true iff this token has subTokens
     *
     * @return {Boolean}
     */

  }, {
    key: 'isSuperToken',
    get: function get() {
      return this.analysis ? this.analysis.isSuperToken : null;
    }

    /**
     * returns true iff this token or its superToken is an "empty" token
     *
     * @return {Boolean}
     */

  }, {
    key: 'isEmpty',
    get: function get() {
      return this.isSubToken ? this.superToken.token.isEmpty : this._isEmpty;
    }

    /**
     * return true iff this token has more than one analysis
     *
     * @return {Boolean}
     */

  }, {
    key: 'isAmbiguous',
    get: function get() {
      return this.length > 1;
    }
  }], [{
    key: 'fromConllu',
    value: function fromConllu(sent, serial) {
      var token = new Token(sent);
      token.conllu = serial;
      return token;
    }
  }, {
    key: 'fromCG3',
    value: function fromCG3(sent, tokenLines) {
      var token = new Token(sent);
      token.cg3 = tokenLines;
      return token;
    }
  }, {
    key: 'fromParams',
    value: function fromParams(sent, params) {
      var token = new Token(sent);
      token.params = params;
      return token;
    }
  }]);

  return Token;
}();

// expose to application


module.exports = Token;

},{"./analysis":2,"./errors":3,"underscore":1}]},{},[4])(4)
});
