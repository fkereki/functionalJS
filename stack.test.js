import {
    NewStack,
    EmptyStack,
    Stack,
    StackFromArray,
    stackTop,
    stackRest,
    stackSize,
    stackToArray,
    stackPush,
    stackPop,
    stackTopAndPop
} from "./stack";

describe("Stack creation and access", () => {
    it("EmptyStack", () => {
        const st = EmptyStack();
        expect(stackSize(st)).toBe(0);
        expect(stackTop(st)).toBe(null);
        expect(stackRest(st)).toBe(null);
    });

    it("Stack with no elements", () => {
        const st = Stack();
        expect(stackSize(st)).toBe(0);
        expect(stackToArray(st)).toEqual([]);
        expect(stackTop(st)).toBe(null);
        expect(stackRest(st)).toBe(null);
    });

    it("NewStack with a single element", () => {
        const st = NewStack(22);
        expect(stackSize(st)).toBe(1);
        expect(stackToArray(st)).toEqual([22]);
        expect(stackTop(st)).toBe(22);
        expect(stackSize(stackRest(st))).toBe(0);
    });

    it("NewStack with more elements", () => {
        const st = NewStack(22, NewStack(9, NewStack(60)));
        expect(stackSize(st)).toBe(3);
        expect(stackToArray(st)).toEqual([22, 9, 60]);
        expect(stackTop(st)).toBe(22);
        expect(stackSize(stackRest(st))).toBe(2);
    });

    it("Stack with three elements", () => {
        const st = Stack("F", "K", "G");
        expect(stackSize(st)).toBe(3);
        expect(stackToArray(st)).toEqual(["F", "K", "G"]);
        expect(stackTop(st)).toBe("F");
        expect(stackToArray(stackRest(st))).toEqual(["K", "G"]);
    });

    it("StackFromArray with no elements", () => {
        const st = StackFromArray([]);
        expect(stackSize(st)).toBe(0);
        expect(stackToArray(st)).toEqual([]);
        expect(stackTop(st)).toBe(null);
        expect(stackRest(st)).toBe(null);
    });

    it("StackFromArray with four elements", () => {
        const st = Stack("F", "E", "F", "K");
        expect(stackSize(st)).toBe(4);
        expect(stackToArray(st)).toEqual(["F", "E", "F", "K"]);
        expect(stackTop(st)).toBe("F");
        expect(stackToArray(stackRest(st))).toEqual(["E", "F", "K"]);
    });
});

describe("Stack operations", () => {
    it("StackPop from empty stack", () => {
        const st = stackPop(EmptyStack());
        expect(st).toBe(null);
    });

    it("StackPop from non-empty stack", () => {
        const st = stackPop(Stack("F", "E", "F", "K"));
        expect(stackSize(st)).toBe(3);
        expect(stackToArray(st)).toEqual(["E", "F", "K"]);
        expect(stackTop(st)).toBe("E");
        expect(stackToArray(stackRest(st))).toEqual(["F", "K"]);
    });

    it("StackPush to empty stack", () => {
        const st = stackPush(EmptyStack(), 22);
        expect(stackSize(st)).toBe(1);
        expect(stackToArray(st)).toEqual([22]);
        expect(stackTop(st)).toBe(22);
        expect(stackToArray(stackRest(st))).toEqual([]);
    });

    it("StackPush to non-empty stack", () => {
        const st = stackPush(Stack(9, 60), 22);
        expect(stackSize(st)).toBe(3);
        expect(stackToArray(st)).toEqual([22, 9, 60]);
        expect(stackTop(st)).toBe(22);
        expect(stackToArray(stackRest(st))).toEqual([9, 60]);
    });

    it("StackTopAndPop from empty stack", () => {
        const [top, st] = stackTopAndPop(EmptyStack());
        expect(top).toBe(null);
        expect(stackSize(st)).toBe(0);
    });

    it("StackTopAndPop from non-empty stack", () => {
        const [top, st] = stackTopAndPop(Stack(22, 9, 60));
        expect(top).toBe(22);
        expect(stackToArray(st)).toEqual([9, 60]);
    });
});
