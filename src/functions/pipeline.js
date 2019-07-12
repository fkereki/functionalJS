export const pipeline = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));
