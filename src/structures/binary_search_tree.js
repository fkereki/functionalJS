// should be NewTree ?

const Tree = (value, left, right) => (f, __) => f(value, left, right);

const EmptyTree = () => (__, g) => g();

const treeRoot = tree => tree((value, left, right) => value, () => null);
const treeLeft = tree => tree((value, left, right) => left, () => null);
const treeRight = tree => tree((value, left, right) => right, () => null);

const treeIsEmpty = tree => tree(() => false, () => true);

const treeToObject1 = tree =>
    tree(
        (value, left, right) => ({
            value,
            left: treeToObject1(left),
            right: treeToObject1(right)
        }),
        () => null
    );

const treeToObject2 = tree =>
    tree(
        (value, left, right) => {
            const result = { value };
            const leftBranch = treeToObject2(left);
            if (leftBranch) {
                result.left = leftBranch;
            }
            const rightBranch = treeToObject2(right);
            if (rightBranch) {
                result.right = rightBranch;
            }
            return result;
        },
        () => null
    );

const treeNodesCount = tree => tree((val, left, right) => 1 + treeNodesCount(left) + treeNodesCount(right), () => 0);

const treeHeight = tree => tree((val, left, right) => 1 + Math.max(treeHeight(left), treeHeight(right)), () => 0);

const treeSearch1 = (tree, findValue) =>
    tree(
        (value, left, right) =>
            findValue === value
                ? true
                : findValue < value
                ? treeSearch1(left, findValue)
                : treeSearch1(right, findValue),
        () => false
    );

const treeSearch2 = (tree, findValue) =>
    tree(
        (value, left, right) => findValue === value || treeSearch2(findValue < value ? left : right, findValue),
        () => false
    );

const treeInsert = (tree, newValue) =>
    tree(
        (value, left, right) =>
            newValue <= value
                ? Tree(value, treeInsert(left, newValue), right)
                : Tree(value, left, treeInsert(right, newValue)),
        () => Tree(newValue, EmptyTree(), EmptyTree()) // or Tree(newValue, tree, tree)
    );

const treeRemove = (tree, toRemove) =>
    tree(
        (val, left, right) => {
            const findMinimumAndRemove = (tree /* never empty */) =>
                tree((value, left, right) => {
                    if (treeIsEmpty(left)) {
                        return { min: value, tree: right };
                    } else {
                        const result = findMinimumAndRemove(left);
                        return {
                            min: result.min,
                            tree: Tree(value, result.tree, right)
                        };
                    }
                });

            if (toRemove < val) {
                return Tree(val, treeRemove(left, toRemove), right);
            } else if (toRemove > val) {
                return Tree(val, left, treeRemove(right, toRemove));
            } else if (treeIsEmpty(left) && treeIsEmpty(right)) {
                return EmptyTree();
            } else if (treeIsEmpty(left) !== treeIsEmpty(right)) {
                return tree((val, left, right) => left(() => left, () => right));
            } else {
                const result = findMinimumAndRemove(right);
                return Tree(result.min, left, result.tree);
            }
        },
        () => tree
    );

const treeEquals = (tree1, tree2) =>
    (treeIsEmpty(tree1) && treeIsEmpty(tree2)) ||
    (!treeIsEmpty(tree1) &&
        !treeIsEmpty(tree2) &&
        treeRoot(tree1) === treeRoot(tree2) &&
        treeEquals(treeLeft(tree1), treeLeft(tree2)) &&
        treeEquals(treeRight(tree1), treeRight(tree2)));

let myTree = EmptyTree();
myTree = treeInsert(myTree, 22);
myTree = treeInsert(myTree, 9);
myTree = treeInsert(myTree, 60);
myTree = treeInsert(myTree, 12);
myTree = treeInsert(myTree, 4);
myTree = treeInsert(myTree, 56);

console.log(JSON.stringify(treeToObject2(myTree)));
console.log(-4, JSON.stringify(treeToObject2(treeRemove(myTree, 4))));
console.log(-12, JSON.stringify(treeToObject2(treeRemove(myTree, 12))));
console.log(-56, JSON.stringify(treeToObject2(treeRemove(myTree, 56))));
console.log(-60, JSON.stringify(treeToObject2(treeRemove(myTree, 60))));
console.log(-9, JSON.stringify(treeToObject2(treeRemove(myTree, 9))));
console.log(-22, JSON.stringify(treeToObject2(treeRemove(myTree, 22))));
