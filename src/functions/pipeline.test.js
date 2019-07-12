import { pipeline } from "./pipeline";

const add1 = x => x + 1;
const by10 = y => y * 10;
const sqr = z => z ** 2;

describe("pipeline", () => {
    it("pipeline 3", () => {
        expect(pipeline(sqr, by10, add1)(3)).toBe(91);
    });

    it("pipeline 2", () => {
        expect(pipeline(by10, add1)(4)).toBe(41);
        expect(pipeline(add1, by10)(5)).toBe(60);
    });

    it("pipeline 1", () => {
        expect(pipeline(by10)(5)).toBe(50);
        expect(pipeline(add1)(6)).toBe(7);
        expect(pipeline(sqr)(3)).toBe(9);
    });
});
