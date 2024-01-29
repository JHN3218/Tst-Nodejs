const clog = console.log;
const {dlog} = require('./silly-libs');
const {permute} = require('./permute');
const {GeminiTxt} = require('./Gemini-AI');

//clog(dlog(123,'abc'));
//clog(!(''||([]).length||null));
//clog(permute('1726&£@fg',3).join('\n'));
GeminiTxt('How the sky is blue?');