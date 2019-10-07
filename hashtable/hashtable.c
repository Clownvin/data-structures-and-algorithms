#include "./hashtable.h"
#include <stdio.h>

int main() {
  table_t table = createHashtable(10);
  putInTable("1", 1, &table);
  putInTable("11", 56, &table);
  printf("Got %d from key 1\n", getFromTable("1", &table));
  printf("Got %d from key 11\n", getFromTable("11", &table));
  printBuckets(&table);
  //removeFromTable("1", table);
  //printf("Got %d from key 1\n", getFromTable("1", table));
  for (int i = 0; i < 100; i++) {
    char* buffer = malloc(sizeof(char) * 10);
    sprintf(buffer, "%d\0", i);
    printf("buffer, %s\n", buffer);
    putInTable(buffer, i, &table);
    printf("size: %ld\n", table.size);
    printBuckets(&table);
  }
}