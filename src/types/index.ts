import { Filter, FilterType } from "./filter";
import {
  createPrefixedEnumMapper,
  OmitUnspecified,
  SnakeToCamel,
} from "../util/protobuf";
import { GroupValue as GroupValueEnum } from "../generated/proto/query_pb";

export { Filter, FilterType };

// Remapped type without the GROUPVALUE_ prefix and in camelCase
type GroupValueWithoutPrefix = {
  [K in keyof typeof GroupValueEnum &
    string as K extends `GROUPVALUE_${infer R}`
    ? OmitUnspecified<SnakeToCamel<Lowercase<R>>>
    : K]: (typeof GroupValueEnum)[K];
};

export type GroupValue = keyof GroupValueWithoutPrefix;

const groupValueMapper = createPrefixedEnumMapper<
  GroupValue,
  typeof GroupValueEnum
>(GroupValueEnum, "GROUPVALUE_");

export const toGroupValueEnum = (type: GroupValue): GroupValueEnum => {
  return groupValueMapper.toEnum(type);
};

export const fromGroupValueEnum = (obj: GroupValueEnum): GroupValue => {
  return groupValueMapper.fromEnum(obj);
};

export interface SearchQuery {
  filters: Filter[];
  groupBy?: GroupValue;
}
