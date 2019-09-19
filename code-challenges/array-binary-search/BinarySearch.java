import java.util.ArrayList;

public class BinarySearch {
  public static void main(String[] args) {
    Integer[][] arrays = new Integer[10][];
    for (int i = 0; i < arrays.length; i++) {
      Integer[] array = new Integer[i];
      for (int j = 0; j < i; j++) {
        array[j] = j + 1;
      }
      arrays[i] = array;
    }

    for (Integer[] array : arrays) {
      System.out.println("When working with "+arrToString(array)+":");
      for (int i = 0; i <= array.length + 1; i++) {
        int result = binarySearch(array, i);
        int expected = i == 0 || i == array.length + 1 ? - 1 : i - 1;
        System.out.println("Result (" + result + ") should be " + expected + " for element " + i);
        assert result == expected;
      }
    }
    System.out.println("All tests pass, yay!");
    //TODO test binary search/
  }

  public static <T> String arrToString(T[] arr) {
    StringBuilder string = new StringBuilder(2 + (arr.length * 3));
    string.append('[');
    for (int i = 0; i < arr.length; i++) {
      string.append(arr[i]);
      if (i < arr.length - 1) {
        string.append(", ");
      }
    }
    string.append(']');
    return string.toString();
  }

  public static <T extends Number> int binarySearch(T[] arr, T key) {
    int start = 0;
    int end = arr.length;
    int index = 0;
    double keyDouble = key.doubleValue(); //So we don't keep calling this.
    while (start < end) {
      index = ((end - start) / 2) + start;
      if (arr[index].equals(key)) {
        break;
      }
      if (arr[index].doubleValue() > keyDouble) {
        end = index - 1;
      } else {
        start = index + 1;
      }
    }
    index = ((end - start) / 2) + start;
    if (index >= arr.length || arr[index] != key) {
      return -1;
    }
    return index;
  } 
}