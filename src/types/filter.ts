import {
  FilterType as FilterTypeEnum,
  FilterContext as FilterContextEnum,
  FilterOperator as FilterOperatorEnum,
  FilterPrecision as FilterPrecisionEnum,
} from "../generated/proto/query_pb";
import {
  createPrefixedEnumMapper,
  OmitUnspecified,
  SnakeToCamel,
} from "../util/protobuf";

// Remapped type without the TYPE_ prefix and in camelCase
type FilterTypeWithoutPrefix = {
  [K in keyof typeof FilterTypeEnum & string as K extends `TYPE_${infer R}`
    ? OmitUnspecified<SnakeToCamel<Lowercase<R>>>
    : K]: (typeof FilterTypeEnum)[K];
};

export type FilterType = keyof FilterTypeWithoutPrefix;

const filterTypeMapper = createPrefixedEnumMapper<
  FilterType,
  typeof FilterTypeEnum
>(FilterTypeEnum, "TYPE_");

export const toFilterTypeEnum = (type: FilterType): FilterTypeEnum => {
  return filterTypeMapper.toEnum(type);
};

export const fromFilterTypeEnum = (obj: FilterTypeEnum): FilterType => {
  return filterTypeMapper.fromEnum(obj);
};

// Remapped type without the CONTEXT_ prefix and in camelCase
type FilterContextWithoutPrefix = {
  [K in keyof typeof FilterContextEnum &
    string as K extends `CONTEXT_${infer R}`
    ? OmitUnspecified<SnakeToCamel<Lowercase<R>>>
    : K]: (typeof FilterContextEnum)[K];
};

export type FilterContext = keyof FilterContextWithoutPrefix;

const filterContextMapper = createPrefixedEnumMapper<
  FilterContext,
  typeof FilterContextEnum
>(FilterContextEnum, "CONTEXT_");

export const toFilterContextEnum = (
  context: FilterContext,
): FilterContextEnum => {
  return filterContextMapper.toEnum(context);
};

export const fromFilterContextEnum = (
  obj: FilterContextEnum,
): FilterContext => {
  return filterContextMapper.fromEnum(obj);
};

// Remapped type without the OP_ prefix and in upper case
type FilterOperatorWithoutPrefix = {
  [K in keyof typeof FilterOperatorEnum &
    string as K extends `OPERATOR_${infer R}`
    ? Uppercase<OmitUnspecified<Lowercase<R>>>
    : K]: (typeof FilterOperatorEnum)[K];
};

export type FilterOperator = keyof FilterOperatorWithoutPrefix;

const FilterOperatorEnumper = createPrefixedEnumMapper<
  FilterOperator,
  typeof FilterOperatorEnum
>(FilterOperatorEnum, "OPERATOR_", "upper");

export const toFilterOperatorEnum = (
  op: FilterOperator,
): FilterOperatorEnum => {
  return FilterOperatorEnumper.toEnum(op);
};

export const fromFilterOperatorEnum = (
  obj: FilterOperatorEnum,
): FilterOperator => {
  return FilterOperatorEnumper.fromEnum(obj);
};

// Remapped type without the PRECISION_ prefix and in camelCase
type FilterPrecisionWithoutPrefix = {
  [K in keyof typeof FilterPrecisionEnum &
    string as K extends `PRECISION_${infer R}`
    ? OmitUnspecified<SnakeToCamel<Lowercase<R>>>
    : K]: (typeof FilterPrecisionEnum)[K];
};

export type FilterPrecision = keyof FilterPrecisionWithoutPrefix;

const FilterPrecisionEnumper = createPrefixedEnumMapper<
  FilterPrecision,
  typeof FilterPrecisionEnum
>(FilterPrecisionEnum, "PRECISION_");

export const toFilterPrecisionEnum = (
  precision: FilterPrecision,
): FilterPrecisionEnum => {
  return FilterPrecisionEnumper.toEnum(precision);
};

export const fromFilterPrecisionEnum = (
  obj: FilterPrecisionEnum,
): FilterPrecision => {
  return FilterPrecisionEnumper.fromEnum(obj);
};

export interface Filter {
  q?: string[] | string;
  type: FilterType;
  context?: FilterContext;
  precision?: FilterPrecision;
  op?: FilterOperator;
  uids?: string[];
}
