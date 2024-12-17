// Your code here.
function reverseArray(arr) {
  let array = [];
  for (let i = arr.length - 1; i >= 0; i--) 
    array.push(arr[i]);
  return array;
}
function reverseArrayInPlace(arr) {
  return arr.reverse();
}
let myArray = ["A", "B", "C"];
console.log(reverseArray(myArray));
// → ["C", "B", "A"];
console.log(myArray);
// → ["A", "B", "C"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
