public class LinkedListTester {
    public static void main(String[] args) {
        LinkedList<String> list = new LinkedList<>();
        for (int i = 0; i < 10; i++) {
            list.add("" + i);
        }
        System.out.println(list);
        list.remove(0);
        System.out.println("After remove(0): "+ list);
        list.remove(list.size() - 1);
        System.out.println("After remove(size - 1): " + list);
        list.remove(list.size() / 2);
        System.out.println("After remove(size/2): " + list);
        System.out.println("Index of 4: " + list.indexOf("4"));
    }
}
