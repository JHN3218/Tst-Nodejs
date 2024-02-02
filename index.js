const clog = console.log;
const {
  dlog,
  loop,
  is,
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

const jsonData = '{"name": "John", "age": 30, "city": "New York"}';
for (k in jsObject = JSON.parse(jsonData))
  clog(`${k}: ${jsObject[k]}`);



