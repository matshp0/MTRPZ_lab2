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
      this.#head!.prev = new Node(el);
      this.#head = this.#head!.prev;
      return;
    }
    const current = this.#findByIndex(index);
    const { prev } = current;
    const newEl = new Node(el);
    console.log(current);
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

  delete(index: number): string {}

  deleteAll(el: string): void {}

  clone(): List {}

  reverse(): void {}

  findFirst(el: string): number {}

  findFirst(el: string): number {}

  clear(): void {}

  extend(list: List): void {}
}

const list = new List();
