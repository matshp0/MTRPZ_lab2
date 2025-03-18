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
});
