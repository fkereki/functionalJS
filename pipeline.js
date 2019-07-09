const pipeTwo = (f, g) => (...args) => g(f(...args));

const pipeline = (...fns) => (...args) => {
    let result = fns[0](...args);
    for (let i = 1; i < fns.length; i++) {
        result = fns[i](result);
    }
    return result;
};

const pipeline2 = (...fns) => fns.reduce((result, f) => (...args) => f(result(...args)));

const pipeline3 = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

const pipelineR = (first, ...rest) => (rest.length == 0 ? first : (...args) => pipelineR(...rest)(first(...args)));
