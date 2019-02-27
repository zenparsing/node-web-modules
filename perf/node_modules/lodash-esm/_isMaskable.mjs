import coreJsData from './_coreJsData.mjs';
import isFunction from './isFunction.mjs';
import stubFalse from './stubFalse.mjs';

/**
 * Checks if `func` is capable of being masked.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
 */
var isMaskable = coreJsData ? isFunction : stubFalse;

export default isMaskable;
