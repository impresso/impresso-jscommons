const assert = require('assert');
const { protobuf, constants } = require('../../src');

const normalizeDateString = (s) => new Date(Date.parse(s)).toISOString();

describe('Filter <-> protobuf', () => {
  it('collection query', () => {
    const testFilter = {
      context: 'include',
      op: 'AND',
      type: 'collection',
      q: ['abc123', 'def'],
    };
    const expectedBase64String = 'CAEQARgTKgZhYmMxMjMqA2RlZg==';

    const base64String = protobuf.filter.serialize(testFilter);
    assert.equal(base64String, expectedBase64String);
    const deserializedFilter = protobuf.filter.deserialize(base64String);
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
    const expectedBase64String = 'GAoyDwj//+iorbkBEJCuvtqXWg==';

    const base64String = protobuf.filter.serialize(testFilter);
    assert.equal(base64String, expectedBase64String);
    const deserializedFilter = protobuf.filter.deserialize(base64String);
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
    const expectedBase64String = 'GAoyDgiAsL/diCMQkK6+2pda';

    const base64String = protobuf.filter.serialize(testFilter);
    assert.equal(base64String, expectedBase64String);
    const deserializedFilter = protobuf.filter.deserialize(base64String);
    assert.deepEqual(deserializedFilter, testFilter);
  });

  it('uids query', () => {
    const testFilter = {
      type: 'uid',
      uids: ['123'],
    };
    const expectedBase64String = 'GAE6AzEyMw==';

    const base64String = protobuf.filter.serialize(testFilter);
    assert.equal(base64String, expectedBase64String);
    const deserializedFilter = protobuf.filter.deserialize(base64String);
    assert.deepEqual(deserializedFilter, testFilter);
  });
});

