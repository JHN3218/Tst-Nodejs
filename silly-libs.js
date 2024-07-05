const [ø, clog] = [null, console.log];

function dlog(exprVal, ...y) {
  let output = [];
  if (y.length) {
    output.push(exprVal, ...y.slice(1));
    let f = y[0];
    if (is(f).Function()) {
      f(...output) && clog(...output);
      return exprVal;
    } else
      output.unshift("" + f);
  }
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
      // clog("result", result);
      // clog("result", "[" + ky + "]:", result[ky]);
      // clog("val:", val);
      if (!add && !replace && ky in result) continue;
      if (add && !replace && is(result, obj).Array()) {
        result.push(...obj);
        break;
      }
      if (!is(val).Object())
        result[ky] =
          add && replace
            ?is(result[ky], val).RealNum()
              ?result[ky] + val
            :is(result[ky]).Object()
              ?DeepMerge(
                  result[ky],
                  Array.isArray(val)
                    ?(((a = [])[ky] = val), a)
                  :{ [ky]: val },
                )
            :val
          :add
            ?(result[ky] || 0) + val
          :val;
      else
        result[ky] =
          add && !replace
            ?is(val).Array()
              ?[...(result[ky] || []), ...val]
              :DeepMerge((is(result[ky]).Object() && result[ky]) || {}, val)
            :DeepMerge(
              (is(result[ky]).Object() && result[ky]) ||
                (Array.isArray(val) && []) ||
                {},
              val,
            );
    }
    return result;
  }

  function DeepMergeFunc(result, obj) {
    for (const [ky, val] of Object.entries(obj)) {
      if (!replace && ky in result) continue;
      result[ky] = !is(result[ky], val).Object()
        ?add(result, ky, val, replace)
        :DeepMergeFunc(result[ky] || (Array.isArray(val) && []) || {}, val);
    }
    return result;
  }
}

/**
 * A flexible looping function that allows for custom iteration and early exit.
 * 
 * @param {number[]|number} ln - Loop parameters: [start, end, step] or just end
 * @param {function} func - Callback function to execute in each iteration
 * @param {*} [returnVal=0] - Initial value to be passed to and potentially modified by the callback
 * @returns {*} The final value of returnVal after all iterations
 *
 * @callback loopCallback
 * @param {number} i - Current iteration index
 * @param {*} returnVal - Value that can be modified and returned
 * @param {{ exit: boolean }} cond - Object with 'exit' property to control loop termination
 */
function loop(ln, func, returnVal = 0) {
  let cond = { exit: false };  // Object to control early exit of the loop.
  
  // Destructuring ln to determine start, end, and step values.
  let [i, end, step] = [ln[0] || 0, ln[1] || ln, ln[2] || 1];
  
  // Loop from i to end with the specified step, unless cond.exit is set to true.
  for (; !cond.exit && i < end; i += step)
    func(i, returnVal, cond);  // Execute the callback function.
  
  return returnVal;  // Return the accumulated value.
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
