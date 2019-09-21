#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <limits.h>

//Typedefs
typedef struct link {
  int value;
  struct link* next;
} link_t;

typedef struct linked_list {
  link_t* head;
  link_t* tail;
  int size;
} list_t;

//Function prototypes.
link_t* createLink(int value);

list_t* createList();

void addToList(list_t* list, int value);

link_t* getLinkFromList(list_t* list, int index);

int getFromList(list_t* list, int index);

void clearList(list_t* list);

bool listIncludes(list_t* list, int value);

void printList(list_t* list);

void insertIntoList(list_t* list, int index, int value);

void setInList(list_t* list, int index, int value);

int removeFromList(list_t* list, int index);

//Implementations
link_t* createLink(int value) {
  link_t* link = malloc(sizeof(link_t));
  if (link == NULL) {
    return NULL;
  }
  link->value = value;
  link->next = NULL;
  return link;
}

list_t* createList() {
  list_t* list = malloc(sizeof(list_t));
  if (list == NULL) {
    return NULL;
  }
  list->head = NULL;
  list->tail = NULL;
  list->size = 0;
  return list;
}

void addToList(list_t* list, int value) {
  link_t* link = createLink(value);
  if (list->head == NULL) {
    list->head = link;
    list->tail = link;
  } else {
    list->tail->next = link;
    list->tail = link;
  }
  list->size++;
}

void addArrayToList(list_t* list, int values[], int length) {
  for (int i = 0; i < length; i++) {
    addToList(list, values[i]);
  }
}

link_t* getLinkFromList(list_t* list, int index) {
  int i = 0;
  link_t* curr = list->head;
  while (i < index) {
    curr = curr->next;
    i++;
  }
  return curr;
}

int getFromList(list_t* list, int index) {
  return getLinkFromList(list, index)->value;
}

void clearList(list_t* list) {
  int i = 0;
  link_t* next = list->head;
  while (i < list->size) {
    link_t* curr = next;
    next = next->next;
    free(curr);
    i++;
  }
  list->head = NULL;
  list->tail = NULL;
  list->size = 0;
}

bool listIncludes(list_t* list, int value) {
  int i = 0;
  link_t* curr = list->head;
  while (i < list->size) {
    if (curr->value == value) {
      return true;
    }
    curr = curr->next;
    i++;
  }
  return false;
}

void printList(list_t* list) {
  printf("[");
  int i = 0;
  link_t* curr = list->head;
  while (i < list->size) {
    printf("%d", curr->value);
    if (i < list->size - 1) {
      printf(", ");
    }
    curr = curr->next;
    i++;
  }
  printf("]\n");
}

void insertIntoList(list_t* list, int index, int value) {
  if (index == list->size) {
    addToList(list, value);
    return;
  }
  if (index == 0) {
    link_t* head = list->head;
    list->head = createLink(value);
    list->head->next = head;
  } else {
    link_t* start = getLinkFromList(list, index - 1);
    link_t* next = start->next;
    start->next = createLink(value);
    start->next->next = next;
  }
  list->size++;
}

void setInList(list_t* list, int index, int value) { 
  getLinkFromList(list, index)->value = value;
}

int removeFromList(list_t* list, int index) {
  int ret = -1;
  if (index == 0) {
    ret = list->head->value;
    link_t* head = list->head;
    list->head = list->head->next;
    free(head);
  } else if (index == list->size - 1) {
    ret = list->tail->value;
    free(list->tail);
    link_t* tail = getLinkFromList(list, index - 1);
    tail->next = NULL;
    list->tail = tail;
  } else {
    link_t* start = getLinkFromList(list, index - 1);
    link_t* end = start->next->next;
    ret = start->next->value;
    free(start->next);
    start->next = end;
  }
  list->size--;
  return ret;
}

int main() {
  list_t* list = createList();
  if (list->head == NULL) {
    printf("Null!\n");
  }
  for (int i = 0; i < 10; i++) {
    printf("Starting with: ");
    printList(list);
    addToList(list, i);
    printf("Added: %d\n", getFromList(list, i));
    printList(list);
    printf("List includes %d? ", i);
    listIncludes(list, i) ? printf("true\n") : printf("false\n");
    printf("List includes %d? ", i + 1);
    listIncludes(list, i + 1) ? printf("true\n") : printf("false\n");
    printf("\n");
  }
  printf("Adding 10 more to tail...\n");
  int stuff[] = {11, 12, 13, 14, 15, 16, 17, 18, 19, 20};
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
  printf("Removing head: %d\n", removeFromList(list, 0));
  printList(list);
  printf("Removing tail: %d\n", removeFromList(list, list->size - 1));
  printList(list);
  printf("Remove from index %d: %d\n", 1, removeFromList(list, 1));
  printList(list);
  index = list->size - 2;
  printf("Remove from index %d: %d\n", index, removeFromList(list, index));
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