describe('SearchQuery <-> protobuf', () => {
  it('multiple filters', () => {
    const testSearchQuery = {
      filters: [
        {
          context: 'include',
          op: 'AND',
          type: 'collection',
          q: 'abc123',
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
        {
          type: 'hasTextContents',
          uids: ['foo', 'bar'],
        },
      ],
      groupBy: 'articles',
    };
    const expectedBase64String = 'Cg4IARABGBMqBmFiYzEyMwoSGAoyDgiAsL/diCMQkK6+2pdaCgcYAToDMTIzCgwYAjoDZm9vOgNiYXIQAQ==';

    const base64String = protobuf.searchQuery.serialize(testSearchQuery);
    assert.equal(base64String, expectedBase64String);
    const deserializedFilter = protobuf.searchQuery.deserialize(base64String);
    assert.deepEqual(deserializedFilter, testSearchQuery);
  });

  it('fails with unknown groupBy value', () => {
    const testSearchQuery = {
      filters: [
        {
          context: 'include',
          op: 'AND',
          type: 'collection',
          q: 'abc123',
        },
      ],
      groupBy: 'asdf',
    };
    assert.throws(() => protobuf.searchQuery.serialize(testSearchQuery), /Unknown enum value: asdf/);
  });

  it('real query 1', () => {
    const testSearchQuery = {
      filters: [
        { context: 'include', op: 'OR', type: 'hasTextContents' },
        {
          context: 'include',
          op: 'AND',
          type: 'person',
          q: ['aida-0001-50-Albert_Einstein', 'aida-0001-50-Max_Planck'],
        },
      ],
    };

    const base64String = protobuf.searchQuery.serialize(testSearchQuery);
    assert.equal(base64String, 'CgYIARACGAIKPQgBEAEYECocYWlkYS0wMDAxLTUwLUFsYmVydF9FaW5zdGVpbioXYWlkYS0wMDAxLTUwLU1heF9QbGFuY2s=');
    const deserializedFilter = protobuf.searchQuery.deserialize(base64String);
    assert.deepEqual(deserializedFilter, testSearchQuery);
  });

  it('string query single term', () => {
    const testSearchQuery = {
      filters: [
        {
          type: 'hasTextContents',
        },
        {
          type: 'string',
          q: 'Albert',
          precision: 'exact',
        },
      ],
    };
    const base64String = protobuf.searchQuery.serialize(testSearchQuery);
    assert.equal(base64String, 'CgIYAgoMGAcgASoGQWxiZXJ0');
    const deserializedFilter = protobuf.searchQuery.deserialize(base64String);
    assert.deepEqual(deserializedFilter, testSearchQuery);
  });

  it('test new filters', () => {
    const testSearchQuery = {
      filters: [
        {
          type: 'accessRight',
          q: 'OpenPublic',
          op: 'OR',
        },
        {
          type: 'partner',
          q: 'SNL',
          op: 'OR',
        },
      ],
    };
    const base64String = protobuf.searchQuery.serialize(testSearchQuery);
    assert.equal(base64String, 'ChAQAhgXKgpPcGVuUHVibGljCgkQAhgYKgNTTkw=');
    const deserializedFilter = protobuf.searchQuery.deserialize(base64String);
    assert.deepEqual(deserializedFilter, testSearchQuery);
  });

  it('test complex filters', () => {
    const testSearchQuery = {
      filters: [
        { context: 'include', op: 'OR', type: 'hasTextContents' },
        {
          context: 'include',
          op: 'OR',
          type: 'string',
          precision: 'exact',
          q: 'einstein',
        },
        { context: 'include', op: 'OR', type: 'isFront' },
        {
          context: 'include',
          op: 'OR',
          type: 'accessRight',
          q: 'OpenPublic',
        },
      ],
    };
    const base64String = protobuf.searchQuery.serialize(testSearchQuery);
    assert.equal(base64String, 'CgYIARACGAIKEggBEAIYByABKghlaW5zdGVpbgoGCAEQAhgEChIIARACGBcqCk9wZW5QdWJsaWM=');
    const deserializedFilter = protobuf.searchQuery.deserialize(base64String);
    assert.deepEqual(deserializedFilter, testSearchQuery);
  });

  it('test text reuse cluster filters', () => {
    const testSearchQuery = {
      filters: [
        {
          context: 'include',
          op: 'OR',
          type: 'textReuseCluster',
          q: ['a', 'b'],
        },
      ],
    };
    const base64String = protobuf.searchQuery.serialize(testSearchQuery);
    assert.equal(base64String, 'CgwIARACGB0qAWEqAWI=');
    const deserializedFilter = protobuf.searchQuery.deserialize(base64String);
    assert.deepEqual(deserializedFilter, testSearchQuery);
  });
});

describe('constants', () => {
  it('represents multiword filter types right', () => {
    const { filter: { Types } } = constants;
    assert.ok(Types.includes('person'));
    assert.ok(Types.includes('accessRight'));
    assert.ok(Types.includes('textReuseClusterSize'));
  });

  it('represents operators', () => {
    const { filter: { Operators } } = constants;
    assert.equal(JSON.stringify(Operators), JSON.stringify(['AND', 'OR']));
  });

  it('represents contexts', () => {
    const { filter: { Contexts } } = constants;
    assert.equal(JSON.stringify(Contexts), JSON.stringify(['include', 'exclude']));
  });

  it('represents precision', () => {
    const { filter: { Precision } } = constants;
    assert.ok(Precision.includes('fuzzy'));
  });
});

describe('CollectionRecommendersSettings <-> protobuf', () => {
  it('recommender settings', () => {
    const settings = {
      recommenders: [
        {
          type: 'timeRange',
          weight: 0.33,
          parameters: [
            { key: 'margin', value: 5.78 },
          ],
        },
        {
          type: 'entities',
          weight: 5,
          parameters: [
            { key: 'removeFullyMentioned', value: true },
          ],
        },
        {
          type: 'topics',
          weight: 1,
          parameters: [
            { key: 'countType', value: 'boo' },
          ],
        },
      ],
    };

    const expectedBase64String = 'CgsIARBCGgUIBhiECQoLCAIQ6AcaBAgEIAEKDggDEMgBGgcIARIDYm9v';

    const base64String = protobuf.collectionRecommendersSettings.serialize(settings);
    assert.equal(base64String, expectedBase64String);
    const deserializedFilter = protobuf.collectionRecommendersSettings.deserialize(base64String);
    assert.deepEqual(deserializedFilter, settings);
  });
});
