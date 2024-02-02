const clog = console.log;
//module.exports = clog;

module.exports.dlog = (exprVal, ...y) => {
  let output = [
    (y.length ? "" + y[0] + (y[1] || ": ") : "") + exprVal,
    ...y.slice(2),
  ];
  clog(...output);
  return exprVal;
};

module.exports.loop = (amount, func, returnVal = 0) => {
  [i, finish, step] = is(amount).Array()
    ? [amount[0] || 0, amount[1], amount[2] || 1]
    : [0, amount, 1];
  for (; i <= finish; i += step) func(i, returnVal);
  return returnVal;
};

module.exports.is = (x) => {
  const members = {
    Array: () => this.is(x).Object() && Array.isArray(x),
    Any: (...y) => y.some((z) => x === z),
    Between: (lo, hi) => lo <= x <= hi,
    Object: () => typeof x === "object",
    Number: () => typeof x === "number",
    String: () => typeof x === "string",
  };
  return members;
};
