def insertShiftArray(arr, value):
  newArr = []
  if len(arr) is 0:
    newArr.append(value)
    return newArr
  arrLen = len(arr)
  for i in range(arrLen):
    if i is arrLen // 2:
      newArr.append(value)
    newArr.append(arr[i])
  return newArr

if __name__ == '__main__':
  arr = []
  arr = insertShiftArray(arr, 1)
  print(f'Should be [1]: {str(arr)}')
  assert arr == [1]
  arr = insertShiftArray(arr, 2)
  print(f'Should be [2, 1]: {str(arr)}')
  assert arr == [2, 1]
  arr = insertShiftArray(arr, 3)
  print(f'Should be [2, 3, 1]: {str(arr)}')
  assert arr == [2, 3, 1]
  print('Good to go! All tests pass')