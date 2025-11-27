import { protobuf, constants, jsonSchemas } from '../../src/index';
import { Filter, CollectionRecommendersSettings } from '../../src/types/index';

describe('Filter <-> protobuf', () => {
  it('collection query', () => {
    const testFilter = {
      context: 'include',
      op: 'AND',
      type: 'collection',
      q: ['abc123', 'def'],
    } satisfies Filter;
    const expectedBase64String = 'CAEQARgTKgZhYmMxMjMqA2RlZg==';

    const base64String = protobuf.filter.serialize(testFilter);
    expect(base64String).toBe(expectedBase64String);
    const deserializedFilter = protobuf.filter.deserialize(base64String);
    expect(deserializedFilter).toEqual(testFilter);
  });

  it('uids query', () => {
    const testFilter = {
      type: 'uid',
      uids: ['123'],
    } satisfies Filter;
    const expectedBase64String = 'GAE6AzEyMw==';

    const base64String = protobuf.filter.serialize(testFilter);
    expect(base64String).toBe(expectedBase64String);
    const deserializedFilter = protobuf.filter.deserialize(base64String);
    expect(deserializedFilter).toEqual(testFilter);
  });

  it('query with extra fields', () => {
    const testFilter = {
      context: 'include',
      op: 'AND',
      type: 'collection',
      q: ['abc123', 'def'],
      uid: 'shouldBeIgnored',
    } as any satisfies Filter;
    const expectedBase64String = 'CAEQARgTKgZhYmMxMjMqA2RlZg==';

    expect(() => protobuf.filter.serialize(testFilter)).toThrow(/Unknown property: "uid"/);

    const base64String = protobuf.filter.serialize(testFilter, true);
    expect(base64String).toBe(expectedBase64String);
    const deserializedFilter = protobuf.filter.deserialize(base64String);

    const { uid, ...testFilterWithoutExtra } = testFilter
    expect(deserializedFilter).toEqual(testFilterWithoutExtra);
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
          q: "1989-02-03 TO 2019-02-05T12:35:17Z",
        },
        {
          type: 'uid',
          uids: ['123'],
        },
        {
          type: 'hasTextContents',
          uids: ['foo', 'bar'],
        },
      ] satisfies Filter[],
      groupBy: 'articles',
    };
    const expectedBase64String = 'Cg4IARABGBMqBmFiYzEyMwomGAoqIjE5ODktMDItMDMgVE8gMjAxOS0wMi0wNVQxMjozNToxN1oKBxgBOgMxMjMKDBgCOgNmb286A2JhchAB';

    const base64String = protobuf.searchQuery.serialize(testSearchQuery);
    expect(base64String).toBe(expectedBase64String);
    const deserializedFilter = protobuf.searchQuery.deserialize(base64String);
    expect(deserializedFilter).toEqual(testSearchQuery);
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
      ] satisfies Filter[],
      groupBy: 'asdf',
    };
    expect(() => protobuf.searchQuery.serialize(testSearchQuery)).toThrow(/Unknown enum value: asdf/);
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
      ] satisfies Filter[],
    };

    const base64String = protobuf.searchQuery.serialize(testSearchQuery);
    expect(base64String).toBe('CgYIARACGAIKPQgBEAEYECocYWlkYS0wMDAxLTUwLUFsYmVydF9FaW5zdGVpbioXYWlkYS0wMDAxLTUwLU1heF9QbGFuY2s=');
    const deserializedFilter = protobuf.searchQuery.deserialize(base64String);
    expect(deserializedFilter).toEqual(testSearchQuery);
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
      ] satisfies Filter[],
    };
    const base64String = protobuf.searchQuery.serialize(testSearchQuery);
    expect(base64String).toBe('CgIYAgoMGAcgASoGQWxiZXJ0');
    const deserializedFilter = protobuf.searchQuery.deserialize(base64String);
    expect(deserializedFilter).toEqual(testSearchQuery);
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
      ] satisfies Filter[],
    };
    const base64String = protobuf.searchQuery.serialize(testSearchQuery);
    expect(base64String).toBe('ChAQAhgXKgpPcGVuUHVibGljCgkQAhgYKgNTTkw=');
    const deserializedFilter = protobuf.searchQuery.deserialize(base64String);
    expect(deserializedFilter).toEqual(testSearchQuery);
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
      ] satisfies Filter[],
    };
    const base64String = protobuf.searchQuery.serialize(testSearchQuery);
    expect(base64String).toBe('CgYIARACGAIKEggBEAIYByABKghlaW5zdGVpbgoGCAEQAhgEChIIARACGBcqCk9wZW5QdWJsaWM=');
    const deserializedFilter = protobuf.searchQuery.deserialize(base64String);
    expect(deserializedFilter).toEqual(testSearchQuery);
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
      ] satisfies Filter[],
    };
    const base64String = protobuf.searchQuery.serialize(testSearchQuery);
    expect(base64String).toBe('CgwIARACGB0qAWEqAWI=');
    const deserializedFilter = protobuf.searchQuery.deserialize(base64String);
    expect(deserializedFilter).toEqual(testSearchQuery);
  });

  it('test unknown properties', () => {
    const testSearchQuery = {
      filters: [
        {
          context: 'include',
          op: 'OR',
          type: 'textReuseCluster',
          q: ['a', 'b'],
          uid: 'shouldBeIgnored',
        },
      ] as any satisfies Filter[],
    };
    const base64String = protobuf.searchQuery.serialize(testSearchQuery, true);
    expect(base64String).toBe('CgwIARACGB0qAWEqAWI=');
    const deserializedFilter = protobuf.searchQuery.deserialize(base64String);
    const { filters } = testSearchQuery;
    const { uid, ...filterWithoutExtra } = filters[0];
    const testFilterWithoutExtra = {
      filters: [filterWithoutExtra],
    };
    expect(deserializedFilter).toEqual(testFilterWithoutExtra);
  });
});

describe('constants', () => {
  it('represents multiword filter types right', () => {
    const { filter: { Types } } = constants;
    expect(Types).toContain('person');
    expect(Types).toContain('accessRight');
    expect(Types).toContain('textReuseClusterSize');
  });

  it('represents operators', () => {
    const { filter: { Operators } } = constants;
    expect(JSON.stringify(Operators)).toBe(JSON.stringify(['AND', 'OR']));
  });

  it('represents contexts', () => {
    const { filter: { Contexts } } = constants;
    expect(JSON.stringify(Contexts)).toBe(JSON.stringify(['include', 'exclude']));
  });

  it('represents precision', () => {
    const { filter: { Precision } } = constants;
    expect(Precision).toContain('fuzzy');
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
          enabled: true,
          parameters: [
            { key: 'countType', value: 'boo' },
          ],
        },
      ],
    } satisfies CollectionRecommendersSettings;

    const expectedBase64String = 'CgsIARBCGgUIBhiECQoLCAIQ6AcaBAgEIAEKEAgDEMgBGgcIARIDYm9vIAE=';

    const base64String = protobuf.collectionRecommendersSettings.serialize(settings);
    expect(base64String).toBe(expectedBase64String);
    const deserializedFilter = protobuf.collectionRecommendersSettings.deserialize(base64String);
    expect(deserializedFilter).toEqual(settings);
  });
});

describe('jsonSchemas', () => {
  it('can import jsonSchemas', () => {
    expect(jsonSchemas).toBeDefined();
    expect(Object.keys(jsonSchemas).length).toBeGreaterThan(0);
    expect(jsonSchemas.Filter.title).toBe('Filter');
  });
});

