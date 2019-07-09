const curry = (fn, len = fn.length) => (len === 0 ? fn() : p => curry(fn.bind(null, p), len - 1));
