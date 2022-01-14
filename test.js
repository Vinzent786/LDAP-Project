let arr1 = ['test1', 'test2', 'test3', 'test4','test5', 'test6'];
let arr2 = [4,5,6,7];

let combine  = [arr1, ...arr2];
// let obj = {};
// for(let i =0; i < arr1.length; i++){
//     obj[arr1[i]] = arr2[i]
// }

// const map = new Map([
//     ["one", 1],
//     ["two", 2]
// ]);

// const obj = Object.fromEntries(map)

// console.log(obj['one'])


let arr3 = [];
for(let i = 0; i < arr1.length; i += 2) {
    arr3 = arr1.splice(0,2)
}

console.log(arr3)

