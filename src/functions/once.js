export const once = func => {
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
