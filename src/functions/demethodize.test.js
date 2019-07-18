import { demethodize } from "./demethodize";

describe("demethodize", () => {
    it("map", () => {
        const myMap = demethodize(Array.prototype.map);
        expect(myMap([1, 2, 3, 4], x => x * 2)).toEqual([2, 4, 6, 8]);
    });

    it("filter", () => {
        const myFilter = demethodize(Array.prototype.filter);
        expect(myFilter([1, 2, 3, 5, 8, 13], x => x % 2)).toEqual([1, 3, 5, 13]);
    });

    it("split", () => {
        const mySplit = demethodize(String.prototype.split);
        expect(mySplit("ABRACADABRA", "A").length).toBe(6);
        expect(mySplit("ABRACADABRA", "B").length).toBe(3);
    });
});
