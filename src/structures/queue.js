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
