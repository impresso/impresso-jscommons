import {
  fromObject,
  omitUndefinedAndEmptyLists,
  getEnumString,
  getEnumNumber,
  serialize,
  deserialize,
} from '../util/protobuf.js';

import Protobuf from '../generated/query_pb.js';

const {
  Filter,
  FilterContext,
  FilterOperator,
  FilterType,
  FilterPrecision,
  DateRange,
  SearchQuery,
  GroupValue,
  CollectionRecommendersSettings,
  CollectionRecommender,
  CollectionRecommenderParameter,
} = Protobuf;

function stringAsArray(s) {
  if (typeof s === 'string' || s instanceof String) return [s];
  return s;
}

function maybeArrayAsString(a) {
  if (a !== undefined && a.length === 1) return a[0];
  return a;
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
    q: maybeArrayAsString(filter.q),
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

/**
 * @param {number} number
 * @param {digits} digits
 * @returns {number|undefined}
 */
function toFixedPointNumber(number, digits = 2) {
  if (number == null) return undefined;
  return parseFloat(number.toFixed(digits)) * (10 ** digits);
}

function fromFixedPointNumber(number, digits = 2) {
  if (number == null) return undefined;
  return number / (10 ** digits);
}

function collectionRecommenderParameterSerializerConverter(obj) {
  let stringValue;
  let numberValue;
  let boolValue;
  if (typeof obj.value === 'number') numberValue = toFixedPointNumber(obj.value);
  if (typeof obj.value === 'string') stringValue = obj.value;
  if (typeof obj.value === 'boolean') boolValue = obj.value;

  return {
    key: getEnumNumber(CollectionRecommenderParameter.RecommenderParameterId, obj.key),
    stringValue,
    numberValue,
    boolValue,
  };
}

function collectionRecommenderSerializerConverter(obj) {
  return omitUndefinedAndEmptyLists({
    ...obj,
    type: getEnumNumber(CollectionRecommender.RecommenderType, obj.type),
    weight: toFixedPointNumber(obj.weight),
    parameters: (obj.parameters || [])
      .map((f) => fromObject(
        CollectionRecommenderParameter,
        collectionRecommenderParameterSerializerConverter(f),
      )),
  });
}

function collectionRecommendersSettingsSerializerConverter(obj) {
  return omitUndefinedAndEmptyLists({
    ...obj,
    recommenders: (obj.recommenders || [])
      .map((f) => fromObject(CollectionRecommender, collectionRecommenderSerializerConverter(f))),
  });
}

function collectionRecommenderParameterDeserializerConverter(parameter) {
  let value;
  if (parameter.boolValue != null) value = parameter.boolValue;
  if (parameter.numberValue !== 0) value = fromFixedPointNumber(parameter.numberValue);
  if (parameter.stringValue !== '') value = parameter.stringValue;
  return omitUndefinedAndEmptyLists({
    key: getEnumString(CollectionRecommenderParameter.RecommenderParameterId, parameter.key, false),
    value,
  });
}

function collectionRecommenderDeserializerConverter(recommender) {
  return omitUndefinedAndEmptyLists({
    ...recommender,
    type: getEnumString(CollectionRecommender.RecommenderType, recommender.type, false),
    weight: fromFixedPointNumber(recommender.weight) || 0,
    parameters: (recommender.parameters || [])
      .map(collectionRecommenderParameterDeserializerConverter),
    enabled: recommender.enabled || undefined,
  });
}

function collectionRecommendersSettingsDeserializerConverter(settings) {
  return omitUndefinedAndEmptyLists({
    recommenders: (settings.recommenders || []).map(collectionRecommenderDeserializerConverter),
  });
}

export default {
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
  collectionRecommendersSettings: {
    serialize: (obj) => serialize(
      CollectionRecommendersSettings,
      obj,
      collectionRecommendersSettingsSerializerConverter,
    ),
    deserialize: (base64String) => deserialize(
      CollectionRecommendersSettings,
      base64String,
      collectionRecommendersSettingsDeserializerConverter,
    ),
  },
};
