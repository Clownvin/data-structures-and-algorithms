using System;
using System.Diagnostics;
using System.Linq;

namespace ArrayShift
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] arr = new int[0];
            arr = insertShiftArray(arr, 1);
            Console.WriteLine("Should be [1]:");
            printArr(arr);
            Debug.Assert(Enumerable.SequenceEqual(arr, new int[]{1}));
            arr = insertShiftArray(arr, 2);
            Console.WriteLine("Should be [2, 1]:");
            printArr(arr);
            Debug.Assert(Enumerable.SequenceEqual(arr, new int[]{2, 1}));
            arr = insertShiftArray(arr, 3);
            Console.WriteLine("Should be [2, 3, 1]:");
            printArr(arr);
            Debug.Assert(Enumerable.SequenceEqual(arr, new int[]{2, 3, 1}));
            Console.WriteLine("Good to go! All tests pass");
        }

        private static void printArr<T>(T[] arr) {
            for (int i = 0; i < arr.Length; i++) {
                Console.Write($"{arr[i]}, ");
            }
            Console.WriteLine();
        }

        public static T[] insertShiftArray<T>(T[] arr, T val) {
            T[] newArr = new T[arr.Length + 1];
            if (arr.Length == 0) {
                newArr[0] = val;
            }
            int arrLen = arr.Length;
            for (int i = 0, j = 0; j < arrLen; i++, j++) {
                if (i == arrLen / 2) {
                    newArr[i++] = val;
                }
                newArr[i] = arr[j];
            }
            return newArr;
        }
    }


}
