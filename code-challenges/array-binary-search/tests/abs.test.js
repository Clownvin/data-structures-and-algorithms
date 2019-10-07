'use-strict';

const { binarySearch, recursiveBinarySearch } = require('../binary-search');

const arrays = [];

for (let i = 0; i < 10; i++) {
  const arr = [];
  for (let j = 0; j < i; j++) {
    arr[j] = j + 1;
  }
  arrays.push(arr);
}

function testSearchOnArrays(searchFunction) {
  describe(searchFunction.name, () => {
    for (const array of arrays) {
      describe(`When working with [${array}] as arr:`, () => {
        for (let i = 0; i <= array.length + 1; i++) {
          const expected = i === 0 || i === array.length + 1 ? -1 : i - 1;
          it(`Should return ${expected} after calling ${searchFunction.name}(arr, ${i})...`, () => {
            expect(searchFunction(array, i)).toEqual(expected);
          });
        }
      });
    }
  });
}

testSearchOnArrays(binarySearch);

describe('', () => {
  it('\n\n\n', () => {
    expect(true).toEqual(true);
  });
}); // To add some spaces man

testSearchOnArrays(recursiveBinarySearch);

const notAsBigArr = [];

const bigArr = [];
for (let i = 0; i < 100000000; i++) {
  if (i < 1000) {
    notAsBigArr.push(i + 1);
  }
  bigArr.push(i + 1);
}

console.log('Benchmarking worst case 100m length array');
console.time();
let i = binarySearch(bigArr, 1);
i += binarySearch(bigArr, 100000000);
console.timeEnd();

console.log('Benchmarking best case 100m length array');
console.time();
i += binarySearch(bigArr, 50000000);
i += binarySearch(bigArr, 50000000);
console.timeEnd();


console.log('Benchmarking worst case 1k length array');
console.time();
i += binarySearch(notAsBigArr, 1);
i += binarySearch(notAsBigArr, 1000);
console.timeEnd();

console.log('Benchmarking best case 1k length array');
console.time();
i += binarySearch(notAsBigArr, 500);
i += binarySearch(notAsBigArr, 500);
console.timeEnd();

console.log(i);
