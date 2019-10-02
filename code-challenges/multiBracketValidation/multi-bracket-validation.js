const { Stack } = require('../../stacks-and-queues/stacks-and-queues');

const pairs = {'[': ']', '{': '}', '(': ')', '<': '>'};

function isOpener(char) {
  return char in pairs;
}

function getOpener(char) {
  for (const [opener, closer] of Object.entries(pairs)) {
    if (closer === char) {
      return opener;
    }
  }
}

module.exports = exports = (string) => {
  const recentOpeners = new Stack();
  for (const char of string) {
    if (isOpener(char)) {
      recentOpeners.push(char);
    }
    const opener = getOpener(char);
    if (opener && (recentOpeners.getSize() === 0 || opener !== recentOpeners.pop())) {
      return false;
    }
  }
  return recentOpeners.getSize() === 0;
};
