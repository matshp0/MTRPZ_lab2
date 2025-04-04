export interface IList {
  length(): number;
  append(el: string): void;
  insert(el: string, index: number): void;
  get(index: number): string;
  delete(index: number): string;
  deleteAll(el: string): void;
  clone(): IList;
  reverse(): void;
  findFirst(el: string): number;
  findLast(el: string): number;
  clear(): void;
  extend(list: IList): void;
  [Symbol.iterator](): IterableIterator<string>;
}
