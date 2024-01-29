const clog = console.log;
const {dlog} = require('./silly-libs');
const {permute} = require('./permute');
const {GeminiAI} = require('./Gemini-AI');

//clog(dlog(123,'abc'));
//clog(!(''||([]).length||null));
//clog(permute('1726&£@fg',3).join('\n'));
const prompt = "based on neurologist journal, what is female neurotic response while her breast being caress."
GeminiAI(prompt);