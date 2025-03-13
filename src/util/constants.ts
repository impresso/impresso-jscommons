import { camel } from 'case';
import * as pb from '../generated/query_pb.js';
import { FilterType, FilterOperator, FilterContext, FilterPrecision } from '../types/filter';

const Types = Object.freeze(Object
  .keys(pb.FilterType)
  .filter((filterType) => pb.FilterType[filterType] !== pb.FilterType.TYPE_UNSPECIFIED)
  .map((filterType) => camel(filterType.split('_').slice(1).join('_')) as FilterType));

const Operators = Object.freeze(Object
  .keys(pb.FilterOperator)
  .filter((operator) => pb.FilterOperator[operator] !== pb.FilterOperator.OPERATOR_UNSPECIFIED)
  .map((operator) => camel(operator.split('_').slice(1).join('_')).toUpperCase() as FilterOperator));

const Contexts = Object.freeze(Object
  .keys(pb.FilterContext)
  .filter((context) => pb.FilterContext[context] !== pb.FilterContext.CONTEXT_UNSPECIFIED)
  .map((context) => camel(context.split('_').slice(1).join('_')).toLowerCase() as FilterContext));

const Precision = Object.freeze(Object
  .keys(pb.FilterPrecision)
  .filter((precision) => pb.FilterPrecision[precision] !== pb.FilterPrecision.PRECISION_UNSPECIFIED)
  .map((precision) => camel(precision.split('_').slice(1).join('_')).toLowerCase() as FilterPrecision));

export default {
  filter: {
    Types,
    Operators,
    Contexts,
    Precision,
  }
};