import arrayMap from './_arrayMap.mjs';
import copyArray from './_copyArray.mjs';
import isArray from './isArray.mjs';
import isSymbol from './isSymbol.mjs';
import stringToPath from './_stringToPath.mjs';
import toKey from './_toKey.mjs';
import toString from './toString.mjs';

/**
 * Converts `value` to a property path array.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {*} value The value to convert.
 * @returns {Array} Returns the new property path array.
 * @example
 *
 * _.toPath('a.b.c');
 * // => ['a', 'b', 'c']
 *
 * _.toPath('a[0].b.c');
 * // => ['a', '0', 'b', 'c']
 */
function toPath(value) {
  if (isArray(value)) {
    return arrayMap(value, toKey);
  }
  return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
}

export default toPath;
