const { ø, clog, dlog, loop, is } = require("./silly-libs");

const permute = (input, ln = 0) => {
  let result = [];
  if (input.length || input) {
    // set input as sorted array
    input = (!is(input).Object() ? ("" + input).split("") : input).sort();
    if (input.length <= ln) ln = 0;
    perm(input, ln);
  }
  return result;

  function perm(arr, ln, a = "") {
    if (ln && ln === a.length) {
      result.push(a);
      return;
    } else if (arr.length === 1) {
      result.push(a + arr.join(""));
      return;
    }

    // swap & slice the head,
    // then recursively rotate the tail
    for (let i in arr) {
      [arr[i], arr[0]] = [arr[0], arr[i]];
      perm(arr.slice(1), ln, a + arr[0]);
    }
  }
};

const factorial = (n) =>
  loop([1, Math.round(Math.abs(n))], (i, r) => (r *= i), 1);

const tst = (n) => {
  const ttlDay=365
  let result=1, d=ttlDay
  for (var i=1; 1-result<=n && i<=ttlDay; i++)
    clog(i,--d,result*=d/ttlDay)
  return result
}

module.exports = { permute, factorial, tst };

Array.prototype.Σ = function() {
  var result=0
  if (!this.length) return undefined
  for(let i=0; i<this.length; i++)
    result+=this[i]
  return result
}

Array.prototype.Π = function() {
  var result=1
  if (!this.length) return undefined
  for(let i=0; i<this.length; i++)
    result*=this[i]
  return result
}