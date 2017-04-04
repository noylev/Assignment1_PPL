declare var require: any
import {map, reduce} from 'ramda';
var Assert = require('assert');



//define of TREE type//
interface Tree<T> {
    root: T;
    children: Tree<T>[];
}

//Example for a tree constructor b//
    let b: Tree<number> = {
        root: 1,
        children: [
            {root: 2, children: []},
            {root: 3, children: [
                {root: 4, children:[]}
            ]}
        ]
    };

// other types define//
type Command<T> = (x:T)=>void;
type Transformer<T1,T2> = (x:T1)=>T2;
type Predicate<T> = (x:T)=>boolean;
type Accumulator<T1,T2> = (acc:T1, item:T2)=>T1;



//returns a Tree with only root//
const makeLeaf : <T>(v:T)=>Tree<T> =
    v => {return {root: v, children:[]};}

//creating an empty tree with only root//    
const makeTree : <T>(v:T, children:Tree<T>[])=>Tree<T> =
    (v, children) => { return {root:v, children:children}}

// setter of the root's tree//
const treeRoot : <T>(t: Tree<T>)=>T =
    t => t.root;

//setter of the tree children//
const treeChildren: <T>(t: Tree<T>)=>Tree<T>[] =
    t => t.children;

//returns if the tree is a leaf//   
const treeLeaf : <T>(t: Tree<T>)=>boolean =
    t => t.children.length === 0;



/*const treeMap: <T1,T2>(f: Transformer<T1,T2>, tree: Tree<T1>)=>Tree<T2> = 
   (f, tree) => treeLeaf(tree)?
                      f(treeRoot(tree)) :
                      map(treeMap,treeChildren(tree));
treeMap(x=>x+1,b);​*/




//MAP function implemetation for trees//
const treeMap: <T1,T2>(f: Transformer<T1,T2>, tree: Tree<T1>)=>Tree<T2> =
   (f, tree) =>           
                  treeLeaf(tree)?
                       makeLeaf(f(treeRoot(tree))):
                       makeTree(f(treeRoot(tree)),map(x=>treeMap(f,x),treeChildren(tree)))    
             ;

 //test1
const assert = require('assert');
let a:Tree<number>=makeTree(1,[]);
let testTree: Tree<number> =treeMap(x=>x+3, a );
assert.ok(testTree.children.length===0);



//Reduce function implemetation for trees//
const treeReduceDF: <T1,T2>(f: Accumulator<T1,T2>, init: T1, tree: Tree<T2>)=>T1 = 
    (f, init, tree) =>
                      treeLeaf(tree)?
                       f(init,treeRoot(tree)):
                  
                       reduce(f,f(init,treeRoot(tree)),map((x)=>treeReduceDF(f,init,x),treeChildren(tree))) ;           

//test for the reduce function           
console.log(treeReduceDF((acc, item)=> acc + item,0, b));






/*console.log(b);
console.log(treeChildren(treeChildren(b)[1]));
 let a: Tree<number>=treeMap(x=>x+3, b);
console.log(treeMap(x=>x+3, b));
console.log(treeChildren(treeChildren(a)[1]));
//console.log(tre(x=>console.log(x), b));*/