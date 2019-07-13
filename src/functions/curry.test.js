import { curry } from "./curry";

describe("curry", () => {
    it("with 3-ary function", () => {
        const add3 = (a, b, c) => 100 * a + 10 * b + c;
        const add3c = curry(add3);
        expect(add3c(4)(5)(2)).toBe(452);
    });

    it("with 2-ary function", () => {
        const add2 = (a, b) => 100 * a + b;
        const add2c = curry(add2);
        expect(add2c(9)(5)).toBe(905);
    });

    it("with unary function", () => {
        const change = x => -x;
        const changec = curry(change);
        expect(changec(22)).toBe(-22);
    });

    it("with generic function", () => {
        const addM = (a, b, c, ...args) => 1000 * a + 100 * b + 10 * c + args[0];
        expect(addM(6, 4, 2, 1)).toBe(6421);
        expect(addM(6, 4, 2, 1, 3, 5)).toBe(6421);

        const addMc = curry(addM, 4);
        expect(addMc(6)(4)(2)(1)).toBe(6421);
    });
});
