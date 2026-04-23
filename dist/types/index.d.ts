import { Filter, FilterType } from "./filter";
import { OmitUnspecified, SnakeToCamel } from "../util/protobuf";
import { GroupValue as GroupValueEnum } from "../generated/proto/query_pb";
export { Filter, FilterType };
type GroupValueWithoutPrefix = {
    [K in keyof typeof GroupValueEnum & string as K extends `GROUPVALUE_${infer R}` ? OmitUnspecified<SnakeToCamel<Lowercase<R>>> : K]: (typeof GroupValueEnum)[K];
};
export type GroupValue = keyof GroupValueWithoutPrefix;
export declare const toGroupValueEnum: (type: GroupValue) => GroupValueEnum;
export declare const fromGroupValueEnum: (obj: GroupValueEnum) => GroupValue;
export interface SearchQuery {
    filters: Filter[];
    groupBy?: GroupValue;
}
