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
    Math.sqrt(arr.ΣdevSq(mean) / (arr.length-1))
  :undefined;

// Correlation coefficient r
const r = (x, y ,M=[] ,S=[]) => {
  if (!x.length || !y.length) return undefined;
  var [Mx,My] = [ M[0]||mean(x), M[1]||mean(y) ],
      [Sx,Sy] = [ S[0]||sample(x,Mx), S[1]||sample(y,My) ],
      Σdev = 0;
  for (let i=0; i<x.length; i++)
    Σdev += (x[i]-Mx)*(y[i]-My);
  return Σdev / (Sx*Sy) / (x.length -1);
  // var Σx = x.Σ(),
  //     Σy = y.Σ(),
  //     Σxy = x.Σ(y),
  //     Σx2 = x.ΣdevSq(),
  //     Σy2 = y.ΣdevSq();
  // return (Σxy - Σx*Σy / x.length) / sqrt(Σx2*Σy2 / (x.length-1));
}

// equation of regression line
const frl = (x, y) => {
  if (!x.length || !y.length) return undefined;
  var Mx = mean(x), Sx = sample(x, Mx),
      My = mean(y), Sy = sample(y, My),
      r_ = r(x, y, [Mx, My], [Sx, Sy]),
      slope = r_ * Sy / Sx,
      intercept = My - slope * Mx;
  return `y = ${slope.toFixed(2)}x ${0<=intercept?'+':'-'} ${Math.abs(intercept)}`;
}

module.exports = {
  min, max,
  mean, add1mean, sub1mean, modfyMean,
  median,
  mode,
  sample,
  r, frl,
};


Array.prototype.ΣdevSq = function(m = null) {
  var Σ = 0;
  if (m===null) m = mean(this);
  for (let i=0; i<this.length; i++)
    Σ += (this[i]-m)**2;
  return Σ;
}