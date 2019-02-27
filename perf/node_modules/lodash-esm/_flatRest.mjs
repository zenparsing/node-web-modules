import flatten from './flatten.mjs';
import overRest from './_overRest.mjs';
import setToString from './_setToString.mjs';

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

export default flatRest;
