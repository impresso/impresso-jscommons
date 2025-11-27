import { Filter, CollectionRecommendersSettings, SearchQuery } from '../types/index';
declare const _default: {
    filter: {
        serialize: (obj: Filter, ignoreUnknownProperties?: boolean) => string;
        deserialize: (base64String: string) => Filter;
    };
    searchQuery: {
        serialize: (obj: SearchQuery, ignoreUnknownProperties?: boolean) => string;
        deserialize: (base64String: string) => SearchQuery;
    };
    collectionRecommendersSettings: {
        serialize: (obj: CollectionRecommendersSettings) => string;
        deserialize: (base64String: string) => CollectionRecommendersSettings;
    };
};
export default _default;
