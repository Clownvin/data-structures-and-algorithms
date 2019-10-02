const { Stack } = require('../../stacks-and-queues/stacks-and-queues');

function getOpener(char) {
  switch (char) {
  case ']':
    return '[';
  case ')':
    return '(';
  case '}':
    return '{';
  case '>':
    return '<';
  }
}

module.exports = exports = (string) => {
  const recentOpeners = new Stack();
  for (const char of string) {
    if (/[[{(<]/.test(char)) {
      recentOpeners.push(char);
    } else if (/[\]})>]/.test(char)) {
      if (recentOpeners.getSize() === 0) {
        return false;
      }
      return recentOpeners.pop() === getOpener(char);
    }
  }
  return recentOpeners.getSize() === 0;
};
