/*
    h: stands for the head of a list
    t: stands for the tail of a list

    v: stands for a value
    p: stands for a position -- the head of the list is at position 0

    f: a destructuring function: f(h,t)
    g: a destructuring null function: g()
*/

const NewList = (head, tail) => (f, g) => f(head, tail);
const EmptyList = () => (f, g) => g();

const MakeList = (...args) => (args.length ? NewList(args[0], MakeList(...args.slice(1))) : EmptyList());

const MakeList2 = (...args) =>
    args.length
        ? (f, g) => f(args[0], MakeList2(...args.slice(1))) // lazy evaluation of the tail!
        : (f, g) => g();

const MakeList3 = (...args) => {
    if (args.length) {
        const h = args[0];
        const t = MakeList3(...args.slice(1));
        return (f, g) => f(h, t);
    } else {
        return (f, g) => g();
    }
};

const listHead = list => list((head, tail) => head, () => null);
const listTail = list => list((head, tail) => tail, () => null);
const listIsEmpty = list => list((head, tail) => false, () => true);

const listToArray = list => list((head, tail) => [head, ...listToArray(tail)], () => []);

const listFromArray = arr => (arr.length ? NewList(arr[0], listFromArray(arr.slice(1))) : EmptyList());

const listAppend = (list, value) =>
    list((head, tail) => NewList(head, listAppend(tail, value)), () => NewList(value, EmptyList()));

const listReverse = list => list((head, tail) => listAppend(listReverse(tail), head), () => EmptyList());

const listEquals1 = (list1, list2) => JSON.stringify(listToArray(list1)) === JSON.stringify(listToArray(list2));

const listEquals2 = (list1, list2) =>
    (listIsEmpty(list1) && listIsEmpty(list2)) ||
    (!listIsEmpty(list1) &&
        !listIsEmpty(list2) &&
        listHead(list1) === listHead(list2) &&
        listEquals2(listTail(list1), listTail(list2)));

const listSize = list => list((head, tail) => 1 + listSize(tail), () => 0);

const listSize2 = list => {
    const accumSize = (accum, list) => list((head, tail) => accumSize(accum + 1, tail), () => accum);
    return accumSize(0, list);
};

const listConcat = (list1, list2) => list1((head, tail) => NewList(head, listConcat(tail, list2)), () => list2);

const listSearch = (list, value) => list((head, tail) => head === value || listSearch(tail, value), () => false);

const listGetAt = (list, pos) =>
    list((head, tail) => (pos === 0 ? head : listGetAt(tail, pos - 1)), () => throwEmptyListError());

const listUpdate = (list, pos, value) =>
    list(
        (head, tail) => (pos === 0 ? NewList(value, tail) : NewList(head, listUpdate(tail, pos - 1, value))),
        () => throwEmptyListError()
    );

const listMap = (list, fn) => list((head, tail) => NewList(fn(head), listMap(tail, fn)), EmptyList);

const listFilter = (list, fn) =>
    list((head, tail) => (fn(head) ? NewList(head, listFilter(tail, fn)) : listFilter(tail, fn)), EmptyList);

const listReduce = (list, fn, accum) => list((head, tail) => listReduce(tail, fn, fn(accum, head)), () => accum);

/*
QUEUE: WHENEVER THE FRONT LIST BECOMES EMPTY, WE FILL IT WITH THE REVERSED BACK LIST
*/

const NewQueue = (front, back = EmptyList()) => (f, g) => f(front, back);

const EmptyQueue = (f, g) => g();

const queueToArray = queue =>
    queue((front, back) => [...listToArray(front), ...listToArray(listReverse(back))], () => []);

const queueIsEmpty = queue => queue((front, back) => isEmptyList(front), () => true);

const queueHead = queue => queue((front, back) => listHead(front), () => undefined);

const queueAddAtBack = (queue, value) =>
    queue(
        (front, back) => queueMake(front, NewList(value, back)),
        () => NewQueue(NewList(value, EmptyList()), EmptyList())
    );

const queueRemoveFromFront = queue => queue((front, back) => queueMake(listTail(front), back), () => undefined);

const queueMake = (front, back) =>
    listIsEmpty(front) ? NewQueue(listReverse(back), EmptyList()) : NewQueue(front, back);

////////////////////// TESTS! ////////////////////////

console.log(listToArray(MakeList3(22, 9, 60, 24, 11, 63)));
console.log(listToArray(MakeList3(1492)));
console.log(listToArray(MakeList3()));

const myList1 = NewList(22, NewList(9, NewList(60, EmptyList())));
const myList2 = listFromArray([24, 11, 63, 12, 4, 56]);
const myList3 = NewList(24, NewList(11, NewList(63, listFromArray([12, 4, 56]))));

var myQ = EmptyQueue;
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueAddAtBack(myQ, "alfa");
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueAddAtBack(myQ, "beta");
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueAddAtBack(myQ, "gamma");
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueRemoveFromFront(myQ);
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueAddAtBack(myQ, "delta");
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueAddAtBack(myQ, "epsilon");
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueRemoveFromFront(myQ);
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueRemoveFromFront(myQ);
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueRemoveFromFront(myQ);
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
