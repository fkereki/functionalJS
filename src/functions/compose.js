export const compose = (...fns) => fns.reduceRight((f, g) => (...args) => g(f(...args)));

/* Alternative:
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
*/
