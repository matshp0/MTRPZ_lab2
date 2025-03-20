import { List } from '../src';

const getElements = (l: List): string => {
  let result = '';
  for (let i = 0; i < l.length(); i++) {
    result += l.get(i);
  }
  return result;
};

describe('List class', () => {
  let list: List;
  beforeEach(() => {
    list = new List();
    ['a', 'b', 'c', 'd', 'e', 'f'].forEach((item) => list.append(item));
  });

  it('should create list with len = 0', () => {
    const list = new List();
    expect(list.len).toBe(0);
  });

  it('should append elements and throw error, in case of invalid input', () => {
    const list = new List();
    expect(() => list.append('abc')).toThrow();
    expect(() => list.append('a')).not.toThrow();
    expect(() => list.append('b')).not.toThrow();
    expect(list.len).toBe(2);
    expect(list.length()).toBe(list.len);
  });

  it('should insert elements and throw error, in case of invalid input', () => {
    const list = new List();
    expect(() => list.insert('abc', 0)).toThrow();
    expect(() => list.insert('a', 0)).toThrow();
    expect(() => list.append('b')).not.toThrow();
    expect(() => list.append('c')).not.toThrow();
    expect(() => list.append('d')).not.toThrow();
    expect(() => list.insert('a', 2)).not.toThrow();
    expect(() => list.insert('a', 3)).not.toThrow();
    expect(() => list.insert('a', 1)).not.toThrow();
    expect(() => list.insert('a', 0)).not.toThrow();
    expect(() => list.insert('b', -1)).toThrow();
    expect(() => list.insert('b', 100)).toThrow();
    expect(() => list.insert('b', 2.5)).toThrow();
    expect(getElements(list)).toBe('abacaad');
  });

  it('should return proper value from get method', () => {
    expect(() => list.get(-1)).toThrow();
    expect(() => list.get(100)).toThrow();
    expect(() => list.get(2.5)).toThrow();
    expect(list.get(0)).toBe('a');
    expect(list.get(1)).toBe('b');
    expect(list.get(2)).toBe('c');
    expect(list.get(3)).toBe('d');
    expect(list.get(4)).toBe('e');
    expect(list.get(5)).toBe('f');
  });

  it('should delete elements properly by index', () => {
    expect(() => list.delete(-1)).toThrow();
    expect(() => list.delete(100)).toThrow();
    expect(() => list.delete(2.5)).toThrow();
    expect(getElements(list)).toBe('abcdef');
    expect(list.delete(0)).toBe('a');
    expect(list.delete(4)).toBe('f');
    expect(getElements(list)).toBe('bcde');
    expect(list.delete(2)).toBe('d');
    expect(getElements(list)).toBe('bce');
  });

  it('should be iterable', () => {
    let sum = '';
    for (const el of list) {
      sum += el;
    }
    expect(sum).toBe('abcdef');
    list = new List();
    sum = '';
    for (const el of list) {
      sum += el;
    }
    expect(sum).toBe('');
  });

  it('should properly delete elements with deleteAll method', () => {
    expect(() => list.deleteAll('asd')).toThrow();
    expect(() => list.deleteAll('b')).not.toThrow();
    expect(getElements(list)).toBe('acdef');
    list.append('1');
    list.append('2');
    list.append('1');
    list.append('1');
    list.insert('1', 0);
    expect(getElements(list)).toBe('1acdef1211');
    expect(() => list.deleteAll('1')).not.toThrow();
    expect(getElements(list)).toBe('acdef2');
  });
});
