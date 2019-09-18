# Challenge Summary
Take an array, and insert a value into the middle without using array methods like splice.

## Approach & Efficiency
Create a new array, and while iterating over the original array to copy into the new array, once we hit the "midpoint", insert the new value and continue.

Big O complexity is O(n)

## Solution
I solved it in 4 languages, but here's the JS version:

(arr, val) => {
  const newArr = [];
  if (arr.length === 0) {
    newArr.push(val);
  }
  const halfway = Math.floor(arr.length / 2);
  for (let i = 0; i < arr.length; i++) {
    if (i === halfway) {
      newArr.push(val);
    }
    newArr.push(arr[i]);
  }
  return newArr;
}
