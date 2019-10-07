#define LL_VAL_TYPE long
#include "linkedlist.h"

void printValue(LL_VAL_TYPE value) {
  printf("%ld, ", value);
}

void printList(list_t* list) {
  printf("[");
  forEachIn(list, printValue);
  printf("]\n");
}

int main() {
  list_t* list = createList();
  if (list->head == NULL) {
    printf("Null!\n");
  }
  for (LL_VAL_TYPE i = 0; i < 10; i++) {
    printf("Starting with: ");
    printList(list);
    addToList(list, i);
    printf("Added: %ld\n", getFromList(list, i));
    printList(list);
    printf("List includes %ld? ", i);
    listIncludes(list, i) ? printf("true\n") : printf("false\n");
    printf("List includes %ld? ", i + 1);
    listIncludes(list, i + 1) ? printf("true\n") : printf("false\n");
    printf("\n");
  }
  printf("Adding 10 more to tail...\n");
  LL_VAL_TYPE stuff[] = {11, 12, 13, 14, 15, 16, 17, 18, 19, 20};
  addArrayToList(list, stuff, 10);
  printList(list);
  printf("Inserting to head a 1\n");
  insertIntoList(list, 0, 1);
  printList(list);
  printf("Inserting to tail a 2\n");
  insertIntoList(list, list->size, 2);
  printList(list);
  int index = list->size / 2;
  printf("Inserting into index %d (supposed to be middle) a 3\n", index);
  insertIntoList(list, index, 3);
  printList(list);
  printf("Removing head: %ld\n", removeFromList(list, 0));
  printList(list);
  printf("Removing tail: %ld\n", removeFromList(list, list->size - 1));
  printList(list);
  printf("Remove from index %d: %ld\n", 1, removeFromList(list, 1));
  printList(list);
  index = list->size - 2;
  printf("Remove from index %d: %ld\n", index, removeFromList(list, index));
  printList(list);
  printf("Clearing list...\n");
  clearList(list);
  printList(list);
  printf("Inserting to head a 1\n");
  insertIntoList(list, 0, 1);
  printList(list);
  printf("Inserting to tail a 2\n");
  insertIntoList(list, list->size, 2);
  printList(list);
  printf("Inserting into middle a 3\n");
  insertIntoList(list, list->size / 2, 3);
  printList(list);
  printf("Success\n");
  return 1;
}
