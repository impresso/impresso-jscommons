import { Filter, SearchQuery } from "../types/index";
declare const _default: {
    filter: {
        serialize: (filter: Filter, ignoreUnknownProperties?: boolean) => string;
        deserialize: (base64String: string, ignoreUnknownProperties?: boolean) => Filter;
    };
    searchQuery: {
        serialize: (sq: SearchQuery, ignoreUnknownProperties?: boolean) => string;
        deserialize: (base64String: string, ignoreUnknownProperties?: boolean) => SearchQuery;
    };
};
export default _default;
