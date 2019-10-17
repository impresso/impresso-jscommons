const assert = require('assert');
const { filter, searchQuery } = require('../../src/protobuf');

const normalizeDateString = (s) => new Date(Date.parse(s)).toISOString();

describe('Filter <-> protobuf', () => {
  it('collection query', () => {
    const testFilter = {
      context: 'include',
      operator: 'AND',
      type: 'collection',
      query: ['abc123'],
    };
    const expectedBase64String = 'CAEQARgTKgZhYmMxMjM=';

    const base64String = filter.serialize(testFilter);
    assert.equal(base64String, expectedBase64String);
    const deserializedFilter = filter.deserialize(base64String);
    assert.deepEqual(deserializedFilter, testFilter);
  });

  it('daterange query before Unix time', () => {
    const testFilter = {
      type: 'daterange',
      daterange: {
        from: normalizeDateString('1869-02-03'),
        to: normalizeDateString('2019-02-05T12:35:17Z'),
      },
    };
    const expectedBase64String = 'GAoyEgiAwMurqaP///8BEIiXn+2LLQ==';

    const base64String = filter.serialize(testFilter);
    assert.equal(base64String, expectedBase64String);
    const deserializedFilter = filter.deserialize(base64String);
    assert.deepEqual(deserializedFilter, testFilter);
  });

  it('daterange query after Unix time', () => {
    const testFilter = {
      type: 'daterange',
      daterange: {
        from: normalizeDateString('1989-02-03'),
        to: normalizeDateString('2019-02-05T12:35:17Z'),
      },
    };
    const expectedBase64String = 'GAoyDgiA2N+uxBEQiJef7Yst';

    const base64String = filter.serialize(testFilter);
    assert.equal(base64String, expectedBase64String);
    const deserializedFilter = filter.deserialize(base64String);
    assert.deepEqual(deserializedFilter, testFilter);
  });

  it('uids query', () => {
    const testFilter = {
      type: 'uid',
      uids: ['123'],
    };
    const expectedBase64String = 'GAE6AzEyMw==';

    const base64String = filter.serialize(testFilter);
    assert.equal(base64String, expectedBase64String);
    const deserializedFilter = filter.deserialize(base64String);
    assert.deepEqual(deserializedFilter, testFilter);
  });
});

describe('SearchQuery <-> protobuf', () => {
  it('multiple filters', () => {
    const testSearchQuery = {
      filters: [
        {
          context: 'include',
          operator: 'AND',
          type: 'collection',
          query: ['abc123'],
        },
        {
          type: 'daterange',
          daterange: {
            from: normalizeDateString('1989-02-03'),
            to: normalizeDateString('2019-02-05T12:35:17Z'),
          },
        },
        {
          type: 'uid',
          uids: ['123'],
        },
      ],
      groupBy: 'articles',
    };
    const expectedBase64String = 'Cg4IARABGBMqBmFiYzEyMwoSGAoyDgiA2N+uxBEQiJef7YstCgcYAToDMTIzEAE=';

    const base64String = searchQuery.serialize(testSearchQuery);
    assert.equal(base64String, expectedBase64String);
    const deserializedFilter = searchQuery.deserialize(base64String);
    assert.deepEqual(deserializedFilter, testSearchQuery);
  });

  it('fails with unknown groupBy value', () => {
    const testSearchQuery = {
      filters: [
        {
          context: 'include',
          operator: 'AND',
          type: 'collection',
          query: ['abc123'],
        },
      ],
      groupBy: 'asdf',
    };
    assert.throws(() => searchQuery.serialize(testSearchQuery), /Unknown enum value: asdf/);
  });
});