#include <string.h>

#ifndef HT_VAL_TYPE
#define HT_VAL_TYPE int
#endif

typedef struct pair {
  char* key;
  HT_VAL_TYPE value;
} pair_t;

#ifndef LL_PREFIX
#define LL_PREFIX htl
#endif

#define LL_VAL_TYPE pair_t
#define LL_VAL_COMPARISON !strcmp(val1.key, val2.key)
#include "../../data-structures-and-algorithms/linked-lists/linkedlist.h"

typedef struct linked_list bucket_t;

typedef struct hashtable {
  size_t size;
  size_t bucketCount;
  bucket_t* buckets;
} table_t;

bucket_t createBucket() {
  bucket_t bucket = *(bucket_t*)(malloc(sizeof(bucket_t)));
  return bucket;
}

table_t createHashtable(size_t bucketCount) {
  table_t table = *(table_t*)(malloc(sizeof(table_t)));
  table.size = 0;
  table.bucketCount = bucketCount;
  table.buckets = malloc(sizeof(bucket_t) * bucketCount);
  for (int i = 0; i < bucketCount; i++) {
    table.buckets[i] = createBucket();
  }
  return table;
}

pair_t createPair(char* key, HT_VAL_TYPE value) {
  pair_t pair = *(pair_t*)(malloc(sizeof(pair_t)));
  pair.key = key;
  pair.value = value;
  return pair;
}

unsigned long long hash(char* string) {
  unsigned long long hash = 0;
  char c;
  int index = 0;
  do {
    c = string[index++];
    if (c == '\0') {
      break;
    }
    hash = (hash * 31) + c;
  } while (true);
  return hash;
}

int hashToIndex(unsigned long long hash, size_t bucketCount) {
  return hash % bucketCount;
}

void printVal(pair_t pair) {
  //printf("%d", pair.value);
  printf("%s->%d, ", pair.key, pair.value);
}

bucket_t* getBucketFromTable(char* key, table_t* table) {
  int hashcode = hashToIndex(hash(key), table->bucketCount);
  return &(table->buckets[hashcode]);
}

HT_VAL_TYPE getFromTable(char* key, table_t* table) {
  bucket_t* bucket = getBucketFromTable(key, table);
  int i = 0;
  link_t* curr = bucket->head;
  while (i < bucket->size) {
    if (!strcmp(curr->value.key, key)) {
      return curr->value.value;
    }
    curr = curr->next;
    i++;
  }
  return NULL;
}

void putInTable(char* key, HT_VAL_TYPE value, table_t* table) {
  bucket_t* bucket = getBucketFromTable(key, table);
  int i = 0;
  link_t* curr = bucket->head;
  while (i < bucket->size) {
    printf("Comparing %s to %s: %d\n", curr->value.key, key, strcmp(curr->value.key, key));
    if (strcmp(curr->value.key, key) == 0) {
      printf("Updating value %d to %d\n", curr->value.value, value);
      curr->value.value = value;
      return;
    }
    curr = curr->next;
    i++;
  }
  addToList(bucket, createPair(key, value));
  table->size++;
  printf("Added value %d, newsize: %d\n", value, table->size);
}

HT_VAL_TYPE removeFromTable(char* key, table_t* table) {
  bucket_t* bucket = getBucketFromTable(key, table);
  int i = 0;
  link_t* prev = NULL;
  link_t* curr = bucket->head;
  while (i++ < bucket->size) {
    if (!strcmp(curr->value.key, key)) {
      if (prev != NULL) {
        prev->next = curr->next;
      }
      bucket->size--;
      table->size--;
      return curr->value.value;
    }
    prev = curr;
    curr = curr->next;
  }
  return NULL;
}

void printBuckets(table_t* table) {
  for (int i = 0; i < table->bucketCount; i++) {
    printf("Bucket %d: ", i);
    forEachIn(&(table->buckets[i]), printVal);
    printf("\n");
  }
}