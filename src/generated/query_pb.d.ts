// package: impresso.query
// file: query.proto

import * as jspb from "google-protobuf";

export class DateRange extends jspb.Message {
  getFrom(): number;
  setFrom(value: number): void;

  getTo(): number;
  setTo(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DateRange.AsObject;
  static toObject(includeInstance: boolean, msg: DateRange): DateRange.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DateRange, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DateRange;
  static deserializeBinaryFromReader(message: DateRange, reader: jspb.BinaryReader): DateRange;
}

export namespace DateRange {
  export type AsObject = {
    from: number,
    to: number,
  }
}

export class Filter extends jspb.Message {
  getContext(): FilterContextMap[keyof FilterContextMap];
  setContext(value: FilterContextMap[keyof FilterContextMap]): void;

  getOp(): FilterOperatorMap[keyof FilterOperatorMap];
  setOp(value: FilterOperatorMap[keyof FilterOperatorMap]): void;

  getType(): FilterTypeMap[keyof FilterTypeMap];
  setType(value: FilterTypeMap[keyof FilterTypeMap]): void;

  getPrecision(): FilterPrecisionMap[keyof FilterPrecisionMap];
  setPrecision(value: FilterPrecisionMap[keyof FilterPrecisionMap]): void;

  clearQList(): void;
  getQList(): Array<string>;
  setQList(value: Array<string>): void;
  addQ(value: string, index?: number): string;

  hasDaterange(): boolean;
  clearDaterange(): void;
  getDaterange(): DateRange | undefined;
  setDaterange(value?: DateRange): void;

  clearUidsList(): void;
  getUidsList(): Array<string>;
  setUidsList(value: Array<string>): void;
  addUids(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Filter.AsObject;
  static toObject(includeInstance: boolean, msg: Filter): Filter.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Filter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Filter;
  static deserializeBinaryFromReader(message: Filter, reader: jspb.BinaryReader): Filter;
}

export namespace Filter {
  export type AsObject = {
    context: FilterContextMap[keyof FilterContextMap],
    op: FilterOperatorMap[keyof FilterOperatorMap],
    type: FilterTypeMap[keyof FilterTypeMap],
    precision: FilterPrecisionMap[keyof FilterPrecisionMap],
    qList: Array<string>,
    daterange?: DateRange.AsObject,
    uidsList: Array<string>,
  }
}

export class SearchQuery extends jspb.Message {
  clearFiltersList(): void;
  getFiltersList(): Array<Filter>;
  setFiltersList(value: Array<Filter>): void;
  addFilters(value?: Filter, index?: number): Filter;

