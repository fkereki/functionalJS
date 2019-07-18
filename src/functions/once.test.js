import { once } from "./once";

describe("once", () => {
    it("with simple function", () => {
        let v = 1;
        const f = () => {
            return v++;
        };
        const myF = once(f);

        expect(myF()).toBe(1);
        expect(myF()).toBe(1);
        expect(myF()).toBe(1);
        expect(myF()).toBe(1);

        expect(f()).toBe(2);
        expect(f()).toBe(3);
        expect(f()).toBe(4);

        expect(v).toBe(5);
    });
});
