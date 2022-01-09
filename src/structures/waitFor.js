const untilInfiniteWait = (fn, time = 1000) => {
    if (fn()) {
        return Promise.resolve(true);
    } else {
        return new Promise((resolve) => {
            const timer = setInterval(() => {
                if (fn()) {
                    clearInterval(timer);
                    resolve(true);
                }
            }, time);
        });
    }
};

const until = (fn, time = 1000, wait = 10000) => {
    const startTime = new Date().getTime();
    try {
        if (fn()) {
            return Promise.resolve(true);
        } else {
            return new Promise((resolve, reject) => {
                const timer = setInterval(() => {
                    try {
                        if (fn()) {
                            clearInterval(timer);
                            resolve(true);
                        } else if (new Date().getTime() - startTime > wait) {
                            clearInterval(timer);
                            reject(new Error("Max wait reached"));
                        }
                    } catch (e) {
                        clearInterval(timer);
                        reject(e);
                    }
                }, time);
            });
        }
    } catch (e) {
        return Promise.reject(e);
    }
};

const untilAsync = async (fn, time = 1000, wait = 10000) => {
    const startTime = new Date().getTime(); /* [1] */
    for (;;) {
        if (await fn()) {
            return true;
        }
        if (new Date().getTime() - startTime > wait) {
            throw new Error("Max wait reached");
        } else {
            await new Promise((resolve) => setTimeout(resolve, time));
        }
    }
};
