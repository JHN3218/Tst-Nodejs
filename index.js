const {
  ø,
  clog,
  dlog,
  test,
  loop,
  is,
  MergeObjs,
} = require("./silly-libs");
// const {clipboardy} = require('clipboardy');
const {
  permute,
  factorial,
} = require('./silly-math-libs');
const {
  GeminiAI,
  // OpenAI,
} = require('./Generative-AI');

//clog(dlog(123,'abc'));
//clog(!(''||([]).length||null));
//clog(permute('172',2).join('\n'));
// JSON.parse(jsonData))
//loop(10,()=>dlog(is(dlog(Math.round(Math.random()*100))).inRange(25,75)));
a=[{a:1,b:2,c:[7,8,9],hh:[5,5,5]}];
dlog(MergeObjs(0,1)(
      a,
      [{c:{x:1,y:2,z:3},hh:loop(10,(i,r)=>r.push(i**(i/(i/2))||0),[])}],
      [4,5,6],
  {a:1,b:2,c:3},
     ),
    'final output:');
// clipboardy.writeSync('Hello World');


const prompt = `
Response in JSON:

Today's weather.
`;
//GeminiAI(prompt,0);
// OpenAI(prompt);


