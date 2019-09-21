using System;
using System.Collections;

namespace LinkedLists {
  
  public class LinkedList<T> : IEnumerable {

    protected class Link {
      internal T value;
      internal Link next;

      public Link(T value, Link next = null) {
        this.value = value;
        this.next = next;
      }
    }

    protected int size = 0;
    protected Link head = null;
    protected Link tail = null;

    public LinkedList() {

    }

    protected void RangeCheck(int index) {
      if (index < 0 || index >= GetSize()) {
        throw new IndexOutOfRangeException($"Array index out of bounds: {index}");
      }
    }

    protected Link GetLink(int index) {
      int i = 0;
      Link link = head;
      while (i++ < index) {
        link = link.next;
      }
      return link;
    }

    public int GetSize() {
      return size;
    }

    public T Get(int index) {
      return GetLink(index).value;
    }

    public void Add(params T[] values) {
      foreach (T value in values) {
        Link link = new Link(value);
        if (head == null) {
          head = tail = link;
        } else {
          tail.next = link;
          tail = tail.next;
        }
      }
      size += values.Length;
    }

    public void Clear() {
      head = tail = null;
      size = 0;
    }

    public IEnumerator GetEnumerator() {
      Link current = head;
      for (int i = 0; i < size; i++) {
        yield return current.value;
        current = current.next;
      }
    }

    public override string ToString(){
      string stringified = "[";
      int i = 0;
      foreach (T value in this) {
        stringified += value.ToString();
        i++;
        if (i < GetSize()) {
          stringified += ", ";
        }
      }
      stringified += "]";
      return stringified;
    }

    public bool Includes(Object other) {
      foreach (T value in this) {
        if (value.Equals(other)) {
          return true;
        }
      }
      return false;
    }

    public void Insert(T value, int index = 0) {
      if (index == GetSize()) {
        Add(value);
        return;
      }
      RangeCheck(index);
      if (index == 0) {
        Link currhead = head;
        head = new Link(value, currhead);
      } else {
        Link start = GetLink(index - 1);
        Link next = start.next;
        start.next = new Link(value, next);
      }
      size++;
    }

    public void set(int index, T value) {
      RangeCheck(index);
      Link link = GetLink(index);
      link.value = value;
    }

    public T remove(int index = Int32.MaxValue) {
      if (index == Int32.MaxValue) {
        index = GetSize() - 1;
      }
      RangeCheck(index);
      T returnVal = default(T);
      if (index == 0) {
        returnVal = head.value;
        head = head.next;
      } else {
        Link start = GetLink(index - 1);
        Link toRemove = start.next;
        if (index == size - 1) {
          start.next = null;
          tail = start;
        } else {
          Link end = toRemove.next;
          start.next = end;
        }
        returnVal = toRemove.value;
      }
      size--;
      return returnVal;
    }
  }
}