"""
Phase 1: Core Data Handling
Concept: Infix to Postfix Converter (Shunting-Yard Algorithm) (Python)

Real-world application:
Dynamic research filter queries (e.g. 'department == DS and publications > 5').
The Shunting-Yard algorithm uses an operator stack to produce unambiguous
Reverse Polish Notation (Postfix) respecting operator precedence.

Time Complexity: O(n) where n is the number of tokens
Space Complexity: O(n) for operator stack and output buffer
"""

import re
from typing import List, Dict, Tuple

PRECEDENCE: Dict[str, int] = {
    'OR': 1,
    'AND': 2,
    '>': 3,
    '<': 3,
    '=': 3,
    '==': 3,
    '>=': 3,
    '<=': 3,
    '!=': 3,
    '+': 4,
    '-': 4,
    '*': 5,
    '/': 5,
}

def tokenize(expression: str) -> List[str]:
    """Tokenize boolean and relational expressions."""
    pattern = r'[A-Za-z_][A-Za-z0-9_]*|\d+|>=|<=|!=|==|[()><=+\-*/]'
    return re.findall(pattern, expression)

def infix_to_postfix(expression: str) -> Tuple[List[str], List[dict]]:
    """
    Convert an infix expression to postfix notation using an operator stack.
    Returns:
        (postfix_tokens, step_trace)
    """
    tokens = tokenize(expression)
    output: List[str] = []
    stack: List[str] = []
    trace: List[dict] = []

    for token in tokens:
        upper = token.upper()
        is_op = upper in PRECEDENCE

        if is_op:
            curr_prec = PRECEDENCE[upper]
            while stack and stack[-1] != '(' and PRECEDENCE.get(stack[-1], 0) >= curr_prec:
                output.append(stack.pop())
            stack.append(upper)
            trace.append({
                'token': token,
                'action': f"Pushed operator '{upper}'",
                'stack': list(stack),
                'output': list(output),
            })
        elif token == '(':
            stack.append(token)
            trace.append({
                'token': token,
                'action': "Pushed '('",
                'stack': list(stack),
                'output': list(output),
            })
        elif token == ')':
            while stack and stack[-1] != '(':
                output.append(stack.pop())
            if stack and stack[-1] == '(':
                stack.pop()  # Discard '('
            trace.append({
                'token': token,
                'action': "Popped until '('",
                'stack': list(stack),
                'output': list(output),
            })
        else:
            # Operand (identifier or literal value)
            output.append(token)
            trace.append({
                'token': token,
                'action': f"Appended operand '{token}' to output",
                'stack': list(stack),
                'output': list(output),
            })

    # Flush remaining operators in stack
    while stack:
        op = stack.pop()
        if op not in ('(', ')'):
            output.append(op)

    trace.append({
        'token': 'EOF',
        'action': 'Flushed remaining operators',
        'stack': [],
        'output': list(output),
    })

    return output, trace

if __name__ == '__main__':
    expr = "(citations > 30 OR publications > 8) AND department = CS"
    print(f"=== Demo: Infix to Postfix Converter ===")
    print(f"Infix Input: {expr}\n")

    postfix_tokens, steps = infix_to_postfix(expr)
    print("Execution Trace (first 5 steps):")
    for s in steps[:5]:
        print(f"  Token: {s['token']:<12} Action: {s['action']:<32} Stack: {s['stack']}")

    print(f"\nFinal Postfix Result (RPN): {' '.join(postfix_tokens)}")
