/* eslint-disable no-unused-vars */

/*
    Constructor functions
    NewPair creates a new pair, given its left (first) and right (second) values
*/
export const NewPair = (l, r) => f => f(l, r);

/*
    Accessor functions
    pairLeft(pair) returns the left (first) value of the pair
    pairRight(pair) returns the right (second) value of the pair
    pairToArray(pair) returns an array with the left (first) and right (second) values of the pair
*/
export const pairLeft = pair => pair((l, r) => l);
export const pairRight = pair => pair((l, r) => r);
export const pairToArray = pair => pair((l, r) => [l, r]);

/*
    Modifier functions
    pairSwap(pair) returns a new pair, with the original's left and right values swapped
    pairSetFirst(pair, value) returns a new pair, with the given value as the left one
    pairSetSecond(pair, value) returns a new pair, with the given value as the right one
*/
export const pairSwap = pair => pair((l, r) => NewPair(r, l));
export const pairSetFirst = (pair, value) => NewPair(value, pairRight(pair));
export const pairSetSecond = (pair, value) => NewPair(pairLeft(pair), value);

/*
// expanding the definition of the pairRight/pairLeft calls in the previous definitions
const pairSetFirst2 = (pair, value) => NewPair(value, pair((l, r) => r));
const pairSetSecond2 = (pair, value) => NewPair(pair((l, r) => l), value);

// expanding the definition of the NewPair calls in the previous definitions
const pairSetFirst3 = (pair, value) => f => f(value, pair((l, r) => r));
const pairSetSecond3 = (pair, value) => f => f(pair((l, r) => l), value);

// a more standard way: all functions start with "pair => pair((l,r) => ...)
const pairSetFirst4 = (pair, value) => pair((l, r) => NewPair(value, r));
const pairSetSecond4 = (pair, value) => pair((l, r) => NewPair(l, value));

// expanding the definition of the NewPair calls in the previous definitions
const pairSetFirst5 = (pair, value) => pair((l, r) => f => f(value, r));
const pairSetSecond5 = (pair, value) => pair((l, r) => f => (l, value));
*/
