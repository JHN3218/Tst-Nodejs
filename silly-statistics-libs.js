const { ø, clog, dlog } = require('./silly-libs')

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

const mean = (...arr) => {
  // arr = [[x],[y],[z],…]
  if (!arr.length) return undefined;
  var sum;
  if (arr.length==1) sum = arr[0].Σ();
  else if (typeof arr[arr.length-1] === 'function') {
    const f = arr.pop();
    sum = arr[0].reduce((Σ, _, j) =>
          Σ + arr.reduce((prod, a) =>
              f(prod,a[j]), 1), 0);
  } else
    sum = arr[0].reduce((Σ, _, j) => 
          Σ + arr.reduce((prod, a) =>
              prod * a[j], 1), 0);
  return sum / arr[0].length;
};

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

const sample = (arr, mean=ø) =>
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
const frln = (x, y) => {
  if (!x.length || !y.length) return undefined;
  const [Mx,My] = [mean(x),mean(y)],
        M_xSq = mean(x,x), Mxy = mean(x,y),
        slope = (Mx*My - Mxy)/(Mx**2 - M_xSq),
        // (Mxy - Mx*My)/(M_xSq - Mx**2),
        // [Sx,Sy] = [sample(x, Mx),sample(y, My)],
        // r_ = r(x, y, [Mx, My], [Sx, Sy]),
        // slope = r_ * Sy / Sx,
        intercept = My - slope*Mx,
        [m,b] = [slope,intercept];
  clog(`y = ${m.toFixed(2).replace(/\.?0*$/,'')}x ${0<=b?'+':'-'} ${Math.abs(b)}`);
  return {m,b};
}

module.exports = {
  min, max,
  mean, add1mean, sub1mean, modfyMean,
  meanPerPos, meanProduct,
  median,
  mode,
  sample,
  r, frln,
};


Array.prototype.ΣdevSq = function(m=ø) {
  let Σ = 0;
  if (m===ø) m = mean(this);
  for (let i=0; i<this.length; i++)
    Σ += (this[i]-m)**2;
  return Σ;
}