import { NewPair, pairLeft, pairRight, pairToArray, pairSwap, pairSetFirst, pairSetSecond } from "./pair";

describe("Pair creation and access", () => {
    it("pairLeft and pairRight accesors should work", () => {
        const pair = NewPair(22, 9);
        expect(pairLeft(pair)).toBe(22);
        expect(pairRight(pair)).toBe(9);
    });

    it("pairToArray should produce an array", () => {
        const arr = pairToArray(NewPair(22, 9));
        expect(arr).toEqual([22, 9]);
    });
});

describe("Pair modification", () => {
    it("pairSwap should invert a pair's values", () => {
        const pair = pairSwap(NewPair(22, 9));
        expect(pairLeft(pair)).toBe(9);
        expect(pairRight(pair)).toBe(22);
    });

    it("PairSetFirst should set the first value", () => {
        const pair = pairSetFirst(NewPair(22, 9), 60);
        expect(pairLeft(pair)).toBe(60);
        expect(pairRight(pair)).toBe(9);
    });

    it("PairSetSecond should set the second value", () => {
        const pair = pairSetSecond(NewPair(22, 9), 60);
        expect(pairLeft(pair)).toBe(22);
        expect(pairRight(pair)).toBe(60);
    });
});
