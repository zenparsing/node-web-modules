import apply from './_apply.mjs';
import arrayMap from './_arrayMap.mjs';
import baseIteratee from './_baseIteratee.mjs';
import baseRest from './_baseRest.mjs';
import baseUnary from './_baseUnary.mjs';
import flatRest from './_flatRest.mjs';

/**
 * Creates a function like `_.over`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over iteratees.
 * @returns {Function} Returns the new over function.
 */
function createOver(arrayFunc) {
  return flatRest(function(iteratees) {
    iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
    return baseRest(function(args) {
      var thisArg = this;
      return arrayFunc(iteratees, function(iteratee) {
        return apply(iteratee, thisArg, args);
      });
    });
  });
}

export default createOver;
