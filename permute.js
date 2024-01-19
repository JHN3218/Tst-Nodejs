const clog = console.log;
const dlog = require("./silly-libs");

module.exports = permute;
function permute(arr, n = 0) {
  perm(typeof arr == "string" ? arr.split("") : arr, n);

  function perm(arr, n, a = "") {
    if (n && n == a.length) {
      clog(a);
      return;
    } else if (arr.length === 1) {
      clog(a + arr.join(""));
      return;
    }

    for (let i in arr) {
      [arr[i], arr[0]] = [arr[0], arr[i]];
      perm(arr.slice(1), n, a + arr[0]);
    }
  }
}
