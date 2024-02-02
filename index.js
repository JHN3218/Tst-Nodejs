const clog = console.log;
const {
  dlog,
  loop,
  is,
  AddObj,
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
//clog(permute('1726&£@fg',3).join('\n'));
// clipboardy.writeSync('Hello World');
const prompt = `
Response in JSON:

Today's weather.
`;
//GeminiAI(prompt,0);
// OpenAI(prompt);

// JSON.parse(jsonData))


//clog(is(56).Between(0,100));
a=[]
clog(AddObj(a,loop(10,(i,r)=>r.push(i**(i/i/2)),[])))