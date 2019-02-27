import baseIsEqual from './_baseIsEqual.mjs';
import get from './get.mjs';
import hasIn from './hasIn.mjs';
import isKey from './_isKey.mjs';
import isStrictComparable from './_isStrictComparable.mjs';
import matchesStrictComparable from './_matchesStrictComparable.mjs';
import toKey from './_toKey.mjs';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

export default baseMatchesProperty;
