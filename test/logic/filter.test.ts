import { optimizeFilters, mergeFilters } from '../../src/logic/filter';
import { Filter } from '../../src/types/index';

describe('optimizeFilters', () => {
  it('does not merge filters of different types', () => {
    const filters = [
      { type: 'string', q: 'foo' },
      { type: 'language', q: ['de'] },
      { type: 'newspaper', q: ['DTT', 'BOO'] },
    ] satisfies Filter[];
    const optimizedFilters = [
      { type: 'string', q: 'foo' },
      { type: 'language', q: 'de' },
      { type: 'newspaper', q: ['DTT', 'BOO'] },
    ] satisfies Filter[];

    expect(optimizeFilters(filters)).toEqual(optimizedFilters);
  });

  it('optimizes filters with single elements and default operators', () => {
    const filters = [
      { type: 'string', q: ['foo'] },
      { type: 'string', q: ['de'] },
    ] satisfies Filter[];
    const optimizedFilters = [
      { type: 'string', q: ['foo', 'de'] },
    ] satisfies Filter[];

    expect(optimizeFilters(filters)).toEqual(optimizedFilters);
  });

  it('does not optimize filters with single elements and different operators', () => {
    const filters = [
      { type: 'string', q: ['foo'] },
      { type: 'string', q: ['de'], op: 'AND' },
    ] satisfies Filter[];
    const optimizedFilters = [
      { type: 'string', q: 'foo' },
      { type: 'string', q: 'de', op: 'AND' },
    ] satisfies Filter[];

    expect(optimizeFilters(filters)).toEqual(optimizedFilters);
  });
});

describe('mergeFilters', () => {
  it('flattens multiple filter sets into one', () => {
    const sets = [
      [{ type: 'language', q: ['de'] }],
      [{ type: 'newspaper', q: ['DTT'] }],
    ] satisfies Filter[][];

    expect(mergeFilters(sets)).toEqual([
      { type: 'language', q: 'de', op: 'AND' },
      { type: 'newspaper', q: 'DTT', op: 'AND' },
    ]);
  });

  it('sets op to AND for filters with a single q value', () => {
    const sets = [
      [{ type: 'string', q: 'foo' }],
      [{ type: 'string', q: ['bar'] }],
    ] satisfies Filter[][];

    expect(mergeFilters(sets)).toEqual([
      { type: 'string', q: ['foo', 'bar'], op: 'AND' },
    ]);
  });

  it('preserves op for filters with multiple q values', () => {
    const sets = [
      [{ type: 'newspaper', q: ['DTT', 'BOO'], op: 'OR' }],
    ] satisfies Filter[][];

    expect(mergeFilters(sets)).toEqual([
      { type: 'newspaper', q: ['DTT', 'BOO'], op: 'OR' },
    ]);
  });

  it('merges same-type filters from different sets', () => {
    const sets = [
      [{ type: 'string', q: 'foo' }],
      [{ type: 'string', q: 'bar' }],
    ] satisfies Filter[][];

    expect(mergeFilters(sets)).toEqual([
      { type: 'string', q: ['foo', 'bar'], op: 'AND' },
    ]);
  });
});
