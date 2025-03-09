import {
  FilterTypeMap,
  FilterContextMap,
  FilterOperatorMap,
  FilterPrecisionMap,
} from './generated/query_pb.js'

// Utility type to convert SNAKE_CASE to camelCase
type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<SnakeToCamel<U>>}` : S

// Utility type to omit 'unspecified' from a union of literals
type OmitUnspecified<T> = T extends 'unspecified' ? never : T

// Remapped type without the TYPE_ prefix and in camelCase
type FilterTypeWithoutPrefix = {
  [K in keyof FilterTypeMap as K extends `TYPE_${infer R}`
    ? OmitUnspecified<SnakeToCamel<Lowercase<R>>>
    : K]: FilterTypeMap[K]
}
type FilterType = keyof FilterTypeWithoutPrefix

// Remapped type without the CONTEXT_ prefix and in camelCase
type FilterContextWithoutPrefix = {
  [K in keyof FilterContextMap as K extends `CONTEXT_${infer R}`
    ? OmitUnspecified<SnakeToCamel<Lowercase<R>>>
    : K]: FilterContextMap[K]
}
type FilterContext = keyof FilterContextWithoutPrefix

// Remapped type without the OP_ prefix and in upper case
type FilterOperatorWithoutPrefix = {
  [K in keyof FilterOperatorMap as K extends `OPERATOR_${infer R}`
    ? Uppercase<OmitUnspecified<Lowercase<R>>>
    : K]: FilterOperatorMap[K]
}
type FilterOperator = keyof FilterOperatorWithoutPrefix

// Remapped type without the PRECISION_ prefix and in camelCase
type FilterPrecisionWithoutPrefix = {
  [K in keyof FilterPrecisionMap as K extends `PRECISION_${infer R}`
    ? OmitUnspecified<SnakeToCamel<Lowercase<R>>>
    : K]: FilterPrecisionMap[K]
}
type FilterPrecision = keyof FilterPrecisionWithoutPrefix

export interface Entity {
  uid: string,

  name?: string,
  language?: string,
  htmlExcerpt?: string,
  creator?: { username?: string }
  lastModifiedDate?: Date

  y?: string,

  firstIssue?: { date: Date },
  lastIssue?: { date: Date },

  countArticles?: number,
  countIssues?: number,

  start?: number,
  end?: number
}

export interface Filter {
  q?: string[] | string,
  type: FilterType,
  context?: FilterContext,
  precision?: FilterPrecision,
  op?: FilterOperator,

  items?: Entity[]
}

export interface Bucket {
  val: string,
  count: number,
  item?: Entity
}

export interface Facet {
  type: string
  buckets: Bucket[],
  operators?: string[],
  numBuckets?: number
}

export interface SearchQuery {
  filters: Filter[]
}

export interface RecommenderParameter {
  key: string
  value: string | number | boolean
}

export interface CollectionRecommender {
  type: string
  weight?: number
  parameters?: RecommenderParameter[]
  enabled?: boolean
}

export interface CollectionRecommendersSettings {
  recommenders: CollectionRecommender[]
}

export declare namespace protobuf {
  export namespace filter {
    function serialize(filter: Filter): string
    function deserialize(serializedFilter: string): Filter
  }
  export namespace searchQuery {
    function serialize(searchQuery: SearchQuery): string
    function deserialize(serializedSearchQuery: string): SearchQuery
  }
  export namespace collectionRecommendersSettings {
    function serialize(settings: CollectionRecommendersSettings): string
    function deserialize(serializedSearchQuery: string): CollectionRecommendersSettings
  }
}

export declare namespace logic {
  export namespace filter {
    function optimizeFilters(filters: Filter[]): Filter[]
    function mergeFilters(filtersSets: Filter[]): Filter[]
  }
}

export declare namespace constants {
  export namespace filter {
    const Types: FilterType[]
    const Operators: FilterOperator[]
    const Contexts: FilterContext[]
    const Precision: FilterPrecision[]
  }
}
