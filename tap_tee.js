const tap = curry((fn, x) => (fn(x), x));

const tap2 = fn => x => (fn(x), x);

const tee = (arg, logger = console.log) => {
    logger(arg);
    return args;
};

const tee3 = tap(console.log);
