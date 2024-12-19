function every(array, test) {
  // Your code here.
  if (array.length === 0) {
    return true;
  }
  let n = array.length;
  for (let i = 0; i < n; i++)
    if (test(array[i]) === false)
      return false;
  return true;
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true
