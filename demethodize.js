export const demethodize = Function.prototype.bind.bind(Function.prototype.call);

/*
const demethodize1 = fn => (arg0, ...args) => fn.apply(arg0, args);
const demethodize2 = fn => (arg0, ...args) => fn.call(arg0, ...args);
const demethodize3 = fn => (...args) => fn.bind(...args)();
*/

/*
For an explanation, read Leland Richardson's Clever way to demethodize Native JS Methods,
at http://www.intelligiblebabble.com/clever-way-to-demethodize-native-js-methods.
*/
