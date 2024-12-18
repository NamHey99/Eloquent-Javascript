let arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
let arr = [];
for (let i = 0; i < 3; i++)
  arr = arr.concat(arrays[i]);
console.log(arr);
// → [1, 2, 3, 4, 5, 6]
