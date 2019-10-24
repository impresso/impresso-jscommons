const {
  fromObject,
  omitUndefinedAndEmptyLists,
  getEnumString,
  getEnumNumber,
  serialize,
  deserialize,
} = require('../util/protobuf');
const {
  Filter,
  FilterContext,
  FilterOperator,
  FilterType,
  FilterPrecision,
  DateRange,
  SearchQuery,
  GroupValue,
} = require('../generated/query_pb');

function stringAsArray(s) {
  if (typeof s === 'string' || s instanceof String) return [s];
  return s;
}

function daterangeSerializeConverter(daterange) {
  if (daterange === undefined) return undefined;
  return {
    from: Date.parse(daterange.from),
    to: Date.parse(daterange.to),
  };
}

function daterangeDeserializeConverter(daterange) {
  if (daterange === undefined) return undefined;

  return {
    from: new Date(daterange.from).toISOString(),
    to: new Date(daterange.to).toISOString(),
  };
}

/**
 * Convert from JS `Filter` Object to Protobuf `Filter` Message.
 * Used before serializing.
 * @param {object} filter
 */
function filterSerializerConverter(filter) {
  return {
    ...filter,
    q: stringAsArray(filter.q),
    context: getEnumNumber(FilterContext, filter.context),
    op: getEnumNumber(FilterOperator, filter.op),
    type: getEnumNumber(FilterType, filter.type),
    precision: getEnumNumber(FilterPrecision, filter.precision),
    daterange: fromObject(DateRange, daterangeSerializeConverter(filter.daterange)),
  };
}

/**
 * Convert from Protobuf `Filter` Message to JS `Filter` Object and remove default enums.
 * Used after serializing.
 * @param {object} filter
 */
function filterDeserializerConverter(filter) {
  return omitUndefinedAndEmptyLists({
    ...filter,
    context: getEnumString(FilterContext, filter.context),
    op: getEnumString(FilterOperator, filter.op, true),
    type: getEnumString(FilterType, filter.type),
    precision: getEnumString(FilterPrecision, filter.precision),
    daterange: daterangeDeserializeConverter(filter.daterange),
  });
}

function searchQuerySerializerConverter(searchQuery) {
  return {
    ...searchQuery,
    filters: (searchQuery.filters || [])
      .map((f) => fromObject(Filter, filterSerializerConverter(f))),
    groupBy: getEnumNumber(GroupValue, searchQuery.groupBy),
  };
}

function searchQueryDeserializerConverter(searchQuery) {
  return omitUndefinedAndEmptyLists({
    ...searchQuery,
    filters: (searchQuery.filters || []).map(filterDeserializerConverter),
    groupBy: getEnumString(GroupValue, searchQuery.groupBy),
  });
}

module.exports = {
  filter: {
    serialize: (obj) => serialize(Filter, obj, filterSerializerConverter),
    deserialize: (base64String) => deserialize(Filter, base64String, filterDeserializerConverter),
  },
  searchQuery: {
    serialize: (obj) => serialize(SearchQuery, obj, searchQuerySerializerConverter),
    deserialize: (base64String) => deserialize(
      SearchQuery, base64String, searchQueryDeserializerConverter,
    ),
  },
};
