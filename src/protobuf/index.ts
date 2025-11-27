import {
  fromObject,
  omitUndefinedAndEmptyLists,
  getEnumString,
  getEnumNumber,
  serialize,
  deserialize,
} from '../util/protobuf';
import * as pb from '../generated/query_pb.js';

import { Filter, CollectionRecommendersSettings, SearchQuery } from '../types/index';

function stringAsArray(s: string | string[]): string[] {
  if (typeof s === 'string' || s instanceof String) return [s as string];
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
    context: getEnumNumber(pb.FilterContext, filter.context),
    op: getEnumNumber(pb.FilterOperator, filter.op),
    type: getEnumNumber(pb.FilterType, filter.type),
    precision: getEnumNumber(pb.FilterPrecision, filter.precision),
    daterange: fromObject(pb.DateRange, daterangeSerializeConverter(filter.daterange)),
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
    context: getEnumString(pb.FilterContext, filter.context),
    op: getEnumString(pb.FilterOperator, filter.op, true),
    type: getEnumString(pb.FilterType, filter.type),
    precision: getEnumString(pb.FilterPrecision, filter.precision),
    daterange: daterangeDeserializeConverter(filter.daterange),
  });
}

function searchQuerySerializerConverter(searchQuery) {
  return {
    ...searchQuery,
    filters: (searchQuery.filters || [])
      .map((f) => fromObject(pb.Filter, filterSerializerConverter(f))),
    groupBy: getEnumNumber(pb.GroupValue, searchQuery.groupBy),
  };
}

function searchQueryDeserializerConverter(searchQuery) {
  return omitUndefinedAndEmptyLists({
    ...searchQuery,
    filters: (searchQuery.filters || []).map(filterDeserializerConverter),
    groupBy: getEnumString(pb.GroupValue, searchQuery.groupBy),
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
    key: getEnumNumber(pb.CollectionRecommenderParameter.RecommenderParameterId, obj.key),
    stringValue,
    numberValue,
    boolValue,
  };
}

function collectionRecommenderSerializerConverter(obj) {
  return omitUndefinedAndEmptyLists({
    ...obj,
    type: getEnumNumber(pb.CollectionRecommender.RecommenderType, obj.type),
    weight: toFixedPointNumber(obj.weight),
    parameters: (obj.parameters || [])
      .map((f) => fromObject(
        pb.CollectionRecommenderParameter,
        collectionRecommenderParameterSerializerConverter(f),
      )),
  });
}

function collectionRecommendersSettingsSerializerConverter(obj) {
  return omitUndefinedAndEmptyLists({
    ...obj,
    recommenders: (obj.recommenders || [])
      .map((f) => fromObject(pb.CollectionRecommender, collectionRecommenderSerializerConverter(f))),
  });
}

function collectionRecommenderParameterDeserializerConverter(parameter) {
  let value;
  if (parameter.boolValue != null) value = parameter.boolValue;
  if (parameter.numberValue !== 0) value = fromFixedPointNumber(parameter.numberValue);
  if (parameter.stringValue !== '') value = parameter.stringValue;
  return omitUndefinedAndEmptyLists({
    key: getEnumString(pb.CollectionRecommenderParameter.RecommenderParameterId, parameter.key, false),
    value,
  });
}

function collectionRecommenderDeserializerConverter(recommender) {
  return omitUndefinedAndEmptyLists({
    ...recommender,
    type: getEnumString(pb.CollectionRecommender.RecommenderType, recommender.type, false),
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
    serialize: (obj: Filter, ignoreUnknownProperties = false): string => serialize(pb.Filter, obj, filterSerializerConverter, ignoreUnknownProperties),
    deserialize: (base64String: string): Filter => deserialize(pb.Filter, base64String, filterDeserializerConverter),
  },
  searchQuery: {
    serialize: (obj: SearchQuery): string => serialize(pb.SearchQuery, obj, searchQuerySerializerConverter),
    deserialize: (base64String: string): SearchQuery => deserialize(
      pb.SearchQuery, base64String, searchQueryDeserializerConverter,
    ),
  },
  collectionRecommendersSettings: {
    serialize: (obj: CollectionRecommendersSettings): string => serialize(
      pb.CollectionRecommendersSettings,
      obj,
      collectionRecommendersSettingsSerializerConverter,
    ),
    deserialize: (base64String: string): CollectionRecommendersSettings => deserialize(
      pb.CollectionRecommendersSettings,
      base64String,
      collectionRecommendersSettingsDeserializerConverter,
    ),
  },
};
