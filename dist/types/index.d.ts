import { Filter } from './filter';
export interface Entity {
    uid: string;
    name?: string;
    language?: string;
    htmlExcerpt?: string;
    creator?: {
        username?: string;
    };
    lastModifiedDate?: Date;
    y?: string;
    firstIssue?: {
        date: Date;
    };
    lastIssue?: {
        date: Date;
    };
    countArticles?: number;
    countIssues?: number;
    start?: number;
    end?: number;
}
export interface Bucket {
    val: string;
    count: number;
    item?: Entity;
}
export interface Facet {
    type: string;
    buckets: Bucket[];
    operators?: string[];
    numBuckets?: number;
}
export { Filter };
export interface SearchQuery {
    filters: Filter[];
    groupBy?: string;
}
export interface FilterWithItems extends Filter {
    items?: Entity[];
}
export interface RecommenderParameter {
    key: string;
    value: string | number | boolean;
}
export interface CollectionRecommender {
    type: string;
    weight?: number;
    parameters?: RecommenderParameter[];
    enabled?: boolean;
}
export interface CollectionRecommendersSettings {
    recommenders: CollectionRecommender[];
}
