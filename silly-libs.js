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
  let [i, finish, step] =
    typeof amount === "number" ? [0, amount, 1] : [amount[0] || 0, amount[1], amount[2] || 1];
  for (; i <= finish; i+=step)
    returnVal = func(i, returnVal);
  return returnVal;
};
