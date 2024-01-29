const clog = console.log;
const {dlog} = require('./silly-libs');
// const clipboardy = require('clipboardy');
const {permute} = require('./permute');
const {GeminiAI} = require('./Generative-AI');

//clog(dlog(123,'abc'));
//clog(!(''||([]).length||null));
//clog(permute('1726&£@fg',3).join('\n'));
// clipboardy.writeSync('Hello World');
const prompt = `
how to import module in node.js using import instead of require().
`;
GeminiAI(prompt,0);