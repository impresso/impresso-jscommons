export type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<SnakeToCamel<U>>}` : S;
export type OmitUnspecified<T> = T extends 'unspecified' ? never : T;
export declare function omitUndefinedAndEmptyLists<T extends Record<string, unknown>>(obj: T): T;
type EnumObject = Record<string, string | number> & Record<number, string>;
export declare const createPrefixedEnumMapper: <TLiteral extends string, TEnum extends EnumObject>(enumObj: TEnum, prefix: string, literalType?: "upper" | "snake") => {
    toEnum(value: TLiteral): TEnum[keyof TEnum];
    fromEnum(value: TEnum[keyof TEnum]): TLiteral;
};
export {};
