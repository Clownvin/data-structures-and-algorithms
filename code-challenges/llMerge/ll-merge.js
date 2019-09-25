function mergeLists(list1, list2) {
  let list = null;
  let size = 0;

  let listCurr = null;
  let curr1 = list1.head;
  let curr2 = list2.head;

  while (curr1 !== null || curr2 !== null) {
    if (curr1 !== null) {
      if (!listCurr) {
        listCurr = curr1;
        list = list1;
      } else {
        listCurr.next = curr1;
        listCurr = curr1;
      }
      size++;
      curr1 = curr1.next;
    }
    if (curr2 !== null) {
      if (!listCurr) {
        listCurr = curr2;
        list = list2;
      } else {
        listCurr.next = curr2;
        listCurr = curr2;
      }
      size++;
      curr2 = curr2.next;
    }
  }
  if (list === null) {
    if (list1) {
      return list1;
    }
    if (list2) {
      return list2;
    }
    return null;
  }
  list.size = size;
  list.tail = listCurr;
  return list;
}

module.exports = exports = mergeLists;
