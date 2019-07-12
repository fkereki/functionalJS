import { compose } from "./compose";

const add1 = x => x + 1;
const by10 = y => y * 10;
const sqr = z => z ** 2;

describe("compose", () => {
    it("compose 3", () => {
        expect(
            compose(
                add1,
                by10,
                sqr
            )(3)
        ).toBe(91);
    });

    it("compose 2", () => {
        expect(
            compose(
                add1,
                by10
            )(4)
        ).toBe(41);
        expect(
            compose(
                by10,
                add1
            )(5)
        ).toBe(60);
    });

    it("compose 1", () => {
        expect(compose(by10)(5)).toBe(50);
        expect(compose(add1)(6)).toBe(7);
        expect(compose(sqr)(3)).toBe(9);
    });
});
