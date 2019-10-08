'use-strict';
const emojis = ['🍕', '🍔', '🍩', '🍻', '🥃', '🥪', '🍜',
  '🥞', '🥓', '🌯', '🍙', '🥗', '🍨', '🍫', '☕', '🌭', '🌮', '🍗', '🍟', '🍎', '🍊', '🍉',
  '🍈', '🍄', '🍅', '🍆', '🍇', '🍋', '🍌', '🍍', '🍏',
  '🍐', '🍑', '🍒', '🍓', '🍘', '🍚', '🍛', '🍝', '🍞',
  '🍠', '🍡', '🍢', '🍣', '🍤', '🍥', '🍦', '🍧', '🍪',
  '🍬', '🍭', '🍮', '🍯', '🍰', '🍱', '🍲', '🍳', '🍴',
  '🍵', '🍶', '🍷', '🍸', '🍹', '🍺', '🍾', '🍿', '🎂',
  '🥂', '🥐', '🥑', '🥒', '🥔', '🥕', '🥖', '🥘', '🥙',
  '🥚', '🥛', '🥜', '🥝', '🥟', '🥠', '🥡', '🥢', '🥣',
  '🥥', '🥧', '🥨', '🥩', '🥫', '🧀', '🌰', '🌽'];

function getRandomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function emojify(string) {
  const emoji = getRandomEmoji();
  return `${emoji} ${string} ${emoji}`;
}

module.exports = exports = {getRandomEmoji, emojify};

