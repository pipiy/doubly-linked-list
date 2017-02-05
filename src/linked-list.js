const Node = require('./node');

class LinkedList {
    constructor() {
      this._tail = null;
      this._head = null;
      this.length = 0;
    }

    append(data) {
      let node = new Node(data, this._tail, null);

      if (this._tail != null) {
        this._tail.next = node;
      }

      this._tail = node;

      if (this._head == null) {
        this._head = this._tail;
      }

      this.length += 1;

      return this;
    }

    head() { return this._head !=null ? this._head.data : null; }

    tail() { return this._tail !=null ? this._tail.data : null; }

    at(index) {
      let node = this.find(index);
      if (node == null) return null;
      return node.data;
    }

    find(index) {
      let i = 0;
      let pointer = this._head;

      while(pointer != null) {
        if (i == index) return pointer;
        pointer = pointer.next;
        i += 1;
      }

      return null;
    }

    insertAt(index, data) {
      let existingNode = this.find(index);

      if (existingNode == null) return this;

      let newNode = new Node(data);
      newNode.prev = existingNode.prev;
      if (newNode.prev != null) {
        newNode.prev.next = newNode;
      }
      newNode.next = existingNode;
      existingNode.prev = newNode;

      this.length += 1;
      return this;
    }

    isEmpty() {
      return this.length == 0;
    }

    clear() {
      let pointer = this._head;

      while(pointer != null) {
        pointer = pointer.next;
        if (pointer != null) {
          pointer.prev = null;
        }
      }
      this._head = null;
      this._tail = null;
      this.length = 0;
      return this;
    }

    deleteAt(index) {
      let existingNode = this.find(index);

      if (existingNode == null) return this;

      if (existingNode.next != null) {
        existingNode.next.prev = existingNode.prev;
      }

      if (existingNode.prev != null) {
        existingNode.prev.next = existingNode.next;
      }
      this.length -= 1;
      return this;
    }

    reverse() {
      let current = this._head;
      let changePlace = this._head;
      this._head = this._tail;
      this._tail = changePlace;

      while(current != null) {
        var tmp = current.next;
        current.next = current.prev;
        current.prev = tmp;
        current = tmp;
      }
      return this;
    }

    indexOf(data) {
      let existing = this._head;
      let index = 0;

      for (var i = 0; i < this.length; i++) {
        if (data == existing.data) {
          index = i;
          return index;
        }
        existing = existing.next;
      }
      return -1;
    }
}

module.exports = LinkedList;
