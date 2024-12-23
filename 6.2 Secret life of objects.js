class Group {
	#member = [];
  
  add(value) {
  	if(this.has(value) === false) {
    	this.#member.push(value);
    }
  }
  
  has(value) {
  	return this.#member.includes(value);
  }
  
  delete(value) {
  	this.#member = this.#member.filter((v) => v !== value);
  }
  
  static from(array) {
  	let group = new Group;
    for (let i of array) {
    	group.add(i);
    }
    return group;
  }
}
let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
