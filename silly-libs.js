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
  let result;
  let MergeFunc = DeepMerge;
  return (...objs) => {
    result = structuredClone(objs[0]);
    if (1 < objs.length) {
      if (is(add).Function()) MergeFunc = DeepMergeFunc;
      for (const obj of objs.slice(1)) result = MergeFunc(result, obj);
    }
    return result;
  };

  function DeepMerge(result, obj) {
    for (const [ky, val] of Object.entries(obj)) {
      if (!add && !replace && ky in result) continue;
      if (add && !replace && is(result, obj).Array()) {
        result.push(...obj);
        break;
      }
      if (!is(val).Object())
        result[ky] =
          add && replace
            ? is(result[ky], val).RealNum()
              ? result[ky] + val
              : is(result[ky]).Object()
                ? DeepMerge(
                    result[ky],
                    Array.isArray(val)
                      ? (((a = [])[ky] = val), a)
                      : { [ky]: val },
                  )
                : val
            : add
              ? (result[ky] || 0) + val
              : val;
      else
        result[ky] =
          add && !replace
            ? is(result[ky], val).Array()
              ? [...(result[ky] || []), ...val]
              : DeepMerge(result[ky] || {}, val)
            : DeepMerge(result[ky] || (Array.isArray(val) && []) || {}, val);
    }
    return result;
  }

  function DeepMergeFunc(result, obj) {
    for (const [ky, val] of Object.entries(obj)) {
      if (!replace && ky in result) continue;
      result[ky] = !is(result[ky], val).Object()
        ? add(result, ky, val, replace)
        : DeepMergeFunc(result[ky] || (Array.isArray(val) && []) || {}, val);
    }
    return result;
  }
}

function loop(ln, func, returnVal = 0) {
  let cond = { exit: false };
  let [i, end, step] = [ln[0] || 0, ln[1] || ln, ln[2] || 1];
  for (; !cond.exit && i < end; i += step) func(i, returnVal, cond);
  return returnVal;
}

function is(...x) {
  const members = {
    Any: (...y) => x.some((v) => y.includes(v)),
    All: (...y) => x.every((v) => y.includes(v)),
    Between: (lo, hi) => x.every((v) => lo < v && v < hi),
    inRange: (lo, hi) => x.every((v) => lo <= v && v <= hi),
    Undefined: () => x.every((v) => typeof v === "undefined"),
    Nøl: () => x.every((v) => !v || !v.length),
    Boolean: () => x.every((v) => typeof v === "boolean"),
    Primitive: () => x.every((v) => typeof v !== "object"),
    Number: () => x.every((v) => typeof +v === "number"),
    RealNum: () =>
      x.every((v) => ((v = +v), typeof v === "number" && !isNaN(v))),
    Integer: () =>
      x.every(
        (v) => (
          (v = +v), typeof v === "number" && Number.isInteger(v) && !isNaN(v)
        ),
      ),
    Floating: () =>
      x.every(
        (v) => (
          (v = +v), typeof v === "number" && !Number.isInteger(v) && !isNaN(v)
        ),
      ),
    // Complex: () => x.every((v) => typeof v === "number" && !Number.isInteger(v) && !isNaN(v)),
    // imaginary: () => x.every((v) => typeof v === "number" && !Number.isInteger(v) && !isNaN(v) && v.imaginary),
    NaN: () => x.every((v) => ((v = +v), typeof v === "number" && isNaN(v))),
    String: () => x.every((v) => typeof v === "string"),
    Symbol: () => x.every((v) => typeof v === "symbol"),
    Array: () => x.every((v) => Array.isArray(v)),
    Function: () => x.every((v) => typeof v === "function"),
    Object: () => x.every((v) => typeof v === "object"),
    Date: () => x.every((v) => is(v).Object() && v instanceof Date),
    RegExp: () => x.every((v) => is(v).Object() && v instanceof RegExp),
  };
  Object.freeze(members);
  return members;
}

module.exports = { ø, clog, dlog, test, loop, is, MergeObjs };
