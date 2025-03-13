import { Filter, CollectionRecommendersSettings, SearchQuery } from '../types/index';
declare const _default: {
    filter: {
        serialize: (obj: Filter) => string;
        deserialize: (base64String: string) => Filter;
    };
    searchQuery: {
        serialize: (obj: SearchQuery) => string;
        deserialize: (base64String: string) => SearchQuery;
    };
    collectionRecommendersSettings: {
        serialize: (obj: CollectionRecommendersSettings) => string;
        deserialize: (base64String: string) => CollectionRecommendersSettings;
    };
};
export default _default;
