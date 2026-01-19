const
{
  ø,
  clog, dlog,
  testCheck,
  loop,
  is,
  MergeObjs,
  transposeData,
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
  round, log,
  logarithm,
  π_ish, π_adjust,
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
,MarkovChain = require('./markov')
//,{
//  GeminiAI,
  // OpenAI,
  // ClaudeAI,
//} = require('./Generative-AI')
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
/*/
const
a_x = [1,2,3,4,5,6,7],
a_y = [1,4,22,151,1050,7350,51494],
// a_z = [11,22,33,44,55,66,77],
// a_w = [41,42,43,44,45,46,47]
a_xy = transposeData([a_x,a_y]);
clog(frln(...transposeData(a_xy)))
clog(regression.linear(a_xy))
clog(transposeData([a_x,a_y,a_z]))
// clog(regression.polynomial(a_xy,{precision:0}))
// clog(regression.polynomial(a_xy,{order:3, precision:0}))
// clog(regression.polynomial(dlog(a_xy.splice(0,4)),{order:3, precision:0}))//clog(mean(a_x,a_y))
// clog(meanProduct(a_xy))
/*/

/*/
a_xy=loop(20+1,(i,r)=>r.push([i,π_adjust(i)]),[])
predict=dlog(regression.polynomial(a_xy,{order:2, precision:0})).predict
loop(20+1,i=>{
  y=predict(i)
  clog(...y,a_xy[i][1])
  clog(y[1]/a_xy[i][1])
})
/*/
// clog(π_ish(17))

/*
cex=false
tbl=([5,5,7,10,15,20]).map(v=>(100-v)/100)
clog(tbl)
for(let l=1;l<=17;l++) {
// l=17
ttl=l==17?1000:500
// clog(l,ttl)
for(let i=l-1;i>0;i--){
  up=i>tbl.length?
    tbl[tbl.length-1]
    :tbl[i-1]
  ttl=Math.ceil(ttl/up)
  // clog(i,up,ttl)
}
// clog('---')
clog(l,ttl,(ttl*5e4).toLocaleString('en'),(ttl*5e4*185).toLocaleString('en'))
if (!cex) continue
clog('---')
clog(1,ttl)
// ttl=1500
for(let i=1;i<l;i++){
  down=i>tbl.length?
    tbl[tbl.length-1]
    :tbl[i-1]
  ttl=Math.floor(ttl*down)
  clog(i+1,down,ttl)
}
}
*/

// Example usage:
const text = [
  "the cat sat on the mat",
  "the cat ate the rat",
  "the dog sat on the log",
  "the dog ate the cat"
].join(". ");

const mc = new MarkovChain(1); // order 1 (bigram)
mc.addText(text);
clog(mc.generate(20));
