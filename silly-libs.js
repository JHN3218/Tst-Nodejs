const [ø, clog] = [null, console.log];

function dlog(exprVal, ...y) {
  const output = [exprVal, ...y.slice(1)];
  if (y.length && typeof y[0] === 'function')
    y[0](...output) && clog(...output);
  else {
    y[0] && output.unshift(y[0]);
    clog(...output);
  }

  return exprVal;
}

function testCheck(f, ...p) {
  try {
    return f(...p);
  } catch (err) {
    clog(err.message);
    return false;
  }
}

function MergeObjs(add = false, replace = false) {
  var result,
      MergeFunc = DeepMerge;
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
  let [i, end] = [ln[0] || 0, ln[1] || ln],
      step = ln[2] || (i<=end? 1 :-1);
  
  // Loop from i to end with the specified step, unless cond.exit is set to true.
  if (is(returnVal).Object())
    for (; !cond.exit && i < end; i += step)
      func(i, returnVal, cond);  // Execute the callback function.
  else
    for (; !cond.exit && i < end; i += step)
      returnVal = func(i, returnVal, cond);  // Execute the callback function.
  
  return returnVal;  // Return the accumulated value.
}

/*/
// 2D example (equivalent to regular matrix transpose)
const data2D = [[1, 2], [3, 4]];
console.log(transposeHigherDim(data2D, [1, 0]));
// Output: [[1, 3], [2, 4]]

// 3D example
const data3D = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]];

// Transpose first and last axes
console.log(transposeHigherDim(data3D, [2, 1, 0]));
// Output: [[[1, 5], [3, 7]], [[2, 6], [4, 8]]]

// Transpose first two axes
console.log(transposeHigherDim(data3D, [1, 0, 2]));
// Output: [[[1, 2], [5, 6]], [[3, 4], [7, 8]]]

// 4D example
const data4D = [[[[1, 2], [3, 4]], [[5, 6], [7, 8]]], [[[9, 10], [11, 12]], [[13, 14], [15, 16]]]];
console.log(transposeHigherDim(data4D));
// Output: [[[[1, 9], [5, 13]], [[3, 11], [7, 15]]], [[[2, 10], [6, 14]], [[4, 12], [8, 16]]]]

// Transpose first and last axes
console.log(transposeHigherDim(data4D, [3, 1, 2, 0]));
// Output: [[[[1, 9], [3, 11]], [[5, 13], [7, 15]]], [[[2, 10], [4, 12]], [[6, 14], [8, 16]]]]

// Transpose middle two axes
console.log(transposeHigherDim(data4D, [0, 2, 1, 3]));
// Output: [[[[1, 2], [5, 6]], [[3, 4], [7, 8]]], [[[9, 10], [13, 14]], [[11, 12], [15, 16]]]]
/*/
function transposeHigherDim(data, axes) {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  // Infer dimensions if not provided
  const dims = [];
  let current = data;
  while (Array.isArray(current)) {
    dims.push(current.length);
    current = current[0];
  }

  // If axes are not provided, default to reversing all axes
  if (!axes) {
    axes = dims.map((_, i) => dims.length - 1 - i);
  }

  // Validate axes
  if (axes.length !== dims.length || !axes.every(ax => ax >= 0 && ax < dims.length)) {
    throw new Error("Invalid axes specification");
  }

  // Generate all possible index combinations
  function* indexCombinations(dimensions, current = []) {
    if (current.length === dimensions.length) {
      yield current;
    } else {
      for (let i = 0; i < dimensions[current.length]; i++) {
        yield* indexCombinations(dimensions, [...current, i]);
      }
    }
  }

  // Helper function to get nested value
  function getNestedValue(arr, indices) {
    return indices.reduce((acc, i) => acc[i], arr);
  }

  // Helper function to set nested value
  function setNestedValue(arr, indices, value) {
    const lastIndex = indices.pop();
    const target = indices.reduce((acc, i) => acc[i], arr);
    target[lastIndex] = value;
  }

  // Create the transposed structure
  const newDims = axes.map(ax => dims[ax]);
  const transposed = [];
  for (const indices of indexCombinations(newDims)) {
    setNestedValue(transposed, indices, null);
  }

  // Fill the transposed structure
  for (const indices of indexCombinations(dims)) {
    const value = getNestedValue(data, indices);
    const newIndices = axes.map(ax => indices[ax]);
    setNestedValue(transposed, newIndices, value);
  }

  return transposed;
}

function transposeData(data) {
  return (!Array.isArray(data) || data.length === 0)?
    []
  :!Array.isArray(data[0])?
    // If the input is a single array, treat it as a row
    data.map(item => [item])
  :data[0].map((_, colIndex) => data.map(row => row[colIndex]));
}

function convertDataColToRow(...data) {
  const result = [];
  for (let i=0; i<data[0].length; i++) {
    result[i] = [];
    for (let j=0; j<data.length; j++)
      result[i].push(data[j][i]);
}
  return result;
}

function convertDataRowToCol(data) {
  const result = [];
  for (let i=0; i<data[0].length; i++)
    result[i] = [];
  for (let i=0; i<data.length; i++)
    for (let j=0; j<data[i].length; j++)
      result[j].push(data[i][j]);
  return result;
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
    Prime: () =>
      x.every((v) =>
        v%2 && v%5 &&
        loop([],)
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

module.exports = {
  ø, clog,
  dlog, testCheck,
  loop,
  is,
  MergeObjs,
  transposeData,
};
