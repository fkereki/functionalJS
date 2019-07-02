// https://en.wikipedia.org/wiki/Lambda_calculus#Logic_and_predicates

// Church encoding
// http://www.usrsb.in/blog/blog/2012/04/01/building-data-structures-from-functions/

// http://www.cs.cornell.edu/courses/cs3110/2008fa/recitations/rec26.html

// https://mitpress.mit.edu/sicp/full-text/book/book.html
// https://mitpress.mit.edu/sicp/full-text/book/book-Z-H-14.html#%_sec_2.1.3
// https://web.mit.edu/alexmv/6.037/sicp.pdf

/*
In the end, this might strike you as nothing more than a useless programming trick.
In a sense that’s right. I’d never use this in my own code. What makes this technique
so valuable is that it actually fits into the broader context of lambda calculus,
which is a mathematical abstraction of computation.
*/

const TRUE = (trueValue, falseValue) => trueValue;
const FALSE = (trueValue, falseValue) => falseValue;

const MakeBool = value => (value ? TRUE : FALSE);
const valueOf = boolValue => boolValue(true, false);

const NOT = boolValue => boolValue(FALSE, TRUE);
const AND = (boolLeft, boolRight) => boolLeft(boolRight, FALSE);
const OR = (boolLeft, boolRight) => boolLeft(TRUE, boolRight);

/*
 * MAS INTERESANTE POR LA SIMETRIA
 * AND = (left, right) => left(right, left)  -o-  right(left, right)
 * OR  = (left, right) => left(left, right)  -o-  right(right, left)
 */

const XOR = (boolLeft, boolRight) => boolLeft(NOT(boolRight), boolRight); // comparar con EQU()
const EQU = (boolLeft, boolRight) => boolLeft(boolRight, NOT(boolRight)); // comparar con XOR()
const IMP = (boolLeft, boolRight) => boolLeft(boolRight, TRUE); // comparar con AND()

const ifElse = (boolValue, fnTRUE, fnFALSE) => boolValue(fnTRUE, fnFALSE)();

const XOR2 = (boolLeft, boolRight) => boolLeft(boolRight(FALSE, TRUE), boolRight); // comparar con EQU()

console.log("LOG T  ", valueOf(TRUE));
console.log("LOG F  ", valueOf(FALSE));
console.log("");

console.log("VAL T  ", valueOf(MakeBool(true)));
console.log("VAL F  ", valueOf(MakeBool(false)));
console.log("");

console.log("NOT T  ", valueOf(NOT(TRUE)));
console.log("NOT F  ", valueOf(NOT(FALSE)));
console.log("");

console.log("AND T T", valueOf(AND(TRUE, TRUE)));
console.log("AND T F", valueOf(AND(TRUE, FALSE)));
console.log("AND F T", valueOf(AND(FALSE, TRUE)));
console.log("AND F F", valueOf(AND(FALSE, FALSE)));
console.log("");

console.log("OR  T T", valueOf(OR(TRUE, TRUE)));
console.log("OR  T F", valueOf(OR(TRUE, FALSE)));
console.log("OR  F T", valueOf(OR(FALSE, TRUE)));
console.log("OR  F F", valueOf(OR(FALSE, FALSE)));
console.log("");

console.log("XOR T T", valueOf(XOR(TRUE, TRUE)));
console.log("XOR T F", valueOf(XOR(TRUE, FALSE)));
console.log("XOR F T", valueOf(XOR(FALSE, TRUE)));
console.log("XOR F F", valueOf(XOR(FALSE, FALSE)));
console.log("");

console.log("EQU T T", valueOf(EQU(TRUE, TRUE)));
console.log("EQU T F", valueOf(EQU(TRUE, FALSE)));
console.log("EQU F T", valueOf(EQU(FALSE, TRUE)));
console.log("EQU F F", valueOf(EQU(FALSE, FALSE)));
console.log("");

console.log("IMP T T", valueOf(IMP(TRUE, TRUE)));
console.log("IMP T F", valueOf(IMP(TRUE, FALSE)));
console.log("IMP F T", valueOf(IMP(FALSE, TRUE)));
console.log("IMP F F", valueOf(IMP(FALSE, FALSE)));
console.log("");

ifElse(TRUE, x => console.log("SOY CIERTO"), x => console.log("SOY FALSO"));
ifElse(FALSE, x => console.log("SOY CIERTO"), x => console.log("SOY FALSO"));

// duda existencial... tiene que terminar ifElse() invocando a la función resultado?
// o debería ser
// (boolValue, fnTRUE, fnFALSE) => boolValue(fnTRUE, fnFALSE);

// nota: no se puede hacer boolValue(fnTRUE(), fnFALSE()) porque ahí evaluaría AMBAS
// la cuestión es si hacer ifElse(...)() o no
//
// si no se incluyen los () esto permite pasar cosas que NO sean funciones
// ifElse(unBooleano, 3, 6) por ejemplo
// por eso es que le saqué los () finales a ifElse()
//
// aunque también se puede observar que en este caso ifElse resulta igual a boolValue(...)
// conclusión... mejor dejar los ()
