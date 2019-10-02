# Multi-Bracket-Validation
It's a single function that validates whether a string of any length with any amount of braces/brackets (()[]{}) all have matching pairs.
So:
* [] -> True
* {} -> True
* () -> True
* ()[]{} -> True
* ([]{}) -> True
* { -> False
* } -> False
* {] -> False,
* etc..

## Approach & Efficiency
Wrote a function that takes a string
Any opening bracket/brace gets pushed onto a stack
Whenever we encounter a closing brace, make sure that it matches the bracket/brace that gets popped off the stack.
If at any time it can't pop because stack is empty, or if it exits loop and stack is not empty, return false.

## API
### validateBrackets(string)
Makes sure that any open bracket/brace has a proper closing bracket/brace.