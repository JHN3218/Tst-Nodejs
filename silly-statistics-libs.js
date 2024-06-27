const { clog } = require('./silly-libs')

const min = arr =>
  arr.length?
    arr.reduce((r,i) => Math.min(r,i))
  :undefined;
/* fast {
  if (!arr.length) return undefined;
  if (arr.length===1) return arr[0];
  var result = arr[0];
  for (let i=1; i<arr.length; i++)
    result = Math.min(result,arr[i]);
  return result;
} */

const max = arr =>
  arr.length?
    arr.reduce((r,i) => Math.max(r,i))
  :undefined;

const mean = arr =>
  arr.length?
    arr.Σ() / arr.length
  :undefined;

const add2mean = (mean, ln, nv) =>
  mean + (nv-mean)/(ln+1);
  // (mean*ln + nv) / (ln+1);

const median = arr =>
  arr.length?
    arr.sort((a,b)=>a-b)[0|arr.length/2]
  :undefined;

const mode = arr => {
  if (!arr.length) return undefined;
  var countr = {},
      result = arr[0];
  for (let i=0; i<arr.length; i++) {
    let v = arr[i];
    countr[v] = (countr[v] || 0) + 1;
    if (countr[result] < countr[v])
      result = v;
  }
  return result;
}

module.exports = { min, max, mean, add2mean, median, mode };