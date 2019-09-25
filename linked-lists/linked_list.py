class Link:
  def __init__(self, value, next = None):
    self.value = value
    self.next = next

class LinkedListIter:
  def __init__(self, list):
    self.next = list.head
  
  def __next__(self):
    curr = self.next
    if curr is None:
      raise StopIteration
    self.next = self.next.next
    return curr.value

class LinkedList:
  def __init__(self):
    self.head = self.tail = None
    self.size = 0

  def __ensure_size(self, size = None):
    if size is None:
      size = self.size
    return size

  def __normalize_index(self, index, size = None):
    size = self.__ensure_size(size)
    if index < 0:
      index = size + index
    return index

  def __range_check(self, index, size = None):
    size = self.__ensure_size(size)
    if index < 0 or index >= size:
      raise IndexError(f'Array index out of bounds: {str(index)}')
  
  def __normalize_and_check(self, index, size = None):
    size = self.__ensure_size(size)
    index = self.__normalize_index(index, size)
    self.__range_check(index, size)
    return index

  def __get_link(self, index):
    i = 0
    link = self.head
    while i < index:
      link = link.next
      i += 1
    return link

  def add(self, *objects):
    for object in objects:
      link = Link(object)
      if self.head is None:
        self.head = self.tail = link
      else:
        self.tail.next = link
        self.tail = self.tail.next
    self.size += len(objects)

  def getSize(self):
    return self.size
  
  def get(self, index):
    return self.__get_link(index).value

  def clear(self):
    self.head = self.tail = None
    self.size = 0

  def __iter__(self):
    return LinkedListIter(self)

  def __str__(self):
    string = '['
    i = 0
    for val in self:
      string += str(val)
      i += 1
      if i is not self.getSize():
        string += ', '
    string += ']'
    return string

  def includes(self, object):
    for val in self:
      if val is object:
        return True
    return False
  
  def insert(self, index, object):
    if index is self.size:
      self.add(object)
      return
    self.__range_check(index)
    if index is 0:
      currHead = self.head
      self.head = Link(object, currHead)
    else:
      start = self.__get_link(index - 1)
      next = start.next
      start.next = Link(object, next)
    self.size += 1
  
  def set(self, index, object):
    self.__range_check(index)
    link = self.__get_link(index)
    link.value = object
  
  def remove(self, index = None):
    if index is None:
      index = self.getSize() - 1
    self.__range_check(index)
    toReturn = None
    if index is 0:
      toReturn = self.head.value
      self.head = self.head.next
    else:
      start = self.__get_link(index - 1)
      remove = start.next
      if remove is self.tail:
        start.next = None
        self.tail = start
      else:
        end = remove.next
        start.next = end
      toReturn = remove.value
    self.size -= 1
    return toReturn


list = LinkedList()
list.add(1, 2, 3, 4, 5, 6, 7, 8, 9)

print('List(0):', list.get(0))
print('List.size:', list.getSize())

list.add(2)

for val in list:
  print(val)

print(str(list))

list.insert(0, 4)
print(str(list))

list.remove()

print(str(list))

list.set(7, list.remove(0))

print(str(list))

print('😊')