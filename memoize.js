const memoize = fn => {
    const cache = {};
    const PRIMITIVES = ["number", "string", "boolean"];
    return (...args) => {
        const strX = args.length === 1 && PRIMITIVES.includes(typeof args[0]) ? args[0] : JSON.stringify(args);
        return strX in cache ? cache[strX] : (cache[strX] = fn(...args));
    };
};

const memoize2 = fn => {
    const cache = {};
    return (...args) => {
        const strX = JSON.stringify(args);
        return strX in cache ? cache[strX] : (cache[strX] = fn(...args));
    };
};
