module.exports = permute;

function permute(arr, a = '') {
  if (arr.length === 1) {
    console.log(a + arr.join(''));
    return;
  }

  if (typeof arr == 'string') arr = arr.split('');

  for (let i in arr) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    permute(arr.slice(1), a + arr[0]);
  }
}