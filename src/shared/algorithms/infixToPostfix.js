/**
 * Infix to Postfix Conversion (Phase 1: Stack Application)
 * Implements Dijkstra's Shunting-Yard algorithm using an explicit Stack.
 * Used in ResearchSphere search/tag queries (e.g. `(Science AND Biology) OR Physics`).
 */

export function infixToPostfix(infixString) {
  const steps = [];
  const operatorStack = [];
  const outputQueue = [];

  // Precedence map
  const precedence = {
    'OR': 1,
    'AND': 2,
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };

  // Tokenize regex matching words, operators, and parentheses
  const rawTokens = infixString.match(/[A-Za-z0-9_]+|\(|\)|\+|-|\*|\/|AND|OR|NOT/g) || [];

  steps.push({
    token: 'START',
    action: `Parsed expression into ${rawTokens.length} tokens. Initialized empty operator stack.`,
    stack: [],
    output: []
  });

  for (const token of rawTokens) {
    const upper = token.toUpperCase();

    if (upper === '(') {
      operatorStack.push('(');
      steps.push({
        token,
        action: `Pushed left parenthesis '(' to operator stack.`,
        stack: [...operatorStack],
        output: [...outputQueue]
      });
    } else if (upper === ')') {
      // Pop stack until '('
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
        const popped = operatorStack.pop();
        outputQueue.push(popped);
      }
      if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] === '(') {
        operatorStack.pop(); // Remove '('
      }
      steps.push({
        token,
        action: `Encountered right parenthesis ')'. Popped operators until matching '('.`,
        stack: [...operatorStack],
        output: [...outputQueue]
      });
    } else if (precedence[upper] !== undefined) {
      // Operator
      const currentPrec = precedence[upper];
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== '(' &&
        precedence[operatorStack[operatorStack.length - 1]] >= currentPrec
      ) {
        const popped = operatorStack.pop();
        outputQueue.push(popped);
      }
      operatorStack.push(upper);
      steps.push({
        token,
        action: `Operator '${upper}' (prec ${currentPrec}). Popped higher/equal precedence operators, then pushed '${upper}'.`,
        stack: [...operatorStack],
        output: [...outputQueue]
      });
    } else {
      // Operand (keyword or topic name)
      outputQueue.push(token);
      steps.push({
        token,
        action: `Operand '${token}' sent directly to postfix output queue.`,
        stack: [...operatorStack],
        output: [...outputQueue]
      });
    }
  }

  // Pop remaining operators from stack
  while (operatorStack.length > 0) {
    const popped = operatorStack.pop();
    if (popped !== '(' && popped !== ')') {
      outputQueue.push(popped);
    }
  }

  steps.push({
    token: 'END',
    action: `Exhausted all input tokens. Popped remaining operators from stack to output.`,
    stack: [],
    output: [...outputQueue]
  });

  return {
    rawTokens,
    postfixArray: outputQueue,
    postfixString: outputQueue.join(' '),
    steps
  };
}
