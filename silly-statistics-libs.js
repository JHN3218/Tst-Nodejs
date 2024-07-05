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

const mean = (...arr) =>
  // arr = [[x],[y],[z],…]
  arr.length===1 ?
    arr[0].Σ() / arr[0].length
  :1<arr.length ?
    arr[0].reduce((sum, _, j) => 
      sum + arr.reduce((prod, a) =>
            prod * a[j], 1) ,0)
      / arr[0].length
  :undefined;

const add1mean = (mean, ln, nv) =>
  mean + (nv-mean)/(ln+1);
  // (mean*ln + nv) / (ln+1);

const sub1mean = (mean, ln, nv) =>
  mean + (mean-nv)/(ln-1);
  // (mean*ln - nv) / (ln-1);

const modfyMean = (mean, ln, nvarr, inc=true) => {
  mean *= ln;
  for (let i=0; 0<ln && i<nvarr.length; i++) {
    mean += nvarr[i];
    ln += inc || 0<=nvarr[i]? 1 :-1;
  }
  // ensure ln is positive
  return 0<ln? undefined
    :mean/ln;
}

const meanPerPos = (...coord) =>
  // coord = [[x_i,y_i,z_i,…],…]
  coord[0].map((_, i) => 
    coord.reduce((sum, c) =>
    sum + c[i], 0)
    / coord.length
  );

const meanProduct = (...coord) =>
  coord.reduce((sum, pos) =>
    sum + pos.reduce((prod, v) =>
          prod * v, 1), 0)
    / coord.length;

const median = arr =>
  arr.length?
    arr.sort((a,b)=>a-b)[0|arr.length/2]
  :undefined;

const mode = arr => {
  if (!arr.length) return undefined;
  const countr = {};
  var result = arr[0];
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
  const [Mx,My] = [ M[0]||mean(x), M[1]||mean(y) ],
        [Sx,Sy] = [ S[0]||sample(x,Mx), S[1]||sample(y,My) ];
  var ΣAdev = 0; // sum of deviation area
  for (let i=0; i<x.length; i++)
    ΣAdev += (x[i]-Mx)*(y[i]-My);
  return ΣAdev / (Sx*Sy) / (x.length -1);
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
  const Mx = mean(x), Sx = sample(x, Mx),
        My = mean(y), Sy = sample(y, My),
        r_ = r(x, y, [Mx, My], [Sx, Sy]),
        slope = r_ * Sy / Sx,
        // (Mx*My - Mxy)/(Mx**2 - M_xSq)
        // (Mx*y - Mx*My)/(M_xSq - Mx**2)
        intercept = My - slope * Mx;
  clog(`y = ${slope.toFixed(2)}x ${0<=intercept?'+':'-'} ${Math.abs(intercept)}`);
  return {m:slope,b:intercept};
}

module.exports = {
  min, max,
  mean, add1mean, sub1mean, modfyMean,
  meanPerPos, meanProduct,
  median,
  mode,
  sample,
  r, frl,
};


Array.prototype.ΣdevSq = function(m = null) {
  let Σ = 0;
  if (m===null) m = mean(this);
  for (let i=0; i<this.length; i++)
    Σ += (this[i]-m)**2;
  return Σ;
}