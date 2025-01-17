// Fill in the regular expressions

verify(/(my|bad)/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/(pop|mad)/,
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

verify(/(ferret|ferry|ferrari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/(how delicious|spacious room)/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/(bad)/,
       ["bad punctuation ."],
       ["escape the period"]);

verify(/(Sie)/,
       ["Siebentausenddreihundertzweiundzwanzig"],
       ["no", "three small words"]);

verify(/(pus|est)/,
       ["red platypus", "wobbling nest"],
       ["earth bed", "bedrøvet abe", "BEET"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) if (!regexp.test(str)) {
    console.log(`Failure to match '${str}'`);
  }
  for (let str of no) if (regexp.test(str)) {
    console.log(`Unexpected match for '${str}'`);
  }
}