  getGroupBy(): GroupValueMap[keyof GroupValueMap];
  setGroupBy(value: GroupValueMap[keyof GroupValueMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchQuery.AsObject;
  static toObject(includeInstance: boolean, msg: SearchQuery): SearchQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SearchQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchQuery;
  static deserializeBinaryFromReader(message: SearchQuery, reader: jspb.BinaryReader): SearchQuery;
}

export namespace SearchQuery {
  export type AsObject = {
    filtersList: Array<Filter.AsObject>,
    groupBy: GroupValueMap[keyof GroupValueMap],
  }
}

export class CollectionRecommenderParameter extends jspb.Message {
  getKey(): CollectionRecommenderParameter.RecommenderParameterIdMap[keyof CollectionRecommenderParameter.RecommenderParameterIdMap];
  setKey(value: CollectionRecommenderParameter.RecommenderParameterIdMap[keyof CollectionRecommenderParameter.RecommenderParameterIdMap]): void;

  getStringValue(): string;
  setStringValue(value: string): void;

  getNumberValue(): number;
  setNumberValue(value: number): void;

  getBoolValue(): boolean;
  setBoolValue(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CollectionRecommenderParameter.AsObject;
  static toObject(includeInstance: boolean, msg: CollectionRecommenderParameter): CollectionRecommenderParameter.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CollectionRecommenderParameter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CollectionRecommenderParameter;
  static deserializeBinaryFromReader(message: CollectionRecommenderParameter, reader: jspb.BinaryReader): CollectionRecommenderParameter;
}

export namespace CollectionRecommenderParameter {
  export type AsObject = {
    key: CollectionRecommenderParameter.RecommenderParameterIdMap[keyof CollectionRecommenderParameter.RecommenderParameterIdMap],
    stringValue: string,
    numberValue: number,
    boolValue: boolean,
  }

  export interface RecommenderParameterIdMap {
    ID_UNSPECIFIED: 0;
    ID_COUNT_TYPE: 1;
    ID_MIN_OCCURRENCES: 2;
    ID_NUMBER_TO_KEEP: 3;
    ID_REMOVE_FULLY_MENTIONED: 4;
    ID_NORMALIZE_MAX_SCORE: 5;
    ID_MARGIN: 6;
    ID_SCALING_FACTOR: 7;
  }

  export const RecommenderParameterId: RecommenderParameterIdMap;
}

export class CollectionRecommender extends jspb.Message {
  getType(): CollectionRecommender.RecommenderTypeMap[keyof CollectionRecommender.RecommenderTypeMap];
  setType(value: CollectionRecommender.RecommenderTypeMap[keyof CollectionRecommender.RecommenderTypeMap]): void;

  getWeight(): number;
  setWeight(value: number): void;

  clearParametersList(): void;
  getParametersList(): Array<CollectionRecommenderParameter>;
  setParametersList(value: Array<CollectionRecommenderParameter>): void;
  addParameters(value?: CollectionRecommenderParameter, index?: number): CollectionRecommenderParameter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CollectionRecommender.AsObject;
  static toObject(includeInstance: boolean, msg: CollectionRecommender): CollectionRecommender.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CollectionRecommender, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CollectionRecommender;
  static deserializeBinaryFromReader(message: CollectionRecommender, reader: jspb.BinaryReader): CollectionRecommender;
}

export namespace CollectionRecommender {
  export type AsObject = {
    type: CollectionRecommender.RecommenderTypeMap[keyof CollectionRecommender.RecommenderTypeMap],
    weight: number,
    parametersList: Array<CollectionRecommenderParameter.AsObject>,
  }

  export interface RecommenderTypeMap {
    TYPE_UNSPECIFIED: 0;
    TYPE_TIME_RANGE: 1;
    TYPE_ENTITIES: 2;
    TYPE_TOPICS: 3;
    TYPE_TEXT_REUSE_CLUSTERS: 4;
  }

  export const RecommenderType: RecommenderTypeMap;
}

export class CollectionRecommendersSettings extends jspb.Message {
  clearRecommendersList(): void;
  getRecommendersList(): Array<CollectionRecommender>;
  setRecommendersList(value: Array<CollectionRecommender>): void;
  addRecommenders(value?: CollectionRecommender, index?: number): CollectionRecommender;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CollectionRecommendersSettings.AsObject;
  static toObject(includeInstance: boolean, msg: CollectionRecommendersSettings): CollectionRecommendersSettings.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CollectionRecommendersSettings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CollectionRecommendersSettings;
  static deserializeBinaryFromReader(message: CollectionRecommendersSettings, reader: jspb.BinaryReader): CollectionRecommendersSettings;
}

export namespace CollectionRecommendersSettings {
  export type AsObject = {
    recommendersList: Array<CollectionRecommender.AsObject>,
  }
}

export interface FilterContextMap {
  CONTEXT_UNSPECIFIED: 0;
  CONTEXT_INCLUDE: 1;
  CONTEXT_EXCLUDE: 2;
}

export const FilterContext: FilterContextMap;

export interface FilterOperatorMap {
  OPERATOR_UNSPECIFIED: 0;
  OPERATOR_AND: 1;
  OPERATOR_OR: 2;
}

export const FilterOperator: FilterOperatorMap;

export interface FilterTypeMap {
  TYPE_UNSPECIFIED: 0;
  TYPE_UID: 1;
  TYPE_HAS_TEXT_CONTENTS: 2;
  TYPE_TITLE: 3;
  TYPE_IS_FRONT: 4;
  TYPE_PAGE: 5;
  TYPE_ISSUE: 6;
  TYPE_STRING: 7;
  TYPE_ENTITY: 8;
  TYPE_NEWSPAPER: 9;
  TYPE_DATERANGE: 10;
  TYPE_YEAR: 11;
  TYPE_LANGUAGE: 12;
  TYPE_TYPE: 13;
  TYPE_REGEX: 14;
  TYPE_MENTION: 15;
  TYPE_PERSON: 16;
  TYPE_LOCATION: 17;
  TYPE_TOPIC: 18;
  TYPE_COLLECTION: 19;
  TYPE_OCR_QUALITY: 20;
  TYPE_CONTENT_LENGTH: 21;
  TYPE_COUNTRY: 22;
  TYPE_ACCESS_RIGHT: 23;
  TYPE_PARTNER: 24;
  TYPE_MONTH: 25;
  TYPE_TEXT_REUSE_CLUSTER_SIZE: 26;
  TYPE_TEXT_REUSE_CLUSTER_LEXICAL_OVERLAP: 27;
  TYPE_TEXT_REUSE_CLUSTER_DAY_DELTA: 28;
  TYPE_TEXT_REUSE_CLUSTER: 29;
}

export const FilterType: FilterTypeMap;

export interface FilterPrecisionMap {
  PRECISION_UNSPECIFIED: 0;
  PRECISION_EXACT: 1;
  PRECISION_PARTIAL: 2;
  PRECISION_FUZZY: 3;
  PRECISION_SOFT: 4;
}

export const FilterPrecision: FilterPrecisionMap;

export interface GroupValueMap {
  GROUPVALUE_UNSPECIFIED: 0;
  GROUPVALUE_ARTICLES: 1;
}

export const GroupValue: GroupValueMap;

