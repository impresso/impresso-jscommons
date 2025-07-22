declare const _default: {
    $schema: string;
    title: string;
    description: string;
    type: string;
    required: string[];
    properties: {
        q: {
            oneOf: ({
                type: string;
                items: {
                    type: string;
                };
            } | {
                type: string;
                items?: undefined;
            })[];
            description: string;
        };
        type: {
            type: string;
            description: string;
            enum: readonly ("string" | "uid" | "hasTextContents" | "title" | "isFront" | "page" | "issue" | "entity" | "newspaper" | "daterange" | "year" | "language" | "type" | "regex" | "mention" | "person" | "location" | "topic" | "collection" | "ocrQuality" | "contentLength" | "country" | "accessRight" | "partner" | "month" | "textReuseClusterSize" | "textReuseClusterLexicalOverlap" | "textReuseClusterDayDelta" | "textReuseCluster" | "mentionFunction" | "nag" | "wikidataId" | "dataDomain" | "copyright" | "sourceType" | "sourceMedium" | "organisation")[];
        };
        context: {
            type: string;
            description: string;
            enum: readonly ("include" | "exclude")[];
        };
        precision: {
            type: string;
            description: string;
            enum: readonly ("exact" | "partial" | "fuzzy" | "soft")[];
        };
        op: {
            type: string;
            description: string;
            enum: readonly ("AND" | "OR")[];
        };
        uids: {
            type: string;
            items: {
                type: string;
            };
            description: string;
        };
    };
};
export default _default;
