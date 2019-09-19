def binarySearch(arr, key):
  start = 0
  end = len(arr)
  index = 0
  while start < end:
    index = ((end - start) // 2) + start
    if arr[index] is key:
      break
    if arr[index] > key:
      end = index - 1
    else:
      start = index + 1
  index = ((end - start) // 2) + start
  if index not in range(len(arr)) or arr[index] is not key:
    return -1
  return index

if __name__ == '__main__':
  arrays = []
  for i in range(10):
    array = []
    for j in range(i):
      array.append(j + 1)
    arrays.append(array)

  for array in arrays:
    print(f'When working with {array} as arr:')
    for i in range(0, len(array) + 2):
      result = binarySearch(array, i)
      expected = -1 if i == 0 or i == len(array) + 1 else i - 1
      print(f'Result ({result}) should be {expected} for element {i}')
      assert result is expected
  print('All tests pass, yay!')
