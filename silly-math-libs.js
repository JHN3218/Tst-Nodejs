const { ø, clog, dlog, loop, is } = require("./silly-libs");

const permute = (input, ln = 0) => {
  let result = [];
  if (input.length || input) {
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

    for (let i in arr) {
      [arr[i], arr[0]] = [arr[0], arr[i]];
      perm(arr.slice(1), ln, a + arr[0]);
    }
  }
};

const factorial = (n) =>
  loop([1, Math.round(Math.abs(n))], (i, r) => (r *= i), 1);

const tst = (n) => {
  const d=365
  let r=1, c=d
  for (var i=1; n<=r && i<=d; i++)
    clog(i,--c,r*=c/d)
  return r
}

module.exports = { permute, factorial, tst };
