function arrayToList(array) {
	let list = null;
  for (let i = array.length - 1; i >= 0; i--)
  	list = {value: array[i], rest: list};
  return list;
}

function listToArray(list) {
	let array = [];
  for (let i = list; i; i = i.rest) {
  	array.push(i.value);
  }
  return array;
}
function prepend(value, list) {
	return {value, rest: list};
}
function nth(list, a) {
	let arr = listToArray(list);
  return arr[a];
}
console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
