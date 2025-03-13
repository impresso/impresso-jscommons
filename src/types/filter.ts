import pb from '../generated/query_pb'

// Utility type to convert SNAKE_CASE to camelCase
type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<SnakeToCamel<U>>}` : S

// Utility type to omit 'unspecified' from a union of literals
type OmitUnspecified<T> = T extends 'unspecified' ? never : T

// Remapped type without the TYPE_ prefix and in camelCase
type FilterTypeWithoutPrefix = {
  [K in keyof pb.FilterTypeMap as K extends `TYPE_${infer R}`
    ? OmitUnspecified<SnakeToCamel<Lowercase<R>>>
    : K]: pb.FilterTypeMap[K]
}

export type FilterType = keyof FilterTypeWithoutPrefix

// Remapped type without the CONTEXT_ prefix and in camelCase
type FilterContextWithoutPrefix = {
  [K in keyof pb.FilterContextMap as K extends `CONTEXT_${infer R}`
    ? OmitUnspecified<SnakeToCamel<Lowercase<R>>>
    : K]: pb.FilterContextMap[K]
}

export type FilterContext = keyof FilterContextWithoutPrefix

// Remapped type without the OP_ prefix and in upper case
type FilterOperatorWithoutPrefix = {
  [K in keyof pb.FilterOperatorMap as K extends `OPERATOR_${infer R}`
    ? Uppercase<OmitUnspecified<Lowercase<R>>>
    : K]: pb.FilterOperatorMap[K]
}

export type FilterOperator = keyof FilterOperatorWithoutPrefix

// Remapped type without the PRECISION_ prefix and in camelCase
type FilterPrecisionWithoutPrefix = {
  [K in keyof pb.FilterPrecisionMap as K extends `PRECISION_${infer R}`
    ? OmitUnspecified<SnakeToCamel<Lowercase<R>>>
    : K]: pb.FilterPrecisionMap[K]
}

export type FilterPrecision = keyof FilterPrecisionWithoutPrefix

export interface Filter {
  q?: string[] | string
  type: FilterType
  context?: FilterContext
  precision?: FilterPrecision
  op?: FilterOperator
  uids?: string[]
}
