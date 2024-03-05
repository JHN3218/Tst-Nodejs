class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;

    this.weights_ih = new Matrix(this.hiddenNodes, this.inputNodes);
    this.weights_ho = new Matrix(this.outputNodes, this.hiddenNodes);
    this.weights_ih.randomize();
    this.weights_ho.randomize();

    this.bias_h = new Matrix(this.hiddenNodes, 1);
    this.bias_o = new Matrix(this.outputNodes, 1);
    this.bias_h.randomize();
    this.bias_o.randomize();
  }

  feedforward(inputArray) {
    // Generating the hidden outputs
    let inputs = Matrix.fromArray(inputArray);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    // Activation function!
    hidden.map(sigmoid);

    // Generating the output's output!
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);

    // Sending back to the caller!
    return output.toArray();
  }

  // Training the network
  train(inputArray, targetArray) {
    // Generating the hidden outputs
    let inputs = Matrix.fromArray(inputArray);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(sigmoid);

    // Generating the output's output!
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);

    // Convert array to matrix object
    let targets = Matrix.fromArray(targetArray);

    // Calculate the error
    // ERROR = TARGETS - OUTPUTS
    let outputErrors = Matrix.subtract(targets, output);

    // let gradient = outputs * (1 - outputs);
    // Calculate gradient
    let gradients = Matrix.map(output, sigmoidGradient);
    gradients.multiply(outputErrors);
    gradients.multiply(this.lr);

    // Calculate deltas
    let hiddenT = Matrix.transpose(hidden);
    let weightHoDeltas = Matrix.multiply(gradients, hiddenT);

    this.weights_ho.add(weightHoDeltas);
    // Adjust the weights by deltas

    // Calculate the hidden errors
    let whoT = Matrix.transpose(this.weights_ho);
    let hiddenErrors = Matrix.multiply(whoT, gradients);

    // Calculate hidden gradient
    let hiddenGradient = Matrix.map(hidden, sigmoidGradient);
    hiddenGradient.multiply(hiddenErrors);
    hiddenGradient.multiply(this.lr);

    // Calculate input to hidden deltas
    let inputsT = Matrix.transpose(inputs);
    let weightIhDeltas = Matrix.multiply(hiddenGradient, inputsT);

    this.weights_ih.add(weightIhDeltas);
  }
}

// Activation function
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

// Derivative of sigmoid
function sigmoidGradient(x) {
  return x * (1 - x);
}

// Matrix class for operations
class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(Math.random() * 2 - 1));
  }

  randomize() {
    this.data.forEach((row) => {
      row.forEach((_, index) => {
        row[index] = Math.random() * 2 - 1; // Random values between -1 and 1
      });
    });
  }

  static fromArray(arr) {
    return new Matrix(arr.length, 1).map((e, i) => arr[i]);
  }

  toArray() {
    return this.data.reduce((arr, row) => arr.concat(row), []);
  }

  map(func) {
    // Apply a function to every element of matrix
    this.data.forEach((row, i) => {
      row.forEach((val, j) => {
        this.data[i][j] = func(val);
      });
    });
    return this;
  }

  static multiply(m1, m2) {
    if (m1.cols !== m2.rows) {
      throw new Error("Columns of A must match rows of B");
    }
    return new Matrix(m1.rows, m2.cols).map((e, i, j) => {
      let sum = 0;
      for (let k = 0; k < m1.cols; k++) {
        sum += m1.data[i][k] * m2.data[k][j];
      }
      return sum;
    });
  }

  add(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        throw new Error("Dimensions must match");
      }
      return this.map((e, i, j) => e + n.data[i][j]);
    } else {
      return this.map((e) => e + n);
    }
  }

  static subtract(m1, m2) {
    if (m1.rows !== m2.rows || m1.cols !== m2.cols) {
      throw new Error("Dimensions must match");
    }
    return m1.map((e, i, j) => e - m2.data[i][j]);
  }

  static transpose(matrix) {
    return new Matrix(matrix.cols, matrix.rows).map(
      (e, i, j) => matrix.data[j][i],
    );
  }
}

module.exports = { NeuralNetwork };

// Example usage
let nn = new NeuralNetwork(2, 4, 1);

// Training the network
for (let i = 0; i < 20000; i++) {
  // 0,0 => 0
  nn.train([0, 0], [0]);
  // 0,1 => 1
  nn.train([0, 1], [1]);
  // 1,0 => 1
  nn.train([1, 0], [1]);
  // 1,1 => 0
  nn.train([1, 1], [0]);
}

// Testing the network
console.log(nn.feedforward([0, 0])); // Should be close to 0
console.log(nn.feedforward([0, 1])); // Should be close to 1
console.log(nn.feedforward([1, 0])); // Should be close to 1
console.log(nn.feedforward([1, 1])); // Should be close to 0
