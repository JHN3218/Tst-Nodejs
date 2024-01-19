//module.exports = clog;
const clog = console.log;

module.exports = dlog;
function dlog(exprVal, ...y) {
  let output = [
    (y.length ? "" + y[0] + (y[1] || ": ") : "") + exprVal,
    ...y.slice(2),
  ];
  clog(...output);
  return exprVal;
}
