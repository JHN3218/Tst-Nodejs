// markov.js
class MarkovChain {
  constructor(order = 1) {
    this.order = order;               // n-gram order
    this.model = new Map();           // Map<stateString, Map<nextToken, count>>
    this.START = "__START__";
    this.END = "__END__";
  }

  // tokenize text into words (simple split; customize for punctuation)
  tokenize(text) {
    return text
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean);
  }

  // add training text (string)
  addText(text) {
    const tokens = [this.START, ...this.tokenize(text), this.END];
    for (let i = 0; i <= tokens.length - this.order - 1; i++) {
      const state = tokens.slice(i, i + this.order).join("|");
      const next = tokens[i + this.order];
      if (!this.model.has(state)) this.model.set(state, new Map());
      const nextMap = this.model.get(state);
      nextMap.set(next, (nextMap.get(next) || 0) + 1);
    }
  }

  // choose next token from state's distribution
  weightedChoice(nextMap) {
    const entries = Array.from(nextMap.entries());
    const total = entries.reduce((s, [, c]) => s + c, 0);
    let r = Math.random() * total;
    for (const [token, count] of entries) {
      r -= count;
      if (r < 0) return token;
    }
    return entries[entries.length - 1][0];
  }

  // generate text up to maxTokens
  generate(maxTokens = 50) {
    let state = this.START;
    const output = [];
    for (let i = 0; i < maxTokens; i++) {
      const nextMap = this.model.get(state);
      if (!nextMap) break;
      const next = this.weightedChoice(nextMap);
      if (next === this.END) break;
      output.push(next);
      const parts = state.split("|").slice(1); // drop first, shift left
      parts.push(next);
      state = parts.join("|");
      if (this.order === 1) state = next; // simpler for order 1
    }
    return output.join(" ");
  }
}

module.exports = MarkovChain;