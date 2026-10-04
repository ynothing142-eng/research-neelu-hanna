/**
 * Linear Data Structures Algorithms
 * Implements real operations for Array/List, Stack, Queue, and Singly Linked List.
 */

// --- Singly Linked List ---
export class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

export class SinglyLinkedList {
  constructor(initialValues = []) {
    this.head = null;
    this.size = 0;
    for (let i = initialValues.length - 1; i >= 0; i--) {
      this.insertHead(initialValues[i]);
    }
  }

  insertHead(value) {
    const node = new LinkedListNode(value, this.head);
    this.head = node;
    this.size++;
    return { operation: 'Insert Head', complexity: 'O(1)', message: `Inserted at head in O(1)` };
  }

  insertTail(value) {
    const node = new LinkedListNode(value, null);
    if (!this.head) {
      this.head = node;
    } else {
      let curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = node;
    }
    this.size++;
    return { operation: 'Insert Tail', complexity: 'O(n)', message: `Traversed to end and inserted in O(n)` };
  }

  deleteByValue(predicate) {
    if (!this.head) return null;
    if (predicate(this.head.value)) {
      const removed = this.head.value;
      this.head = this.head.next;
      this.size--;
      return { removed, complexity: 'O(1) (at head)', steps: 1 };
    }

    let curr = this.head;
    let steps = 1;
    while (curr.next && !predicate(curr.next.value)) {
      curr = curr.next;
      steps++;
    }

    if (curr.next) {
      const removed = curr.next.value;
      curr.next = curr.next.next;
      this.size--;
      return { removed, complexity: 'O(n)', steps };
    }
    return null;
  }

  toArray() {
    const result = [];
    let curr = this.head;
    while (curr) {
      result.push(curr.value);
      curr = curr.next;
    }
    return result;
  }
}

// --- Stack (LIFO) ---
export class ActionStack {
  constructor(initial = []) {
    this.items = [...initial];
  }

  push(item) {
    this.items.push(item);
    return { item, complexity: 'O(1)' };
  }

  pop() {
    if (this.isEmpty()) return null;
    return { item: this.items.pop(), complexity: 'O(1)' };
  }

  peek() {
    return this.items[this.items.length - 1] || null;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  toArray() {
    return [...this.items];
  }
}

// --- Queue (FIFO) ---
export class RequestQueue {
  constructor(initial = []) {
    this.items = [...initial];
  }

  enqueue(item) {
    this.items.push(item);
    return { item, complexity: 'O(1)' };
  }

  dequeue() {
    if (this.isEmpty()) return null;
    return { item: this.items.shift(), complexity: 'O(1) amortized' };
  }

  peek() {
    return this.items[0] || null;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  toArray() {
    return [...this.items];
  }
}
