import asciiSize from './_asciiSize.mjs';
import hasUnicode from './_hasUnicode.mjs';
import unicodeSize from './_unicodeSize.mjs';

/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */
function stringSize(string) {
  return hasUnicode(string)
    ? unicodeSize(string)
    : asciiSize(string);
}

export default stringSize;
