import { optimizeFilters } from '../../src/logic/filter';
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
