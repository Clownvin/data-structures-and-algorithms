const LinkedList = require('../linked-list');

function mergeLists(list1, list2) {
  let head = null;
  let merged = null;

  let curr1 = list1.head;
  let curr2 = list2.head;
  while (curr1 !== null || curr2 !== null) {
    if (curr1 !== null) {
      if (!merged) {
        merged = curr1;
        head = merged;
      } else {
        merged.next = curr1;
        merged = curr1;
      }
      curr1 = curr1.next;
    }
    if (curr2 !== null) {
      if (!merged) {
        merged = curr2;
        head = merged;
      } else {
        merged.next = curr2;
        merged = curr2;
      }
      curr2 = curr2.next;
    }
  }
  return LinkedList.fromHead(head);
}

module.exports = exports = mergeLists;
