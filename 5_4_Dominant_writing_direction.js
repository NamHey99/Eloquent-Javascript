function dominantDirection(text) {
  // Your code here.
  for (let i = 0; i < text.length; i++)
    if (text[i] < 32 || text[i] > 126)
      return "rtl";
  return "ltr";
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
