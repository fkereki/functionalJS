import { NewPair, pairLeft, pairRight, pairSwap, pairToArray } from "./pair";

describe("Pair creation and access", () => {
    it("pairLeft and pairRight accesors should work", () => {
        const pair = NewPair(22, 9);
        expect(pairLeft(pair)).toBe(22);
        expect(pairRight(pair)).toBe(9);
    });

    it("pairSwap should invert a pair's values", () => {
        const pair = pairSwap(NewPair(22, 9));
        expect(pairLeft(pair)).toBe(9);
        expect(pairRight(pair)).toBe(22);
    });

    it("pairToArray should produce an array", () => {
        const arr = pairToArray(NewPair(22, 9));
        expect(arr).toEqual([22, 9]);
    });
});

describe("Pair modification", () => {});

/*
pairLog(pairSetFirst1(pair, 222)); // [222, 9]
pairLog(pairSetSecond1(pair, 999)); // [22, 999]

pairLog(pairSetFirst2(pair, 22222)); // [22222, 9]
pairLog(pairSetSecond2(pair, 99999)); // [22, 99999]

pairLog(pairSetFirst3(pair, 33333)); // [33333, 9]
pairLog(pairSetSecond3(pair, 44444)); // [22, 44444]

pairLog(pairSetFirst4(pair, 55555)); // [55555, 9]
pairLog(pairSetSecond4(pair, 66666)); // [22, 66666]

pairLog(pairSetFirst4(pair, 77777)); // [77777, 9]
pairLog(pairSetSecond4(pair, 88888)); // [22, 88888]
*/
