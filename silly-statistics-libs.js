const min = arr => {
  if (!arr.length) return undefined;
  if (arr.length===1) return arr[0];
  var result = arr[0];
  for (let i=1; i<arr.length; i++)
    result = Math.min(result,arr[i]);
  return result;
}

const max = arr => {
  if (!arr.length) return undefined;
  if (arr.length===1) return arr[0];
  var result = arr[arr.length-1];
  for (let i=arr.length-2; 0<i; i--)
    result = Math.max(result,arr[i]);
  return result;
}

const mean = arr =>
  arr.length?
    arr.Σ() / arr.length
  :undefined;

module.exports = { min, max, mean };