import asciiToArray from './_asciiToArray.mjs';
import hasUnicode from './_hasUnicode.mjs';
import unicodeToArray from './_unicodeToArray.mjs';

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

export default stringToArray;
