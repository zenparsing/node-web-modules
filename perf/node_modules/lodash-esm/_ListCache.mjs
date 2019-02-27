import listCacheClear from './_listCacheClear.mjs';
import listCacheDelete from './_listCacheDelete.mjs';
import listCacheGet from './_listCacheGet.mjs';
import listCacheHas from './_listCacheHas.mjs';
import listCacheSet from './_listCacheSet.mjs';

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

export default ListCache;
