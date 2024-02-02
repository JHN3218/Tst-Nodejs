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

module.exports.loop = (ln, func, returnVal = 0) => {
  [i, end, step] = [ln[0] || 0, ln[1] || ln, ln[2] || 1];
  for (; i < end; i += step) func(i, returnVal);
  return returnVal;
};

// const members = {};
module.exports.is = (x) => {
  const members = {
    Any: (...y) => y.some((z) => x === z),
    Between: (lo, hi) => lo <= x <= hi,
    Array: () => this.is(x).Object() && Array.isArray(x),
    Boolean: () => typeof x === "boolean",
    Date: () => this.is(x).Object() && x instanceof Date,
    Function: () => typeof x === "function",
    Object: () => typeof x === "object",
    Number: () => typeof x === "number",
    String: () => typeof x === "string",
    Symbol: () => typeof x === "symbol",
  };
  return members;
};
// Object.freeze(members);

module.exports.AddObj = (target, obj) => {
  for (const [key, value] of Object.entries(obj))
    if (typeof value === "object")
      target[key] = this.AddObj(
        target[key] || (Array.isArray(value) && []) || {},
        value,
      );
    else target[key] = value;
  return target;
};
