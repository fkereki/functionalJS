const NewStack = (t, r = EmptyStack()) => (f, g) => f(t, r);

const EmptyStack = () => (f, g) => g();

const Stack = (...args) => {
    if (args.length) {
        const t = args[0];
        const r = Stack(...args.slice(1));
        return (f, g) => f(t, r);
    } else {
        return (f, g) => g();
    }
};

const Stack2 = (...args) => (args.length ? NewStack(args[0], ...args.slice(1)) : EmptyStack());

/*
    Stack3 and Stack4 are "lazy"; the rest of the stack doesn't get created until needed
*/

const Stack3 = (...args) => (args.length ? (f, g) => f(args[0], Stack3(...args.slice(1))) : EmptyStack());

const Stack4 = (...args) => (f, g) => (args.length ? f(args[0], Stack4(...args.slice(1))) : g());

const stackPop = stack => stack((t, r) => r, () => null);

const stackTop = stack => stack((t, r) => t, () => null);

const stackTopAndPop = stack => stack((t, r) => [t, r], () => [null, stack]);

const stackPush = (stack, v) => stack((t, r) => NewStack(v, stack), () => NewStack(v));

const stackSize = stack => stack((t, r) => 1 + stackSize(r), () => 0);

const stackToArray = stack => stack((t, r) => [t, ...stackToArray(r)], () => []);

const stackFromArray = arr => (arr.length ? NewStack(arr[0], stackFromArray(arr.slice(1))) : EmptyStack());

Stack(1, 2, 3, 4, 5, 6);
stackToArray(stackPop(stackPop(stackPop(Stack2(11, 22, 33, 44, 55, 66)))));
stackTop(Stack3(111, 222, 333, 444, 555, 666));

console.log("-----------------------");

let jjj = Stack2(22, 9, 60, 24, 11, 63);
console.log(stackToArray(jjj));
let kkk = Stack(1492);
console.log(stackToArray(kkk));
let lll = Stack();
console.log(stackToArray(lll));

let hhh = Stack2(1);
console.log(stackToArray(hhh));

let iii = Stack2();
console.log(stackToArray(iii));

let mmm = stackFromArray([12, 4, 56]);
console.log(stackToArray(mmm));

let sss = NewStack(22, NewStack(9, NewStack(60)));
console.log(stackTop(sss), stackSize(sss)); // 22 3
sss = stackPop(sss);
console.log(stackTop(sss), stackSize(sss)); // 9 2
sss = stackPop(sss);
console.log(stackTop(sss), stackSize(sss)); // 60 1
sss = stackPush(sss, 2411);
console.log(stackTop(sss), stackSize(sss)); // 2411 2

let [ttt, uuu] = stackTopAndPop(sss);
console.log(ttt, stackTop(uuu)); // 2411 60

sss = stackPop(sss);
console.log(stackTop(sss), stackSize(sss)); // 60 1
sss = stackPop(sss);
console.log(stackTop(sss), stackSize(sss)); // null 0
sss = stackPop(sss);
