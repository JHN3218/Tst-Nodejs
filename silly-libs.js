const [ø, clog] = [null, console.log];

function dlog(exprVal, ...y) {
  let output = [];
  if (y.length) output.push("" + y[0]);
  output.push(exprVal, ...y.slice(1));
  clog(...output);
  return exprVal;
}

function test(f) {
  try {
    return f();
  } catch (err) {
    clog(err.message);
    return false;
  }
}

function MergeObjs(add = false, replace = false) {
  var result;
  return (...objs) => {
    for (const obj of objs) {
      if (!is(result).Object()) result = is(obj).Array() ? [] : {};
      result = DeepMerge(result, obj);
    }
    return result;
  };

  function DeepMerge(obj1, obj2) {
    let obj = structuredClone(obj1);
    for (const [ky, val] of Object.entries(obj2)) {
      if (!add && !replace && ky in obj) continue;
      if (!is(val).Object())
        obj[ky] =
          add && replace
            ? is(obj[ky]).Number()
              ? obj[ky] + val
              : val
            : add
              ? (obj[ky] || 0) + val
              : val;
      else
        obj[ky] =
          add && !replace
            ? Array.isArray(val)
              ? [...(obj[ky] || []), ...val]
              : DeepMerge(obj[ky] || {}, val)
            : DeepMerge(obj[ky] || (Array.isArray(val) && []) || {}, val);
    }
    return obj;
  }
}

function loop(ln, func, returnVal = 0) {
  let cond = { exit: false };
  let [i, end, step] = [ln[0] || 0, ln[1] || ln, ln[2] || 1];
  for (; !cond.exit && i < end; i += step) returnVal = func(i, returnVal, cond);
  return returnVal;
}

function is(...x) {
  const members = {
    Any: (...y) => x.some((v) => y.includes(v)),
    All: (...y) => x.every((v) => y.includes(v)),
    Between: (lo, hi) => x.every((v) => lo <= v <= hi),
    Nøl: () => x.every((v) => !v || !v.length),
    Array: () => x.every((v) => Array.isArray(v)),
    Boolean: () => x.every((v) => typeof v === "boolean"),
    Function: () => x.every((v) => typeof v === "function"),
    Object: () => x.every((v) => typeof v === "object"),
    Number: () => x.every((v) => typeof v === "number"),
    String: () => x.every((v) => typeof v === "string"),
    Symbol: () => x.every((v) => typeof v === "symbol"),
    Undefined: () => x.every((v) => typeof v === "undefined"),
    Date: () => x.every((v) => is(v).Object() && v instanceof Date),
    RegExp: () => x.every((v) => is(v).Object() && v instanceof RegExp),
  };
  Object.freeze(members);
  return members;
}

module.exports = { ø, clog, dlog, test, loop, is, MergeObjs };
