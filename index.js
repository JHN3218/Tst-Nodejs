const clog = console.log;
const dlog = require('./silly-libs');
const permute = require('./permute');

//clog(dlog(123,'abc'));
//clog(!(''||([]).length||null));
clog(permute(12345,3).join('\n'));