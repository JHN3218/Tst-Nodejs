const clog = console.log;
const {
  dlog,
} = require('./silly-libs');
// const {clipboardy} = require('clipboardy');
//const {permute} = require('./permute');
const {
  GeminiAI,
  OpenAI,
} = require('./Generative-AI');

//clog(dlog(123,'abc'));
//clog(!(''||([]).length||null));
//clog(permute('1726&£@fg',3).join('\n'));
// clipboardy.writeSync('Hello World');
const prompt = `
Please introduce yourself.
`;
GeminiAI(prompt,0);
// OpenAI(prompt);