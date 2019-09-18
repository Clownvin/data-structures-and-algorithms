public class ArrayShift {
  public static void main(String[] args) {
    Object[] arr = new Object[0];
    arr = insertShiftArray(arr, 1);
    System.out.print("Should be [1]: ");
    printArr(arr);
    assert arr.equals(new Object[] {1});
    arr = insertShiftArray(arr, 2);
    System.out.print("Should be [2, 1]: ");
    printArr(arr);
    assert arr.equals(new Object[] {2, 1});
    arr = insertShiftArray(arr, 3);
    System.out.print("Should be [2, 3, 1]: ");
    printArr(arr);
    assert arr.equals(new Object[] {2, 3, 1});
    System.out.println("Good to go! All tests pass");
  }

  public static <T> void printArr(T[] arr) {
    System.out.print("[");
    for (int i = 0; i < arr.length; i++) {
      System.out.print(arr[i] + (i < arr.length - 1 ? ", " : ""));
    }
    System.out.println("]");
  } 

  //Array was throw cast exceptions with generics... a bit strange, don't
  //remember having trouble casing generic arrays before...
  public static Object[] insertShiftArray(Object[] arr, Object val) {
    Object[] newArr = new Object[arr.length + 1];
    if (arr.length == 0) {
      newArr[0] = val;
    }
    int arrLen = arr.length;
    for (int i = 0, j = 0; j < arrLen; i++, j++) {
      if (i == arrLen / 2) {
        newArr[i++] = val;
      }
      newArr[i] = arr[j];
    }
    return newArr;
  }
}