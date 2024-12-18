// Your code here.
function loop(n) {
  if (n > 0) {
    console.log(n);
    return loop(n-1);
    }
  else 
    return false;
}
loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1
