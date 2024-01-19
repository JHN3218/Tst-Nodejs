const clog = console.log;
const dlog = require('./silly-libs');

module.exports = permute;
function permute(arr, n = 0) {
  let result = [];
  (arr || arr.length) &&
    perm(typeof arr!=='array'? (''+arr).split('') :arr, n);
  return result;

  function perm(arr, n, a = '') {
    if (n && n===a.length) {
      // clog(a);
      result.push(a);
      return;
    } else if (arr.length===1) {
      // clog(a + arr.join(''));
      result.push(a + arr.join(''));
      return;
    }

    for (let i in arr) {
      [arr[i], arr[0]] = [arr[0], arr[i]];
      perm(arr.slice(1), n, a + arr[0]);
    }
  }
}
