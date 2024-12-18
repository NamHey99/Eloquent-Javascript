function deepEqual(a, b) {
	if (a === b)
  	return true;
  
  if (a == null || typeof a != "object" ||
  		b == null || typeof b != "object")
      	return false;
  let keyA = Object.keys(a), keyB = Object.keys(b);
  for (let i of keyA) {
  	if (keyB.includes(i) === 0 || 
    		deepEqual(a[i], b[i]) === false) 
    		return false;
  }
  return true;
}
let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
