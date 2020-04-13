
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

  countArticles?: Number,
  countIssues?: Number,

  start?: Number,
  end?: Number
}

export interface Filter {
  q?: string[] | string,
  type: string,
  context?: string,
  precision?: string,
  op?: string,

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

export declare namespace protobuf {
  export namespace filter {
    function serialize(filter: Filter): string
    function deserialize(serializedFilter: string): Filter
  }
  export namespace searchQuery {
    function serialize(searchQuery: SearchQuery): string
    function deserialize(serializedSearchQuery: string): SearchQuery
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
    const Types: string[]
    const Operators: string[]
    const Contexts: string[]
    const Precision: string[]
  }
}
