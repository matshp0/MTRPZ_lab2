import { List } from '../src';

describe('List class', () => {
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
    expect(list.length()).toBe(7);
  });

  it('should return proper value from get method', () => {
    const list = new List();
    list.append('a');
    list.append('b');
    list.append('c');
    list.append('d');
    list.append('e');
    list.append('f');
    expect(() => list.get(-1)).toThrow();
    expect(() => list.get(100)).toThrow();
    expect(() => list.get(2.5)).toThrow();
    expect(list.get(0)).toBe('a');
    expect(list.get(1)).toBe('b');
    expect(list.get(5)).toBe('f');
  });
});
