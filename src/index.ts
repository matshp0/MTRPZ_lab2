class Node<T> {
  constructor(
    public value: T,
    public next: Node<T> | null = null,
    public prev: Node<T> | null = null
  ) {}
}

export class List {
  len: number;
  #head: Node<string> | null;
  #tail: Node<string> | null;
  constructor() {
    this.len = 0;
    this.#head = null;
    this.#tail = null;
  }

  #validateInput(input: string): void {
    if (input.length !== 1)
      throw new Error('Elements of a list must be a single character');
  }

  #validateIndex(index: number): void {
    if (index >= this.len || index < 0 || !Number.isInteger(index))
      throw new Error('Index out of range');
  }

  #findByIndex(index: number): Node<string> {
    let current = this.#head as Node<string>;
    for (let i = 0; i < index; i++) {
      current = current.next as Node<string>;
    }
    return current;
  }

  *[Symbol.iterator](): IterableIterator<string> {
    let current = this.#head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  length(): number {
    return this.len;
  }

  append(el: string): void {
    this.#validateInput(el);
    this.len++;
    if (this.len === 1) {
      this.#head = new Node(el);
      this.#tail = this.#head;
      return;
    }
    const newEl = new Node(el);
    this.#tail!.next = newEl;
    newEl.prev = this.#tail;
    this.#tail = newEl;
  }

  insert(el: string, index: number): void {
    this.#validateInput(el);
    this.#validateIndex(index);
    this.len++;
    if (!index) {
      const newEl = new Node(el);
      newEl.next = this.#head;
      this.#head!.prev = newEl;
      this.#head = newEl;
      return;
    }
    const current = this.#findByIndex(index);
    const { prev } = current;
    const newEl = new Node(el);
    prev!.next = newEl;
    current!.prev = newEl;
    newEl.next = current;
    newEl.prev = prev;
  }

  get(index: number): string {
    this.#validateIndex(index);
    const current = this.#findByIndex(index);
    return current.value;
  }

  delete(index: number): string {
    this.#validateIndex(index);
    this.len--;
    const current = this.#findByIndex(index);
    if (current === this.#head) {
      this.#head = current.next;
    }
    if (current === this.#tail) {
      this.#tail = current.prev;
    }
    const { prev, next } = current;
    if (prev) prev.next = next;
    if (next) next.prev = prev;
    return current.value;
  }

  deleteAll(el: string): void {
    this.#validateInput(el);
    let current = this.#head;
    for (let i = 0; i < this.len; i++) {
      if (current!.value === el) {
        this.delete(i);
        i--;
      }
      current = current!.next;
    }
  }

  clone(): List {
    const copy = new List();
    for (const el of this) {
      copy.append(el);
    }
    return copy;
  }

  reverse(): void {
    if (!this.#head) return;
    const reverseNode = (node: Node<string> | null): void => {
      if (!node) return;
      const temp = node.next;
      node.next = node.prev;
      node.prev = temp;
      reverseNode(node.prev);
    };
    reverseNode(this.#head);
    const temp = this.#head;
    this.#head = this.#tail;
    this.#tail = temp;
  }

  findFirst(el: string): number {
    this.#validateInput(el);
    for (let i = 0; i < this.len; i++) {
      if (this.get(i) === el) return i;
    }
    return -1;
  }

  findLast(el: string): number {
    this.#validateInput(el);
    for (let i = this.len - 1; i >= 0; i--) {
      if (this.get(i) === el) return i;
    }
    return -1;
  }

  clear(): void {
    this.#head = null;
    this.#tail = null;
    this.len = 0;
  }

  extend(list: List): void {}
}

const list = new List();
