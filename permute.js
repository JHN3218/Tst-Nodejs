const clog = console.log;
const dlog = require('./silly-libs');

module.exports.permute = 
(input, ln = 0) => {
  let result = [];
  if (input||input.length) {
    input = (typeof input!=='array'?
      (''+input).split('') :input).sort();
    if (input.length<=ln) ln=0;
    perm(input, ln);
  }
  return result;

  function perm(arr, ln, a = '') {
    if (ln && ln===a.length) {
      result.push(a);
      return;
    } else if (arr.length===1) {
      result.push(a + arr.join(''));
      return;
    }

    for (let i in arr) {
      [arr[i],arr[0]] = [arr[0],arr[i]];
      perm(arr.slice(1), ln, a + arr[0]);
    }
  }
}
