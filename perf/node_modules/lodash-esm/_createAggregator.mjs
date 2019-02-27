import arrayAggregator from './_arrayAggregator.mjs';
import baseAggregator from './_baseAggregator.mjs';
import baseIteratee from './_baseIteratee.mjs';
import isArray from './isArray.mjs';

/**
 * Creates a function like `_.groupBy`.
 *
 * @private
 * @param {Function} setter The function to set accumulator values.
 * @param {Function} [initializer] The accumulator object initializer.
 * @returns {Function} Returns the new aggregator function.
 */
function createAggregator(setter, initializer) {
  return function(collection, iteratee) {
    var func = isArray(collection) ? arrayAggregator : baseAggregator,
        accumulator = initializer ? initializer() : {};

    return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
  };
}

export default createAggregator;
