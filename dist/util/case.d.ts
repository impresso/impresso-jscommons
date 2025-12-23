/**
 * Case conversion utilities - ESM version
 * Converted from the CommonJS 'case' module to ESM
 */
interface RegexpsConfig {
    capitalize: RegExp;
    pascal: RegExp;
    fill: RegExp;
    sentence: RegExp;
    improper: RegExp;
    relax: RegExp;
    upper: RegExp;
    hole: RegExp;
    apostrophe: RegExp;
    room: RegExp;
}
declare const utils: {
    re: RegexpsConfig;
    unicodes: (s: string, prefix?: string) => string;
    regexps: (symbols?: string, lowers?: string, uppers?: string, impropers?: string) => RegexpsConfig;
    types: string[];
    up: () => string;
    low: () => string;
    cap: (s: string) => string;
    decap: (s: string) => string;
    deapostrophe: (s: string) => string;
    fill: (s: string, fill?: string, deapostrophe?: boolean) => string;
    prep: (s: string, fill?: boolean, pascal?: boolean, upper?: boolean) => string;
    relax: (m: string, before: string, acronym: string, caps: string) => string;
};
interface CaseModule {
    [key: string]: any;
    _: typeof utils;
    of: (s: string) => string | undefined;
    flip: (s: string) => string;
    random: (s: string) => string;
    type: (type: string, fn: Function) => void;
    default: CaseModule;
    lower: (s: string, fill?: string, deapostrophe?: boolean) => string;
    upper: (s: string, fill?: string, deapostrophe?: boolean) => string;
    pascal: (s: string) => string;
    camel: (s: string) => string;
    snake: (s: string) => string;
    kebab: (s: string) => string;
    capital: (s: string, fill?: string, deapostrophe?: boolean) => string;
    header: (s: string) => string;
    constant: (s: string) => string;
    title: (s: string) => string;
    sentence: (s: string, names?: string[], abbreviations?: string[]) => string;
    squish: (s: string) => string;
}
declare const caseModule: CaseModule;
export declare const lower: (s: string, fill?: string, deapostrophe?: boolean) => string, upper: (s: string, fill?: string, deapostrophe?: boolean) => string, pascal: (s: string) => string, camel: (s: string) => string, snake: (s: string) => string, kebab: (s: string) => string, capital: (s: string, fill?: string, deapostrophe?: boolean) => string, header: (s: string) => string, constant: (s: string) => string, title: (s: string) => string, sentence: (s: string, names?: string[], abbreviations?: string[]) => string, flip: (s: string) => string, random: (s: string) => string;
export default caseModule;
