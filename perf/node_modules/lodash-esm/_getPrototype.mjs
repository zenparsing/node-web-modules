import overArg from './_overArg.mjs';

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

export default getPrototype;
