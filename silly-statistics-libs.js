const { clog, dlog } = require('./silly-libs')

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

const add1mean = (mean, ln, nv) =>
  mean + (nv-mean)/(ln+1);
  // (mean*ln + nv) / (ln+1);

const sub1mean = (mean, ln, nv) =>
  mean + (mean-nv)/(ln-1);
  // (mean*ln - nv) / (ln-1);

const modfyMean = (mean, ln, nvarr) => {
  var Σnv = 0;
  mean *= ln;
  for (let i=0; i<nvarr.length; i++) {
    Σnv += nvarr[i];
    ln += 0<=nvarr[i]? 1 :-1;
  }
  return (mean+Σnv) / ln;
}

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

const sample = (arr, mean = null) =>
  arr.length?
    sqrt(arr.ΣdevSq(mean) / (arr.length-1))
  :undefined;

module.exports = {
  min, max,
  mean, add1mean, sub1mean, modfyMean,
  median,
  mode,
  sample,
};


Array.prototype.ΣdevSq = function(m = null) {
  var Σ = 0;
  if (m===null) m = mean(this);
  for (let i=0; i<this.length; i++)
    Σ += (this[i]-m)**2;
  return Σ;
}