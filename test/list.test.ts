import { List as LinkedList } from '../src/ListLinked';
import { List as ArrayList } from '../src/ListArray';
import type { IList } from '../src/IList';

const getElements = (l: IList): string => {
  let result = '';
  for (let i = 0; i < l.length(); i++) {
    result += l.get(i);
  }
  return result;
};

describe.each([
  ['LinkedList', LinkedList],
  ['ArrayList', ArrayList],
])('%s Implementation', (_, ListClass) => {
  let list: IList;

  beforeEach(() => {
    list = new ListClass();
    ['a', 'b', 'c', 'd', 'e', 'f'].forEach((item) => list.append(item));
  });

  it('should create list with len = 0', () => {
    const list = new ListClass();
    expect(list.length()).toBe(0);
  });

  it('should append elements and throw error in case of invalid input', () => {
    const list = new ListClass();
    expect(() => list.append('abc')).toThrow();
    expect(() => list.append('a')).not.toThrow();
    expect(() => list.append('b')).not.toThrow();
    expect(list.length()).toBe(2);
  });

  it('should insert elements and throw error for invalid input', () => {
    const list = new ListClass();
    expect(() => list.insert('abc', 0)).toThrow();
    expect(() => list.insert('a', 0)).toThrow();
    expect(() => list.append('b')).not.toThrow();
    expect(() => list.append('c')).not.toThrow();
    expect(() => list.append('d')).not.toThrow();
    expect(() => list.insert('a', 2)).not.toThrow();
    expect(() => list.insert('a', 3)).not.toThrow();
    expect(() => list.insert('a', 1)).not.toThrow();
    expect(() => list.insert('a', 0)).not.toThrow();
    expect(getElements(list)).toBe('abacaad');
  });

  it('should return proper value from get method', () => {
    expect(() => list.get(-1)).toThrow();
    expect(() => list.get(100)).toThrow();
    expect(list.get(0)).toBe('a');
    expect(list.get(1)).toBe('b');
    expect(list.get(2)).toBe('c');
  });

  it('should delete elements properly by index', () => {
    expect(() => list.delete(-1)).toThrow();
    expect(() => list.delete(100)).toThrow();
    expect(getElements(list)).toBe('abcdef');
    expect(list.delete(0)).toBe('a');
    expect(list.delete(4)).toBe('f');
    expect(getElements(list)).toBe('bcde');
  });

  it('should be iterable', () => {
    let sum = '';
    for (const el of list) {
      sum += el;
    }
    expect(sum).toBe('abcdef');
  });

  it('should properly delete elements with deleteAll method', () => {
    expect(() => list.deleteAll('asd')).toThrow();
    expect(() => list.deleteAll('b')).not.toThrow();
    expect(getElements(list)).toBe('acdef');
  });

  it('should properly copy list and return its clone', () => {
    const newList = list.clone();
    expect(newList).not.toBe(list);
    expect(getElements(newList)).toBe(getElements(list));
  });

  it('should properly reverse list with reverse method', () => {
    expect(() => list.reverse()).not.toThrow();
    expect(getElements(list)).toBe('fedcba');
  });

  it('should find first entry of an element', () => {
    expect(() => list.findFirst('a1')).toThrow();
    expect(list.findFirst('a')).toBe(0);
    expect(list.findFirst('b')).toBe(1);
  });

  it('should find last entry of an element', () => {
    expect(() => list.findLast('a1')).toThrow();
    expect(list.findLast('a')).toBe(0);
    expect(list.findLast('b')).toBe(1);
  });

  it('should clear list with clear method', () => {
    expect(() => list.clear()).not.toThrow();
    expect(getElements(list)).toBe('');
  });

  it('should merge lists with extend method', () => {
    const list2 = new ListClass();
    list2.append('1');
    list2.append('2');
    list2.append('3');
    expect(() => list.extend(list2)).not.toThrow();
    expect(getElements(list)).toBe('abcdef123');
  });
});
