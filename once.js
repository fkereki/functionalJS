const once = func => {
    let done = false;
    return (...args) => {
        if (!done) {
            done = true;
            func(...args);
        }
    };
};

const once2 = func => {
    let done = false;
    let result;
    return (...args) => {
        if (!done) {
            done = true;
            result = func(...args);
        }
        return result;
    };
};
