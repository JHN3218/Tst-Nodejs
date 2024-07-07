const { ø, clog, dlog, loop, is } = require('./silly-libs');

/*
function permute(arr, ln=arr.length) {
  if (ln === 1) return arr.map(x => [x]);
  const result = [];
  for (let i = 0; i<arr.length; i++) {
    const current = arr[i];
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    for (let p of permute (rest, ln - 1)) {
      result.push([current, ...p]);
    }
  }
  return result;
}
*/

function permute(input, ln = 0) {
  const result = [];
  if (input.length || input) {
    // set input as sorted array
    input = (!is(input).Object() ? ('' + input).split('') : input).sort();
    if (input.length <= ln) ln = 0;
    perm(input, ln);
  }
  return result;

  function perm(arr, ln, a = '') {
    if (ln && ln === a.length) {
      result.push(a);
      return;
    } else if (arr.length === 1) {
      result.push(a + arr.join(''));
      return;
    }

    // swap & slice the head,
    // then recursively rotate the tail
    for (let i in arr) {
      [arr[i], arr[0]] = [arr[0], arr[i]];
      perm(arr.slice(1), ln, a + arr[0]);
    }
  }
}

function combination(arr, k = arr.length) {
  if (k === 0) return [[]];
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let rest = arr.slice(i + 1);
    let combos = combination(rest, k - 1);
    for (let j = 0; j < combos.length; j++) {
      result.push([arr[i], ...combos[j]]);
    }
  }
  return result;
};

function permbinate(arr, ln = arr.length, type = 'permutation') {
  const result = [];
  backtrack([], arr);
  return result;

  function backtrack(current, remaining) {
    if (current.length === ln) {
      result.push([...dlog(current,'push to result:')]);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      current.push(dlog(remaining[i],`push remain[${i}]:`,'→',current));
      if (type === 'permutation') {
        backtrack(
          dlog(current,'new curr:','\n  remain:',remaining),
          dlog([...remaining.slice(0, i), ...remaining.slice(i + 1)],
               'slc remain:',`← (0,${i}):[${remaining.slice(0,i)}],(${i+1}):[${remaining.slice(i+1)}]`)
        );
      } else { // combination
        backtrack(
          dlog(current,'new curr:','\n  remain:',remaining),
          dlog(remaining.slice(i + 1),
               'slc remain:',`← (${i+1}):[${remaining.slice(i+1)}]`)
        );
      }
      dlog(current.pop(),'pop curr:','←',current);
    }
  }
};

const factorial = (_ => {
  const fact = [1]; // static var - memoization
  return n => {
    n = Math.round(n);
    // return n<0? undefined
    //   :fact[n] ||= n * factorial(n-1);
    return n < 0 ? undefined : fact[n] ||
      loop([fact.length, n + 1], (i, r) =>
        (fact[i] = r * i), 1);
  };
})();

const P = (n, r = n) => factorial(n) / factorial(n - Math.min(r, n));
const C = (n, k = n) => P(n, k) / factorial(Math.min(k, n));

const fibonacci = (_ => {
  const fib = [0, 1]; // static var - memoization
  return n => {
    n = Math.round(Math.abs(n));
    // return n<0? undefined
    //   :fib[n] ||= fibonacci(n-1)+fibonacci(n-2);
    return n < 0 ? undefined : fib[n] ||
      loop([fib.length, n + 1], i =>
      (fib[i] = fib[i - 1] + fib[i - 2]));
  };
})();

function Σ(...arr) {
  if (!arr.length) return undefined;
  return arr[0].reduce(
    (sum, val, i) => sum + val + (1 < arr.length ? arr.slice(1).reduce((s, a) => s + a[i], 0) : 0),
    0,
  );
}

function Π(arr) {
  if (!arr.length) return undefined;
  return arr.reduce((sum, val) =>
    sum * val, 1);
}

function ΣΠ(...arr) {
  var result = 0;
  for (let i = 0; i < arr.length; i++) {
    let product = this[i];
    for (let j = 0; j < arr[i].length; j++)
      product *= arr[i][j];
    result += product;
  }
  return result;
}

function tst(n) {
  const ttlDay = 365;
  let result = 1,
    d = ttlDay;
  for (var i = 1; 1 - result <= n && i <= ttlDay; i++) clog(i, --d, (result *= d / ttlDay));
  return result;
}

module.exports = {
  permute,
  combination,
  permbinate,
  fibonacci,
  factorial,
  P,
  C,
  Σ,
  Π,
  ΣΠ,
  tst,
};

/*
Array.prototype.Σ = function(...arr) {
  if (!this.length) return undefined;
  return this.reduce((sum, val, i) => 
    sum + val + (arr.length ? arr.reduce((s, a) => s + a[i], 0) : 0), 0);
};

Array.prototype.Π = function() {
  if (!this.length) return undefined;
  return this.reduce((sum, val) => sum * val, 1);
};
*/