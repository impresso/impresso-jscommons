import { camel } from 'case';
import {
  FilterType as FilterTypeMap,
  FilterContext as FilterContextMap,
  FilterOperator as FilterOperatorMap,
  FilterPrecision as FilterPrecisionMap
} from '../generated/proto/query_pb'
import { FilterType, FilterOperator, FilterContext, FilterPrecision } from '../types/filter';

const Types = Object.freeze(
  Object.entries(FilterTypeMap)
    .filter(([, value]) => typeof value === 'number' && value !== FilterTypeMap.TYPE_UNSPECIFIED)
    .map(([key]) => camel(key.split('_').slice(1).join('_')) as FilterType));

const Operators = Object.freeze(
  Object.entries(FilterOperatorMap)
    .filter(([, value]) => typeof value === 'number' && value !== FilterOperatorMap.OPERATOR_UNSPECIFIED)
    .map(([key]) => camel(key.split('_').slice(1).join('_')).toUpperCase() as FilterOperator));

const Contexts = Object.freeze(
  Object.entries(FilterContextMap)
    .filter(([, value]) => typeof value === 'number' && value !== FilterContextMap.CONTEXT_UNSPECIFIED)
    .map(([key]) => camel(key.split('_').slice(1).join('_')).toLowerCase() as FilterContext));

const Precision = Object.freeze(
  Object.entries(FilterPrecisionMap)
    .filter(([, value]) => typeof value === 'number' && value !== FilterPrecisionMap.PRECISION_UNSPECIFIED)
    .map(([key]) => camel(key.split('_').slice(1).join('_')).toLowerCase() as FilterPrecision));

export default {
  filter: {
    Types,
    Operators,
    Contexts,
    Precision,
  }
};