/* eslint-disable no-unused-vars */

/*
    Constructor functions
    NewStack(t,r) creates a stack with top t and rest r;
    r defaults to an empty stack if not provided.

    EmptyStack() creates an empty stack.

    Stack(a,b,c...) creates a stack with top a and rest b, c, ...

    StackFromArray(arr) creates a stack with top arr[0] and rest arr[1], arr[2], ...
*/

export const NewStack = (t, r = EmptyStack()) => (f, g) => f(t, r);

export const EmptyStack = () => (f, g) => g();

export const Stack = (...args) => (args.length ? NewStack(args[0], Stack(...args.slice(1))) : EmptyStack());

export const StackFromArray = arr => (arr && arr.length ? Stack(...arr) : EmptyStack());

/*
    Alternatives:

    Stack3 and Stack4 are "lazy"; the rest of the stack doesn't get created until needed

    const Stack3 = (...args) => (args.length ? (f, g) => f(args[0], Stack3(...args.slice(1))) : EmptyStack());
    const Stack4 = (...args) => (f, g) => (args.length ? f(args[0], Stack4(...args.slice(1))) : g());
*/

/*
    Accesors
    stackTop(s) returns the top element of the s stack, or null if the stack is empty
    stackRest(s) returns the rest of the stack, excluding the top, or null if the stack is empty
    stackSize(s) returns the number of elements in the s stack
    stackToArray(s) returns an array with the elements in the s stack, starting at the top
*/
export const stackTop = stack => stack((t, r) => t, () => null);

export const stackRest = stack => stack((t, r) => r, () => null);

export const stackSize = stack => stack((t, r) => 1 + stackSize(r), () => 0);

export const stackToArray = stack => stack((t, r) => [t, ...stackToArray(r)], () => []);

/*
    Modifiers
    stackPush(s,v) pushes value v at the top of stack s
    stackPop(s) pops the top of stack s, and returns the resulting stack
    stackTopAndPop(s) returns the top element of the s stack, and the stack with the top popped off
*/
export const stackPush = (stack, v) => stack((t, r) => NewStack(v, stack), () => NewStack(v));

export const stackPop = stack => stack((t, r) => r, () => null);

export const stackTopAndPop = stack => stack((t, r) => [t, r], () => [null, EmptyStack()]);
