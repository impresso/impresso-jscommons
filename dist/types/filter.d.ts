import { FilterType as FilterTypeEnum, FilterContext as FilterContextEnum, FilterOperator as FilterOperatorEnum, FilterPrecision as FilterPrecisionEnum } from "../generated/proto/query_pb";
import { OmitUnspecified, SnakeToCamel } from "../util/protobuf";
type FilterTypeWithoutPrefix = {
    [K in keyof typeof FilterTypeEnum & string as K extends `TYPE_${infer R}` ? OmitUnspecified<SnakeToCamel<Lowercase<R>>> : K]: (typeof FilterTypeEnum)[K];
};
export type FilterType = keyof FilterTypeWithoutPrefix;
export declare const toFilterTypeEnum: (type: FilterType) => FilterTypeEnum;
export declare const fromFilterTypeEnum: (obj: FilterTypeEnum) => FilterType;
type FilterContextWithoutPrefix = {
    [K in keyof typeof FilterContextEnum & string as K extends `CONTEXT_${infer R}` ? OmitUnspecified<SnakeToCamel<Lowercase<R>>> : K]: (typeof FilterContextEnum)[K];
};
export type FilterContext = keyof FilterContextWithoutPrefix;
export declare const toFilterContextEnum: (context: FilterContext) => FilterContextEnum;
export declare const fromFilterContextEnum: (obj: FilterContextEnum) => FilterContext;
type FilterOperatorWithoutPrefix = {
    [K in keyof typeof FilterOperatorEnum & string as K extends `OPERATOR_${infer R}` ? Uppercase<OmitUnspecified<Lowercase<R>>> : K]: (typeof FilterOperatorEnum)[K];
};
export type FilterOperator = keyof FilterOperatorWithoutPrefix;
export declare const toFilterOperatorEnum: (op: FilterOperator) => FilterOperatorEnum;
export declare const fromFilterOperatorEnum: (obj: FilterOperatorEnum) => FilterOperator;
type FilterPrecisionWithoutPrefix = {
    [K in keyof typeof FilterPrecisionEnum & string as K extends `PRECISION_${infer R}` ? OmitUnspecified<SnakeToCamel<Lowercase<R>>> : K]: (typeof FilterPrecisionEnum)[K];
};
export type FilterPrecision = keyof FilterPrecisionWithoutPrefix;
export declare const toFilterPrecisionEnum: (precision: FilterPrecision) => FilterPrecisionEnum;
export declare const fromFilterPrecisionEnum: (obj: FilterPrecisionEnum) => FilterPrecision;
export interface Filter {
    q?: string[] | string;
    type: FilterType;
    context?: FilterContext;
    precision?: FilterPrecision;
    op?: FilterOperator;
    uids?: string[];
}
export {};
