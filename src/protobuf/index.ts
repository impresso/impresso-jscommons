import {
  toBinary,
  DescMessage,
  MessageShape,
  fromBinary,
} from "@bufbuild/protobuf";

import {
  FilterSchema,
  Filter as PbFilter,
  SearchQuerySchema,
  SearchQuery as PbSearchQuery,
} from "../generated/proto/query_pb";

import {
  Filter,
  fromGroupValueEnum,
  SearchQuery,
  toGroupValueEnum,
} from "../types/index";
import {
  toFilterContextEnum,
  toFilterTypeEnum,
  toFilterOperatorEnum,
  toFilterPrecisionEnum,
  fromFilterTypeEnum,
  fromFilterContextEnum,
  fromFilterOperatorEnum,
  fromFilterPrecisionEnum,
} from "../types/filter";
import { omitUndefinedAndEmptyLists } from "../util/protobuf";

const toString = <Desc extends DescMessage>(
  schema: Desc,
  message: MessageShape<Desc>,
  ignoreUnknownProperties: boolean,
): string => {
  return btoa(
    String.fromCharCode(
      ...toBinary(schema, message, {
        writeUnknownFields: !ignoreUnknownProperties,
      }),
    ),
  );
};

const fromString = <Desc extends DescMessage>(
  schema: Desc,
  base64String: string,
  ignoreUnknownProperties: boolean,
): MessageShape<Desc> => {
  const receivedBytes = Uint8Array.from(atob(base64String), (c) =>
    c.charCodeAt(0),
  );
  return fromBinary(schema, receivedBytes, {
    readUnknownFields: !ignoreUnknownProperties,
  });
};

const qToArray = (q: Filter["q"]): string[] => {
  if (q === undefined) return [];
  if (typeof q === "string" || q instanceof String) return [q as string];
  return q;
};

const qFromArray = (q: string[]): Filter["q"] => {
  if (q.length === 0) return undefined;
  if (q.length === 1) return q[0];
  return q;
};

const toPbFilter = (filter: Filter): PbFilter => ({
  ...filter,
  type: toFilterTypeEnum(filter.type),
  context:
    filter.context != null ? toFilterContextEnum(filter.context) : undefined,
  op: filter.op != null ? toFilterOperatorEnum(filter.op) : undefined,
  precision:
    filter.precision != null
      ? toFilterPrecisionEnum(filter.precision)
      : undefined,
  q: qToArray(filter.q),
  $typeName: "impresso.query.Filter",
});

const fromPbFilter = (pbFilter: PbFilter): Filter =>
  omitUndefinedAndEmptyLists({
    type: fromFilterTypeEnum(pbFilter.type),
    context:
      pbFilter.context != null
        ? fromFilterContextEnum(pbFilter.context)
        : undefined,
    op: pbFilter.op != null ? fromFilterOperatorEnum(pbFilter.op) : undefined,
    precision:
      pbFilter.precision != null
        ? fromFilterPrecisionEnum(pbFilter.precision)
        : undefined,
    q: qFromArray(pbFilter.q),
  });

const toPbSearchQuery = (searchQuery: SearchQuery): PbSearchQuery => ({
  ...searchQuery,
  filters: (searchQuery.filters || []).map(toPbFilter),
  groupBy:
    searchQuery.groupBy != null
      ? toGroupValueEnum(searchQuery.groupBy)
      : undefined,
  $typeName: "impresso.query.SearchQuery",
});

const fromPbSearchQuery = (pbSearchQuery: PbSearchQuery): SearchQuery =>
  omitUndefinedAndEmptyLists({
    filters: (pbSearchQuery.filters || []).map(fromPbFilter),
    groupBy:
      pbSearchQuery.groupBy != null
        ? fromGroupValueEnum(pbSearchQuery.groupBy)
        : undefined,
  });

export default {
  filter: {
    serialize: (filter: Filter, ignoreUnknownProperties = false): string =>
      toString(FilterSchema, toPbFilter(filter), ignoreUnknownProperties),
    deserialize: (
      base64String: string,
      ignoreUnknownProperties = false,
    ): Filter =>
      fromPbFilter(
        fromString(FilterSchema, base64String, ignoreUnknownProperties),
      ),
  },
  searchQuery: {
    serialize: (sq: SearchQuery, ignoreUnknownProperties = false): string =>
      toString(SearchQuerySchema, toPbSearchQuery(sq), ignoreUnknownProperties),
    deserialize: (
      base64String: string,
      ignoreUnknownProperties = false,
    ): SearchQuery =>
      fromPbSearchQuery(
        fromString(SearchQuerySchema, base64String, ignoreUnknownProperties),
      ),
  },
};
