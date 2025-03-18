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

  #verifyInput(input: string): void {
    if (input.length !== 1)
      throw new Error('Elements of a list must be a single character');
  }

  length(): number {
    return this.len;
  }

  append(el: string): void {
    this.#verifyInput(el);
    this.len++;
    if (this.len === 1) {
      this.#head = new Node(el);
      this.#tail = this.#head;
      return;
    }
    this.#tail!.next = new Node(el);
    this.#tail = this.#tail!.next;
  }

  insert(el: string, index: number): void {}

  delete(index: number): string {}

  deleteAll(el: string): void {}

  get(index: number): string {}

  clone(): List {}

  reverse(): void {}

  findFirst(el: string): number {}

  findFirst(el: string): number {}

  clear(): void {}

  extend(list: List): void {}
}

const list = new List();
