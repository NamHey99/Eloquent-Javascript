class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  // Your code here.
  for (;;) {
	try {
    	return primitiveMultiply(a, b);
  	} catch (n) {
    	if (!(n instanceof MultiplicatorUnitFailure)) {
      	throw n;
    	}
  	}
 }
}

console.log(reliableMultiply(8, 8));
// → 64
