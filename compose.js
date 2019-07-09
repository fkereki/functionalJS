const flipTwo = fn => (arg1, arg2) => fn(arg2, arg1);

const composeTwo = (f, g) => (...args) => f(g(...args));
const composeTwoByFlipping = flipTwo(pipeTwo);
const compose = (...fns) => pipeline(...fns.reverse());
const compose2b = (...fns) => fns.reduceRight((f, g) => (...args) => g(f(...args)));
const compose3 = (...fns) => fns.reduce(composeTwo);
