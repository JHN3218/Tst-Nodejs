const clog = console.log;
//module.exports = clog;

module.exports.dlog =
(exprVal, ...y) => {
  let output = [
    (y.length? ''+y[0] + (y[1]||': ') :'') + exprVal,
    ...y.slice(2),
  ];
  clog(...output);
  return exprVal;
}