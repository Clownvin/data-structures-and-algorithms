#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <limits.h>
//TODO Add Tokenpaste to prevent name collisions
#ifndef LL_VAL_TYPE
#define LL_VAL_TYPE int
#endif

#ifndef LL_VAL_COMPARISON
#define LL_VAL_COMPARISON val1 == val2
#endif

bool compare(LL_VAL_TYPE val1, LL_VAL_TYPE val2) {
  return LL_VAL_COMPARISON;
}

//Typedefs
typedef struct link {
  LL_VAL_TYPE value;
  struct link* next;
} link_t;

typedef struct linked_list {
  link_t* head;
  link_t* tail;
  int size;
} list_t;

//Function prototypes.
link_t* createLink(LL_VAL_TYPE value);

list_t* createList();

void addToList(list_t* list, LL_VAL_TYPE value);

link_t* getLinkFromList(list_t* list, int index);

LL_VAL_TYPE getFromList(list_t* list, int index);

void addArrayToList(list_t* list, LL_VAL_TYPE values[], int length);

void clearList(list_t* list);

bool listIncludes(list_t* list, LL_VAL_TYPE value);

void printList(list_t* list);

void insertIntoList(list_t* list, int index, LL_VAL_TYPE value);

void setInList(list_t* list, int index, LL_VAL_TYPE value);

LL_VAL_TYPE removeFromList(list_t* list, int index);

void forEachIn(list_t* list, void callback(LL_VAL_TYPE));

//Implementations
link_t* createLink(LL_VAL_TYPE value) {
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

void addToList(list_t* list, LL_VAL_TYPE value) {
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

void addArrayToList(list_t* list, LL_VAL_TYPE values[], int length) {
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

LL_VAL_TYPE getFromList(list_t* list, int index) {
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

bool listIncludes(list_t* list, LL_VAL_TYPE value) {
  int i = 0;
  link_t* curr = list->head;
  while (i < list->size) {
    if (compare(curr->value, value)) {
      return true;
    }
    curr = curr->next;
    i++;
  }
  return false;
}


void forEachIn(list_t* list, void callback(LL_VAL_TYPE)) {
  int i = 0;
  link_t* curr = list->head;
  while (i < list->size) {
    callback(curr->value);
    curr = curr->next;
    i++;
  }
}

void insertIntoList(list_t* list, int index, LL_VAL_TYPE value) {
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

void setInList(list_t* list, int index, LL_VAL_TYPE value) { 
  getLinkFromList(list, index)->value = value;
}

LL_VAL_TYPE removeFromList(list_t* list, int index) {
  LL_VAL_TYPE ret;
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
