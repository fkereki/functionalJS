const tupleError = txt => {
    throw new Error(txt);
};

const NewTuple = (...values) => f => f(...values);

const NewTupleBySize = n => NewTuple(...new Array(n).fill(0));

const tupleSize = tuple => tuple((...args) => args.length);

const tupleIsEmpty = tuple => tupleSize(tuple) === 0;

const tupleFromArray = arr => NewTuple(...arr);

const tupleToArray = tuple => tuple((...args) => [...args]);

const tupleGetNth = (tuple, n) =>
    tuple((...args) => (0 <= n && n < args.length ? args[n] : tupleError("PLACE DOES NOT EXIST")));

const tupleSetNth = (tuple, n, value) =>
    tuple((...args) => {
        if (0 <= n && n < args.length) {
            const myArgs = args;
            myArgs[n] = value;
            return NewTuple(...myArgs);
        } else {
            tupleError("WRONG PLACE IN TUPLE");
        }
    });

const tupleSliceFrom = (tuple, n) => tuple((...args) => NewTuple(...args.slice(n)));

const tupleEquals = (tuple1, tuple2) =>
    (tupleIsEmpty(tuple1) && tupleIsEmpty(tuple2)) ||
    (!tupleIsEmpty(tuple1) &&
        !tupleIsEmpty(tuple2) &&
        (tupleGetNth(tuple1, 0) === tupleGetNth(tuple2, 0) &&
            tupleEquals(tupleSliceFrom(tuple1, 1), tupleSliceFrom(tuple2, 1))));

const tupleMap = (tuple, fn) => tuple((...values) => NewTuple(...values.map(fn)));

const tupleFilter = (tuple, fn) => tuple((...values) => NewTuple(...values.filter(fn)));

const tupleReduce = (tuple, fn, accum) => tuple((...values) => [...values].reduce(fn, accum));

const myTuple0 = NewTuple();
const myTuple1 = NewTuple(22, 9, 60, 12, 4, 56);
const myTuple2 = NewTuple(22, 9, 60, 12, 4, 56);
const myTuple3 = NewTuple(24, 11, 63);
const myTuple4 = NewTupleBySize(5);

console.log("Get NTH");
console.log(tupleGetNth(myTuple1, 0));
console.log(tupleGetNth(myTuple1, 1));
console.log(tupleGetNth(myTuple1, 2));
console.log(tupleGetNth(myTuple1, 3));
console.log(tupleGetNth(myTuple1, 4));
console.log(tupleGetNth(myTuple1, 5));
// console.log(tupleGetNth(myTuple1, 6));

console.log("LENGTH");
console.log(tupleSize(myTuple0));
console.log(tupleSize(myTuple1));

console.log("TO ARRAY");
console.log(tupleToArray(myTuple0));
console.log(tupleToArray(myTuple1));
console.log(tupleToArray(myTuple2));
console.log(tupleToArray(myTuple3));
console.log(tupleToArray(myTuple4));

console.log("EQUALS");
console.log(tupleEquals(myTuple0, myTuple0));
console.log(tupleEquals(myTuple0, myTuple1));
console.log(tupleEquals(myTuple0, myTuple2));
console.log(tupleEquals(myTuple0, myTuple3));
console.log(tupleEquals(myTuple1, myTuple0));
console.log(tupleEquals(myTuple1, myTuple1));
console.log(tupleEquals(myTuple1, myTuple2));
console.log(tupleEquals(myTuple1, myTuple3));

console.log("SET NTH");
console.log(tupleToArray(tupleSetNth(myTuple1, 2, "FEFK")));
// console.log(tupleToArray(tupleSetNth(6, "FEFK", myTuple1)));

console.log("MAP");
console.log(tupleToArray(tupleMap(myTuple1, x => x + 1000)));
console.log(tupleToArray(tupleFilter(myTuple1, x => x % 2 == 0)));
console.log(tupleReduce(myTuple1, (x, y) => x + y, 20000));
