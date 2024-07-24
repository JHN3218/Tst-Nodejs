const
{
  ø,
  clog, dlog,
  testCheck,
  loop,
  is,
  MergeObjs,
  convertDataColToRow,
  convertDataRowToCol,
} = require('./silly-libs')
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
,regression = require('regression')
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

/*
clog(
  Σ(loop(10,(i,r)=>(r.push(i+1),r),[]),[1]),
  ΣSeq(10)
)
*/

// statistics testing
//*
const
a_x = [1,2,3,4,5,6,7],
a_y = [1,4,22,151,1050,7350,51494],
a_xy = convertDataColToRow(a_x,a_y);
clog(frln(...convertDataRowToCol(a_xy)))
// clog(regression.linear(a_xy))
// clog(regression.polynomial(a_xy))
// clog(regression.polynomial(a_xy,{order:3}))
//clog(mean(a_x,a_y))
//clog(meanProduct(a_xy))
//*/