function mergeLists(...lists) {
  if (lists.length === 0) {
    throw `You must include at least one list!`;
  }
  let list = lists.find((list) => list.head !== null);
  if (!list) {
    return lists[0];
  }
  const size = lists.reduce((totalSize, list) => totalSize + list.getSize(), 0);
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
    }
  }
  list.tail = listCurr;
  list.size = size;
  return list;
}

function mergeSortedLists(...lists) {
  if (lists.length === 0) {
    throw `You must include at least one list!`;
  }
  let list = lists.find((list) => list.head !== null);
  if (!list) {
    return lists[0];
  }
  const size = lists.reduce((totalSize, list) => totalSize + list.getSize(), 0);
  let listCurr = null;
  let pointers = lists.reduce((pointers, list) => {
    pointers.push(list.head);
    return pointers;
  }, []);
  let smallestIndex = -1;
  let smallestValue = 0;
  while (pointers.some((pointer) => pointer !== null)) {
    for (let i = 0; i < pointers.length; i++) {
      if (!pointers[i]) {
        continue;
      }
      if (smallestIndex < 0 || pointers[i].value < smallestValue) {
        smallestIndex = i;
        smallestValue = pointers[i].value;
      }
    }
    if (!listCurr) {
      listCurr = pointers[smallestIndex];
    } else {
      listCurr.next = pointers[smallestIndex];
      listCurr = pointers[smallestIndex];
    }
    pointers[smallestIndex] = pointers[smallestIndex].next;
    smallestIndex = -1;
  }
  list.tail = listCurr;
  list.size = size;
  return list;
}

module.exports = exports = { mergeLists, mergeSortedLists };
