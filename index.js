const
{
  ø,
  clog, dlog,
  testCheck,
  loop,
  is,
  MergeObjs,
} = require("./silly-libs")
// ,{clipboardy} = require('clipboardy')
,{
  permute, combination, permbinate,
  fibonacci,
  factorial,
  P, C,
  Σ, Π,
  ΣΠ, ΣSeq,
  tst,
} = require('./silly-math-libs')
,{
  min, max,
  mean, add1mean, sub1mean, modfyMean,
  meanPerPos, meanProduct,
  median,
  mode,
  sample,
  r, frln
} = require('./silly-statistics-libs')
,{
  GeminiAI,
  // OpenAI,
  // ClaudeAI,
} = require('./Generative-AI')
// ,NeuralNetwork = require('./NN')

//clog(dlog(123,'abc'));
//clog(!(''||([]).length||ø));
// clog(permbinate('abc'.split('')))
// JSON.parse(jsonData))
//loop(10,()=>dlog(is(dlog(Math.round(Math.random()*100))).inRange(25,75)));
// a=[{a:1,b:2,c:[7,8,9],hh:[5,5,5]}];
// dlog(MergeObjs(1)(
//       a,
//       [{c:{x:1,y:2,z:3},hh:loop(10,(i,r)=>r.push(i**(i/(i/2))||0),[])}],
//       [4,5,6],
//       [{a:1,b:2,c:3}],
//      ),
//     'final output:');
// clipboardy.writeSync('Hello World');


const prompt = `
create 2 proofs for the equation by modifying each sides (LHS & RHS):
(ml+x)/(l+1)=m+(x-m)/(l+1)
`;
// GeminiAI(prompt);
// OpenAI(prompt);
// ClaudeAI(prompt);

// tst(.5)

clog(
  Σ([1,2,3,4,5,6,7,8,9,10],[1]),
  ΣSeq(10)
)


// statistics testing
/*
const
a_x = [1,2,2,3],
a_y = [1,2,3,6],
a_xy = [
  [1,1],
  [2,2],
  [2,3],
  [3,6],
];
clog(frln(a_x,a_y))
clog(mean(a_x,a_y))
clog(meanProduct(a_xy))
*/