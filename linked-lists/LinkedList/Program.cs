using System;

namespace LinkedLists
{
    class Program
    {
        static void Main(string[] args)
        {
            LinkedList<int> list = new LinkedList<int>();
            Console.WriteLine($"Hello World! {list.GetSize()}");
            list.Add(1, 2, 3, 4, 5, 6, 7, 8, 9);
            Console.WriteLine($"Linked list now has {list.GetSize()} elements.\n{list.ToString()}");
        }
    }
}
