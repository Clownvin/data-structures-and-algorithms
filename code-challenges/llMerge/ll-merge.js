function mergeLists(...lists) {
  if (lists.length === 0) {
    throw `You must include at least one list!`;
  }
  let list = lists.find((list) => list.head !== null);
  if (!list) {
    return lists[0];
  }
  let size = 0;
  let listCurr = null;
  let pointers = lists.reduce((pointers, list) => {
    pointers.push(list.head);
    return pointers;
  }, []);
  while (pointers.some((pointer) => pointer !== null)) {
    for (let i = 0; i < pointers.length; i++) {
      if (!pointers[i]) {
        continue;
      }
      if (!listCurr) {
        listCurr = pointers[i];
      } else {
        listCurr.next = pointers[i];
        listCurr = pointers[i];
      }
      pointers[i] = pointers[i].next;
      size++;
    }
  }
  list.tail = listCurr;
  list.size = size;
  return list;
}

// function mergeLists(list1, list2) {
//   let list = list1;
//   let size = 0;

//   let listCurr = null;
//   let curr1 = list1.head;
//   let curr2 = list2.head;

//   while (curr1 !== null || curr2 !== null) {
//     if (curr1 !== null) {
//       if (!listCurr) {
//         listCurr = curr1;
//         list = list1;
//       } else {
//         listCurr.next = curr1;
//         listCurr = curr1;
//       }
//       size++;
//       curr1 = curr1.next;
//     }
//     if (curr2 !== null) {
//       if (!listCurr) {
//         listCurr = curr2;
//         list = list2;
//       } else {
//         listCurr.next = curr2;
//         listCurr = curr2;
//       }
//       size++;
//       curr2 = curr2.next;
//     }
//   }
//   list.size = size;
//   list.tail = listCurr;
//   return list;
// }

module.exports = exports = mergeLists;
