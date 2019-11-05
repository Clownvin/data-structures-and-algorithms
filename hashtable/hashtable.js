function javaHash(string) {
  return [...string].reduce((hash, curr) => (hash * 31) + curr.charCodeAt(0), 0);
}

/*

function sumHash(string) {
  return [...string].reduce((hash, curr) => hash + curr.charCodeAt(0), 0);
}

function mulHash(string) {
  return [...string].reduce((hash, curr) => hash * curr.charCodeAt(0), 1);
}

*/

function hashToIndex(hash, size) {
  return hash % size;
}

function createPair(key, val) {
  return {key: key, val: val};
}

function getBucket(key, buckets) {
  return buckets[hashToIndex(javaHash(key), buckets.length)];
}

function ensureString(key) {
  if (typeof key !== 'string') {
    key = JSON.stringify(key);
  }
  return key;
}

function formatValue(val) {
  if (typeof val === 'number') {
    return `${val}`;
  }
  return `"${val.toString()}"`;
}

class HashTable {
  constructor(bucketCount = 100) {
    this.buckets = Array(bucketCount);
    while (bucketCount--) {
      this.buckets[bucketCount] = [];
    }
    this.size = 0;
  }

  get(key) {
    key = ensureString(key);
    const bucket = getBucket(key, this.buckets);
    for (const pair of bucket) {
      if (pair.key === key) {
        return pair.val;
      }
    }
    return null;
  }

  hash(key) {
    return hashToIndex(javaHash(ensureString(key)), this.buckets.length);
  }

  contains(key) {
    return !!this.get(key);
  }

  put(key, val) {
    key = ensureString(key);
    const bucket = getBucket(key, this.buckets);
    for (const pair of bucket) {
      if (pair.key === key) {
        pair.val = val;
        return;
      }
    }
    bucket.push(createPair(key, val));
    this.size++;
  }

  add(key, val) {
    this.put(key, val);
  }

  update(key, val) {
    this.put(key, val); // Put already will update... makes update kind of a silly method...
  }

  remove(key) {
    key = ensureString(key);
    const bucket = getBucket(key, this.buckets);
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        const val = bucket[i].val;
        bucket.splice(i, 1);
        this.size--;
        return val;
      }
    }
    return null;
  }

  reduce(callback, acc) {
    let noAcc = typeof acc === 'undefined';
    for (const bucket of this.buckets) {
      for (const pair of bucket) {
        if (noAcc) {
          acc = pair.val;
          noAcc = false;
        } else {
          acc = callback(acc, pair.val, pair.key, this);
        }
      }
    }
    return acc;
  }

  join(joiner = ', ', linker = ': ') {
    return this.reduce((joined, val, key) => joined ? `${joined}${joiner}"${key}"${linker}${formatValue(val)}` : `"${key}"${linker}${formatValue(val)}`, '');
  }

  toString() {
    return `{\n  ${this.join(',\n  ')}\n}`;
  }

  getSize() {
    return this.size;
  }

  keys() {
    return this.buckets.reduce((keys, bucket) => keys.concat(bucket.reduce((keys, pair) => keys.push(pair.key), [])), []);
  }
}

module.exports = exports = HashTable;
