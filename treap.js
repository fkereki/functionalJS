const NewTreap = (value, priority, left, right) => (f, g) =>
    f(value, priority, left, right);

const EmptyTreap = () => (f, g) => g();

const treapIsEmpty = treap =>
    treap((value, priority, left, right) => false, () => true);

const treapValue = treap =>
    treap((value, priority, left, right) => value, () => undefined);

const treapPriority = treap =>
    treap((value, priority, left, right) => priority, () => undefined);

const treapLeft = treap =>
    treap((value, priority, left, right) => left, () => undefined);

const treapRight = treap =>
    treap((value, priority, left, right) => right, () => undefined);

const treapToObject = treap =>
    treap((value, priority, left, right) => {
        const leftBranch = treapToObject(left);
        const rightBranch = treapToObject(right);
        const result = {value, priority};
        if (leftBranch) {
            result.left = leftBranch;
        }
        if (rightBranch) {
            result.right = rightBranch;
        }
        return result;
    }, () => null);

const treapToString = treap => JSON.stringify(treapToObject(treap));

const treapInsert = (newValue, newPriority, treap) =>
    treap(
        (value, priority, left, right) => {
            let candidate;

            if (newValue <= value) {
                candidate = NewTreap(
                    value,
                    priority,
                    treapInsert(newValue, newPriority, left),
                    right
                );

                const leftTree = treapLeft(candidate);
                if (treapPriority(leftTree) > priority) {
                    candidate = NewTreap(
                        treapValue(leftTree),
                        treapPriority(leftTree),
                        treapLeft(leftTree),
                        NewTreap(
                            value,
                            priority,
                            treapRight(leftTree),
                            right
                        )
                    );
                }
            } else {
                candidate = NewTreap(
                    value,
                    priority,
                    left,
                    treapInsert(newValue, newPriority, right)
                );

                const rightTree = treapRight(candidate);
                if (treapPriority(rightTree) > priority) {
                    candidate = NewTreap(
                        treapValue(rightTree),
                        treapPriority(rightTree),
                        NewTreap(
                            value,
                            priority,
                            left,
                            treapLeft(rightTree)
                        ),
                        treapRight(rightTree)
                    );
                }
            }

            return candidate;
        },
        () => NewTreap(newValue, newPriority, EmptyTreap(), EmptyTreap())
    );

const treapSearch1 = (findValue, treap) =>
    treap(
        (value, priority, left, right) =>
            findValue === value
                ? true
                : findValue < value
                  ? treapSearch1(findValue, left)
                  : treapSearch1(findValue, right),
        () => false
    );

const treapSearch2 = (findValue, treap) =>
    treap(
        (value, priority, left, right) =>
            findValue === value ||
            treapSearch2(findValue, findValue < value ? left : right),
        () => false
    );

const treapSearchForNode = (findValue, treap) =>
    treap(
        (value, priority, left, right) =>
            findValue === value
                ? tree
                : treapSearchForNode(
                      findValue,
                      findValue < value ? left : right
                  ),
        () => null
    );

const treapDelete = (treap, valueToDelete) =>
    treap((value, priority, left, right) => {
        if (valueToDelete < value) {
            return NewTreap(
                value,
                priority,
                treapDelete(left, valueToDelete),
                right
            );
        } else if (valueToDelete > value) {
            return NewTreap(
                value,
                priority,
                left,
                treapDelete(right, valueToDelete)
            );
        } else if (treapIsEmpty(left) && treapIsEmpty(right)) {
            return EmptyTreap();
        } else if (treapIsEmpty(right)) {
            return left;
        } else if (treapIsEmpty(left)) {
            return right;
        } else if (treapPriority(left) < treapPriority(right)) {
            return NewTreap(
                treapValue(right),
                treapPriority(right),
                treapDelete(
                    NewTreap(value, priority, left, treapLeft(right)),
                    valueToDelete
                ),
                treapRight(right)
            );
        } else {
            return NewTreap(
                treapValue(left),
                treapPriority(left),
                treapLeft(left),
                treapDelete(
                    NewTreap(value, priority, treapRight(left), right),
                    valueToDelete
                )
            );
        }
    }, () => treap);

let myTree = EmptyTreap();
console.log(JSON.stringify(treapToObject(myTree)));
myTree = treapInsert(22, 50, myTree);
console.log(JSON.stringify(treapToObject(myTree)));
myTree = treapInsert(9, 90, myTree);
console.log(JSON.stringify(treapToObject(myTree)));
myTree = treapInsert(60, 30, myTree);
console.log(JSON.stringify(treapToObject(myTree)));
myTree = treapInsert(12, 45, myTree);
console.log(JSON.stringify(treapToObject(myTree)));
myTree = treapInsert(4, 20, myTree);
console.log(JSON.stringify(treapToObject(myTree)));
myTree = treapInsert(56, 10, myTree);
console.log(JSON.stringify(treapToObject(myTree)));
console.log(treapToObject(myTree));

console.log('XXXXXXXXXXXX');
console.log(JSON.stringify(treapToObject(treapDelete(myTree, 22))));
console.log('XXXXXXXXXXXX');
console.log(JSON.stringify(treapToObject(treapDelete(myTree, 9))));
console.log('XXXXXXXXXXXX');
console.log(JSON.stringify(treapToObject(treapDelete(myTree, 60))));
console.log('XXXXXXXXXXXX');
console.log(JSON.stringify(treapToObject(treapDelete(myTree, 12))));
console.log('XXXXXXXXXXXX');
console.log(JSON.stringify(treapToObject(treapDelete(myTree, 4))));
console.log('XXXXXXXXXXXX');
console.log(JSON.stringify(treapToObject(treapDelete(myTree, 56))));
console.log('XXXXXXXXXXXX');
