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
