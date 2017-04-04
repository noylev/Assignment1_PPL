"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
var Assert = require('assert');
//Example for a tree constructor b//
var b = {
    root: 1,
    children: [
        { root: 2, children: [] },
        { root: 3, children: [
                { root: 4, children: [] }
            ] }
    ]
};
//returns a Tree with only root//
var makeLeaf = function (v) { return { root: v, children: [] }; };
//creating an empty tree with only root//    
var makeTree = function (v, children) { return { root: v, children: children }; };
// setter of the root's tree//
var treeRoot = function (t) { return t.root; };
//setter of the tree children//
var treeChildren = function (t) { return t.children; };
//returns if the tree is a leaf//   
var treeLeaf = function (t) { return t.children.length === 0; };
/*const treeMap: <T1,T2>(f: Transformer<T1,T2>, tree: Tree<T1>)=>Tree<T2> =
   (f, tree) => treeLeaf(tree)?
                      f(treeRoot(tree)) :
                      map(treeMap,treeChildren(tree));
treeMap(x=>x+1,b);​*/
//MAP function implemetation for trees//
var treeMap = function (f, tree) {
    return treeLeaf(tree) ?
        makeLeaf(f(treeRoot(tree))) :
        makeTree(f(treeRoot(tree)), ramda_1.map(function (x) { return treeMap(f, x); }, treeChildren(tree)));
};
//test1
var assert = require('assert');
var a = makeTree(1, []);
var testTree = treeMap(function (x) { return x + 3; }, a);
assert.ok(testTree.children.length === 0);
//Reduce function implemetation for trees//
var treeReduceDF = function (f, init, tree) {
    return treeLeaf(tree) ?
        f(init, treeRoot(tree)) :
        ramda_1.reduce(f, f(init, treeRoot(tree)), ramda_1.map(function (x) { return treeReduceDF(f, init, x); }, treeChildren(tree)));
};
//test for the reduce function           
console.log(treeReduceDF(function (acc, item) { return acc + item; }, 0, b));
/*console.log(b);
console.log(treeChildren(treeChildren(b)[1]));
 let a: Tree<number>=treeMap(x=>x+3, b);
console.log(treeMap(x=>x+3, b));
console.log(treeChildren(treeChildren(a)[1]));
//console.log(tre(x=>console.log(x), b));*/ 
//# sourceMappingURL=q 2.1 ass1-ppl.ts.js.map