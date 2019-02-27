import ListCache from './_ListCache.mjs';
import stackClear from './_stackClear.mjs';
import stackDelete from './_stackDelete.mjs';
import stackGet from './_stackGet.mjs';
import stackHas from './_stackHas.mjs';
import stackSet from './_stackSet.mjs';

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

export default Stack;
