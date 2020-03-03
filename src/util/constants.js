const { camel } = require('case');
const {
  FilterType,
  FilterOperator,
  FilterContext,
  FilterPrecision,
} = require('../generated/query_pb');

const Types = Object.freeze(Object
  .keys(FilterType)
  .filter((filterType) => FilterType[filterType] !== FilterType.TYPE_UNSPECIFIED)
  .map((filterType) => camel(filterType.split('_').slice(1).join('_'))));

const Operators = Object.freeze(Object
  .keys(FilterOperator)
  .filter((operator) => FilterOperator[operator] !== FilterOperator.OPERATOR_UNSPECIFIED)
  .map((operator) => camel(operator.split('_').slice(1).join('_')).toUpperCase()));

const Contexts = Object.freeze(Object
  .keys(FilterContext)
  .filter((context) => FilterContext[context] !== FilterContext.CONTEXT_UNSPECIFIED)
  .map((context) => camel(context.split('_').slice(1).join('_')).toLowerCase()));

const Precision = Object.freeze(Object
  .keys(FilterPrecision)
  .filter((precision) => FilterPrecision[precision] !== FilterPrecision.PRECISION_UNSPECIFIED)
  .map((precision) => camel(precision.split('_').slice(1).join('_')).toLowerCase()));

module.exports = {
  filter: {
    Types,
    Operators,
    Contexts,
    Precision,
  },
};
