import pb from '../generated/query_pb';
type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<SnakeToCamel<U>>}` : S;
type OmitUnspecified<T> = T extends 'unspecified' ? never : T;
type FilterTypeWithoutPrefix = {
    [K in keyof pb.FilterTypeMap as K extends `TYPE_${infer R}` ? OmitUnspecified<SnakeToCamel<Lowercase<R>>> : K]: pb.FilterTypeMap[K];
};
export type FilterType = keyof FilterTypeWithoutPrefix;
type FilterContextWithoutPrefix = {
    [K in keyof pb.FilterContextMap as K extends `CONTEXT_${infer R}` ? OmitUnspecified<SnakeToCamel<Lowercase<R>>> : K]: pb.FilterContextMap[K];
};
export type FilterContext = keyof FilterContextWithoutPrefix;
type FilterOperatorWithoutPrefix = {
    [K in keyof pb.FilterOperatorMap as K extends `OPERATOR_${infer R}` ? Uppercase<OmitUnspecified<Lowercase<R>>> : K]: pb.FilterOperatorMap[K];
};
export type FilterOperator = keyof FilterOperatorWithoutPrefix;
type FilterPrecisionWithoutPrefix = {
    [K in keyof pb.FilterPrecisionMap as K extends `PRECISION_${infer R}` ? OmitUnspecified<SnakeToCamel<Lowercase<R>>> : K]: pb.FilterPrecisionMap[K];
};
export type FilterPrecision = keyof FilterPrecisionWithoutPrefix;
export interface Filter {
    q?: string[] | string;
    type: FilterType;
    context?: FilterContext;
    precision?: FilterPrecision;
    op?: FilterOperator;
    uids?: string[];
}
export {};
