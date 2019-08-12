const forEach = (iterable, consumer) => {
  //for (let i = 0; i < iterable.length; i++) { consumer(iterable[i]); }
  //You know, just in case you don't approve of "for-of"
  for (const item of iterable) {
    consumer(item);
  }
};

const map = (iterable, transform) => {
  const transformed = [];
  for (const item of iterable) {
    transformed.push(transform(item));
  }
  return transformed;
};

const reduce = (iterable, reducer) => {
  let accumulator;
  for (const item of iterable) {
    accumulator = reducer(accumulator, item);
  }
  return accumulator;
};

const filter = (iterable, itemFilter) => {
  const filtered = [];
  for (const item of iterable) {
    if (!itemFilter(item)) {
      continue;
    }
    filtered.push(item);
  }
  return filtered;
};

const some = (iterable, check) => {
  for (const item of iterable) {
    if (!check(item)) {
      continue;
    }
    return true;
  }
  return false;
};

module.exports = {forEach, map, reduce, filter, some};
