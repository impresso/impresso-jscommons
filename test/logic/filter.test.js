/* eslint-env mocha */
const assert = require('assert');
const { optimizeFilters } = require('../../src/logic/filter');

describe('optimizeFilters', () => {
  it('does not merge filters of different types', () => {
    const filters = [
      { type: 'string', q: 'foo' },
      { type: 'language', q: ['de'] },
      { type: 'newspaper', q: ['DTT', 'BOO'] },
    ];
    const optimizedFilters = [
      { type: 'string', q: 'foo' },
      { type: 'language', q: 'de' },
      { type: 'newspaper', q: ['DTT', 'BOO'] },
    ];

    assert.deepEqual(optimizeFilters(filters), optimizedFilters);
  });

  it('optimizes filters with single elements and default operators', () => {
    const filters = [
      { type: 'string', q: ['foo'] },
      { type: 'string', q: ['de'] },
    ];
    const optimizedFilters = [
      { type: 'string', q: ['foo', 'de'] },
    ];

    assert.deepEqual(optimizeFilters(filters), optimizedFilters);
  });

  it('does not optimize filters with single elements and different operators', () => {
    const filters = [
      { type: 'string', q: ['foo'] },
      { type: 'string', q: ['de'], op: 'AND' },
    ];
    const optimizedFilters = [
      { type: 'string', q: 'foo' },
      { type: 'string', q: 'de', op: 'AND' },
    ];

    assert.deepEqual(optimizeFilters(filters), optimizedFilters);
  });
});
