import type { IList } from './IList';

export class List implements IList {
  #data: string[];

  constructor() {
    this.#data = [];
  }

  #validateInput(input: string): void {
    if (input.length !== 1)
      throw new Error('Elements of a list must be a single character');
  }

  #validateIndex(index: number): void {
    if (index >= this.#data.length || index < 0 || !Number.isInteger(index)) {
      throw new Error('Index out of range');
    }
  }

  *[Symbol.iterator](): IterableIterator<string> {
    yield* this.#data;
  }

  length(): number {
    return this.#data.length;
  }

  append(el: string): void {
    this.#validateInput(el);
    this.#data.push(el);
  }

  insert(el: string, index: number): void {
    this.#validateInput(el);
    this.#validateIndex(index);
    this.#data.splice(index, 0, el);
  }

  get(index: number): string {
    this.#validateIndex(index);
    return this.#data[index];
  }

  delete(index: number): string {
    this.#validateIndex(index);
    return this.#data.splice(index, 1)[0];
  }

  deleteAll(el: string): void {
    this.#validateInput(el);
    this.#data = this.#data.filter((item) => item !== el);
  }

  clone(): List {
    const copy = new List();
    copy.#data = [...this.#data];
    return copy;
  }

  reverse(): void {
    this.#data.reverse();
  }

  findFirst(el: string): number {
    this.#validateInput(el);
    return this.#data.indexOf(el);
  }

  findLast(el: string): number {
    this.#validateInput(el);
    return this.#data.lastIndexOf(el);
  }

  clear(): void {
    this.#data = [];
  }

  extend(list: List): void {
    for (const el of list) {
      this.append(el);
    }
  }
}
