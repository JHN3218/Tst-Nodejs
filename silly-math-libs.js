const { ø, clog, dlog, loop, is } = require('./silly-libs'),
  π = Math.PI;

function π_ish(n=0,x=0) {
  const ƒx=[0,1,4,22,151,1051,7355,51483,
            360377,2522638,17658463,
            123609233,]
  return 7**n / (7**(n+1) + (x||ƒx[n]||7**n/16));
}

function π_adjust(n) {
  const p=π-3,
    a=7**n,
    b=7**(n+1),
    x=Math.round(a/p-b),
    y=π_ish(n,x)/p,
    z=Math.floor(x+y),
    π_=π_ish(n,z);
  clog(n,a,b+z,z);
  clog(" ",π_);
  clog(" ",π_/p);
  return z;
}

function permute(input, ln = 0) {
  const result = [];
  if (input.length || input) {
    // set input as sorted array
    input = (!is(input).Object()? ('' + input).split('') : input).sort();
    if (input.length<=ln) ln=0;
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

    for (let i=0; i<remaining.length; i++) {
      current.push(dlog(remaining[i],`push remain[${i}]:`,'→',current));
      if (type === 'permutation') {
        backtrack(
          dlog(current,'new curr:','\n  remain:',remaining),
          dlog([...remaining.slice(0,i), ...remaining.slice(i+1)],
               'slc remain:',`← (0,${i}):[${remaining.slice(0,i)}],(${i+1}):[${remaining.slice(i+1)}]`)
        );
      } else { // combination
        backtrack(
          dlog(current,'new curr:','\n  remain:',remaining),
          dlog(remaining.slice(i+1),
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
    return n<0? undefined :fact[n] ||
      loop([fact.length, n+1], (i,r) =>
        (fact[i] = r*i), 1);
  };
})();

const P = (n, r=n) => factorial(n) / factorial(n - Math.min(r, n));
const C = (n, k=n) => P(n, k) / factorial(Math.min(k, n));

const fibonacci = (_ => {
  const fib = [0,1]; // static var - memoization
  return n => {
    n = Math.round(Math.abs(n));
    // return n<0? undefined
    //   :fib[n] ||= fibonacci(n-1)+fibonacci(n-2);
    return n<0? undefined :fib[n] ||
      loop([fib.length, n+1], i =>
      (fib[i] = fib[i-1] + fib[i-2]));
  };
})();

function Σ(...arr) {
  if (!arr.length) return undefined;
  return arr.reduce((sum,a) =>
         a.reduce((_,val) =>
           sum+=val ,ø
         ),0);
}

function Π(arr) {
  if (!arr.length) return undefined;
  return arr.reduce((sum, val) =>
    sum*val, 1);
}

function ΣΠ(...arr) {
  if (!arr.length) return undefined;
  return arr.reduce((sum,a) =>
    sum + Π(a),0);
  /*
  var result = 0,
      product = 1;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++)
      product *= arr[i][j];
    result += product;
  }
  return result;
  */
}

function ΣSeq(Z) {
  return Z*(Z+1)/2
  // return loop([1,Z+1], (i,r) => i+r, 0));
}

/**
* Round a number to a precision, specificed in number of decimal places
*
* @param {number} number - The number to round
* @param {number} precision - The number of decimal places to round to:
*                             > 0 means decimals, < 0 means powers of 10
* @return {number} - The number, rounded
*/
function round(n, precision = 2) {
  const factor = 10 ** precision;
  return Math.round(n * factor) / factor;
  //return 0 + n.toFixed(prec).replace(/\.?0*$/,'');
}

/**
 * Calculate the logarithm of a number with a given base.
 *
 * @param {number} base - The base of the logarithm. Must be greater than 0 and not equal to 1.
 * @param {number} x - The number to calculate the logarithm of. Must be greater than 0.
 * @param {number} [precision=15] - The number of decimal places to calculate the logarithm to. Defaults to 15.
 * @returns {number} The logarithm of `x` with base `base`, calculated to `precision` decimal places.
 * @throws {Error} If `base` is not greater than 0 or equal to 1, or if `x` is not greater than 0.
 */
function log(b, x, precision = 15) { return round(Math.log(x) / Math.log(b), precision); }
function logarithm(base, x, precision = 15) {
  if (typeof base !== "number" || base <= 0 || base === 1) {
    throw new Error("Base must be greater than 0 and not equal to 1.");
  }
  if (typeof x !== "number" || x <= 0) {
    throw new Error("x must be greater than 0.");
  }
  if (typeof precision !== "number" || precision <= 0 || !Number.isInteger(precision)) {
    throw new Error("Precision must be a positive integer.");
  }

  let result = 0;
  let multiplier = 1;
  let increment = 1;

  for (let i = 0; i < precision; i++) {
    increment /= 2;
    dlog(multiplier *= base,'multiplier:',x);
    if (multiplier <= x) {
      dlog(result += increment,`result + ${increment}:`);
      dlog(x /= multiplier,'x');
    }
  }

  return result;
}

const rand = {
  int:(min,max)=>
    Math.floor(Math.random() * (max - min + 1)) + min,
};

// knuthUpArrow(a, arrows, b)
// a: base (Number, integer >= 0)
// arrows: number of up-arrows (integer >= 0). 0 arrows = a * b (by Knuth's def)
// b: power/count (integer >= 0)
//
// Returns BigInt when possible for integer inputs; throws for too-large results.
function knuthUpArrow(a, arrows, b) {
  if (!Number.isInteger(arrows) || arrows < 0) throw new Error('arrows must be nonnegative integer');
  if (!Number.isInteger(b) || b < 0) throw new Error('b must be nonnegative integer');
  if (arrows === 0) return BigInt(a) * BigInt(b); // a ↑^0 b = a * b
  if (b === 0) return BigInt(1);                  // a ↑^k 0 = 1 for k>=1
  if (b === 1) return BigInt(a);                  // a ↑^k 1 = a

  // Use recursion: a ↑^k b = a ↑^(k-1) (a ↑^k (b-1))
  // For performance and to avoid stack overflow, implement iteratively when arrows==1 (regular power)
  if (arrows === 1) {
    // a ↑ b = a^b
    return BigInt(a) ** BigInt(b);
  }

  // For arrows >= 2, compute iteratively by building b-1 nested calls:
  // result = a ↑^(arrows) b = a ↑^(arrows-1) (a ↑^(arrows) (b-1))
  // We'll implement recursively but carefully:
  function up(aVal, k, bVal) {
    if (k === 1) return BigInt(aVal) ** BigInt(bVal);
    if (bVal === 0) return BigInt(1);
    if (bVal === 1) return BigInt(aVal);
    // compute inner = a ↑^k (b-1)
    const inner = up(aVal, k, bVal - 1);
    // then compute a ↑^(k-1) inner
    return up(aVal, k - 1, Number(inner)); // WARNING: may overflow Number
  }

  return up(a, arrows, b);
}

function tetration(a, n, b) {
  if (n === 0) return b;
  else if (n === 1) return a ** b;
  else {
      let result = a;
      for (let i = 0; i < n - 1; i++) {
          result = a ** result;
      }
      return result ** b;
  }
}

// Alternatively, a more concise recursive version
function tetrationRecursive(a, n, b) {
  if (n === 0) return b;
  return a ** tetrationRecursive(a, n - 1, b);
}

// Usage
// console.log(tetration(2, 2, 3));  // equivalent to 2 ↑↑ 2 = 2^2 = 4, but here b=3 so 2^(2^3) 
// console.log(tetrationRecursive(2, 2, 1)); // equivalent to 2 ↑↑ 2 = 2^2 


function tst(n) {
  const ttlDay = 365;
  let result = 1,
      d = ttlDay;
  for (var i = 1; 1 - result <= n && i <= ttlDay; i++)
    clog(i, --d, (result *= d / ttlDay));
  return result;
}

module.exports = {
  π_ish, π_adjust,
  permute,
  combination,
  permbinate,
  fibonacci,
  factorial,
  P,
  C,
  Σ,
  Π,
  ΣΠ, ΣSeq,
  round, log,
  rand,
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