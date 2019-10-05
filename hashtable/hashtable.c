#include "./hashtable.h"

int main() {
  table_t table = createHashtable(5);
  put("1", 1, table);
  put("11", 56, table);
  printf("Got %d from key 1\n", get("1", table));
  printf("Got %d from key 11\n", get("11", table));
  printBuckets(table);

  unsigned long long hashVal = hash("abcdefghij");
  printf("Yay! %lld\n", hashVal);
}