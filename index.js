const
{
  ø,
  clog,
  dlog,
  test,
  loop,
  is,
  MergeObjs,
} = require("./silly-libs")
// ,{clipboardy} = require('clipboardy')
,{
  permute,
  factorial,
} = require('./silly-math-libs')
,{
  GeminiAI,
  // OpenAI,
} = require('./Generative-AI')
,NeuralNetwork = require('./NN')

//clog(dlog(123,'abc'));
//clog(!(''||([]).length||null));
//clog(permute('172',2).join('\n'));
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
explain how this equation is true
(ab+10b)÷10=b(1+a/10)
`;
// GeminiAI(prompt);
// OpenAI(prompt);


// provide optional config object (or undefined). Defaults shown.
const config = {
  binaryThresh: 0.5,
  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
};

// create a simple feed-forward neural network with backpropagation
const net = new brain.NeuralNetwork(config);

net.train([
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
]);

const output = net.run([1, 0]); // [0.987]