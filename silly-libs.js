const clog = console.log;

function dlog(exprVal, ...y) {
  let output = [
    (y.length ? "" + y[0] + (y[1] || ": ") : "") + exprVal,
    ...y.slice(2),
  ];
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

function MergeObj(obj1, obj2, add = false, replace = false) {
  let obj = structuredClone(obj1);
  for (const [ky, val] of Object.entries(obj2)) {
    if (!add && !replace && ky in obj) continue;
    if (!is(val).Object() && !(add && replace)) {
      obj[ky] = add ? (obj[ky] || 0) + val : val;
      continue;
    }

    if (add && replace) {
      if (is(val).Object()) {
        if (Array.isArray(val)) {
          obj[ky] = obj[ky] || [];
          for (const [i, v] of val.entries())
            obj[ky][i] = (obj[ky][i] || 0) + v;
        } else obj[ky] = MergeObj(obj[ky] || {}, val, add, replace);
      } else {
        if (is(obj[ky], val).Number()) obj[ky] += val;
        else obj[ky] = val;
      }
    } else if (add && !replace) {
      obj[ky] = Array.isArray(val)
        ? [...obj[ky], ...val]
        : MergeObj(obj[ky] || {}, val, add, replace);
    } else {
      obj[ky] = MergeObj(
        obj[ky] || (Array.isArray(val) && []) || {},
        val,
        add,
        replace,
      );
    }
  }
  return obj;
}

function loop(ln, func, returnVal = 0, cond = { exit: false }) {
  [i, end, step] = [ln[0] || 0, ln[1] || ln, ln[2] || 1];
  for (; !cond.exit && i < end; i += step) func(i, returnVal, cond);
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
    Date: () => x.every((v) => is(v).Object() && v instanceof Date),
    Function: () => x.every((v) => typeof v === "function"),
    Object: () => x.every((v) => typeof v === "object"),
    Number: () => x.every((v) => typeof v === "number"),
    String: () => x.every((v) => typeof v === "string"),
    Symbol: () => x.every((v) => typeof v === "symbol"),
    Undefined: () => x.every((v) => typeof v === "undefined"),
  };
  // Object.freeze(members);
  return members;
}

module.exports = { clog, dlog, test, loop, is, MergeObj };
