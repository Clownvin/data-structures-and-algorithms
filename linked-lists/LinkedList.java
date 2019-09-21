import java.util.*;

public class LinkedList<T> implements List<T> {

    protected class Link<T> {
        public T value;
        public Link<T> next;

        public Link(T value, Link<T> next) {
            this.value = value;
            this.next = next;
        }

        public Link(T value) {
            this(value, null);
        }

        @Override
        public String toString() {
            return "{" + value + "}";
        }
    }

    protected class LinkIterator implements Iterator<T> {

        protected final Link<T> head;
        protected final int size;

        protected Link<T> current;
        protected int currentIndex;

        public LinkIterator(Link<T> head, int size) {
            this.head = current = head;
            this.size = size;
            currentIndex = 0;
        }

        @Override
        public boolean hasNext() {
            return currentIndex < size;
        }

        @Override
        public T next() {
            //System.out.println(current +", "+currentIndex+", "+size +", "+hasNext());
            T value = current.value;
            current = current.next;
            currentIndex++;
            return value;
        }
    }

    protected Link<T> head;
    protected Link<T> tail;
    protected int size;

    public LinkedList() {
        clear();
    }

    protected void rangeCheck(int index) {
        if (index < 0 || index >= size()) {
            throw new ArrayIndexOutOfBoundsException("Array index out of bounds: " + index);
        }
    }

    protected Link<T> getLink(int index) {
        Link<T> link = head;
        int i = 0;
        while (i++ < index) {
            link = link.next;
        }
        return link;
    }

    @Override
    public int size() {
        return size;
    }

    @Override
    public boolean isEmpty() {
        return size == 0;
    }

    @Override
    public boolean contains(Object object) {
        for (T value : this) {
            if (value.equals(object)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public Iterator<T> iterator() {
        return new LinkIterator(head, size());
    }

    @Override
    public Object[] toArray() {
        T[] array = (T[]) new Object[size()];
        int i = 0;
        for (T value : this) {
            array[i++] = value;
        }
        return array;
    }

    @Override
    public <T1> T1[] toArray(T1[] array) {
        int i = 0;
        for (T value : this) {
            array[i++] = (T1) value;
        }
        return array;
    }

    @Override
    public boolean add(T value) {
        Link<T> link = new Link<>(value);
        if (head == null) {
            tail = head = link;
        } else {
            tail.next = link;
            tail = tail.next;
        }
        size++;
        return true;
    }

    @Override
    public boolean remove(Object value) {
        Link<T> prev = null;
        Link<T> current = head;
        boolean removed = false;
        for (int i = 0; i < size(); i++) {
            if (!current.value.equals(value)) {
                prev = current;
                current = current.next;
                continue;
            }
            if (i == 0) {
                head = head.next;
            } else if (i + 1 == size()) {
                prev.next = null;
                tail = prev;
            } else {
                prev.next = current.next;
            }
            size--;
            i--;
            removed = true;
        }
        return removed;
    }

    @Override
    public boolean containsAll(Collection<?> collection) {
        for (Object object : collection) {
            if (!contains(object)) {
                return false;
            }
        }
        return true;
    }

    @Override
    public boolean addAll(Collection<? extends T> collection) {
        for (T value : collection) {
            add(value);
        }
        return true;
    }

    @Override
    public boolean addAll(int i, Collection<? extends T> collection) {
        Link<T> start = getLink(i);
        Link<T> end = start.next;
        Link<T> curr = null;
        for (T value : collection) {
            Link<T> link = new Link<T>(value);
            if (curr == null) {
                curr = link;
                start.next = curr;
            } else {
                Link<T> prev = curr;
                curr = link;
                prev.next = curr;
            }
        }
        curr.next = end;
        return true;
    }

    @Override
    public boolean removeAll(Collection<?> collection) {
        boolean failedToRemove = false;
        for (Object object : collection) {
            if (!remove(object)) {
                failedToRemove = true;
            }
        }
        return !failedToRemove;
    }

    @Override
    public boolean retainAll(Collection<?> collection) {
        ArrayList<T> toRemove = new ArrayList<>();
        for (T value : this) {
            if (!collection.contains(value)) {
                toRemove.add(value);
            }
        }
        return removeAll(toRemove);
    }

    @Override
    public void clear() {
        head = tail = null;
        size = 0;
    }

    @Override
    public T get(int i) {
        rangeCheck(i);
        return getLink(i).value;
    }

    @Override
    public T set(int i, T value) {
        rangeCheck(i);
        Link<T> link = getLink(i);
        T toRet = link.value;
        link.value = value;
        return toRet;
    }

    //Functionally equivalent to insert, just the Java way
    @Override
    public void add(int i, T value) {
        rangeCheck(i);
        Link<T> start = getLink(i);
        Link<T> end = start.next;
        Link<T> link = new Link<T>(value);
        start.next = link;
        link.next = end;
    }

    @Override
    public T remove(int i) {
        rangeCheck(i);
        T toRet = null;
        if (i == 0) {
            toRet = head.value;
            head = head.next;
        } else if (i == size() - 1) {
            toRet = tail.value;
            tail = getLink(i - 1);
            tail.next = null;
        } else {
            Link<T> start = getLink(i - 1);
            Link<T> toRemove = start.next;
            start.next = toRemove.next;
            toRet = toRemove.value;
        }
        size--;
        return toRet;
    }

    @Override
    public int indexOf(Object o) {
        int index = 0;
        for (T value : this) {
            if (!value.equals(o)) {
                index++;
                continue;
            }
            return index;
        }
        return -1;
    }

    @Override
    public int lastIndexOf(Object o) {
        int index = 0;
        int lastIndex = -1;
        for (T value : this) {
            if (!value.equals(o)) {
                lastIndex = index;
            }
            index++;
        }
        return lastIndex;
    }

    @Override
    public ListIterator<T> listIterator() {
        //Only because I'm getting lazy.
        throw new UnsupportedOperationException("listIterator is not supported");
    }

    @Override
    public ListIterator<T> listIterator(int i) {
        //Only because I'm getting lazy.
        throw new UnsupportedOperationException("listIterator is not supported");
    }

    @Override
    public List<T> subList(int start, int stop) {
        LinkedList<T> subList = new LinkedList<>();
        int currIndex = 0;
        for (T value : this) {
            if (start <= currIndex && currIndex < stop) {
                subList.add(value);
            } else if (currIndex >= stop) {
                break;
            }
            currIndex++;
        }
        return subList;
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append('[');
        int i = 0;
        for (T value : this) {
            System.out.println(value);
            string.append(value.toString());
            if (i < size() - 1) {
                string.append(", ");
            }
            i++;
        }
        return string.append(']').toString();
    }
}
