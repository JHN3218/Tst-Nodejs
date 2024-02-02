const clog = console.log;
const {
  dlog,
  //loop,
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
Please introduce yourself.
`;
//GeminiAI(prompt,0);
// OpenAI(prompt);

clog((123).length);