export declare function fromObject<T extends {
    new (): any;
}>(ProtoClass: T, obj: Record<string, any> | undefined, ignoreUnknownProperties?: boolean): InstanceType<T> | undefined;
export declare function omitUndefinedAndEmptyLists(obj: any): any;
export declare function fixRepeatedFields(obj: any): any;
export declare function getEnumString(Enum: any, enumNumber: any, upperCase?: boolean): string;
export declare function getEnumNumber(Enum: any, enumString: any): any;
export declare function serialize<T extends {
    new (): {
        serializeBinary: () => Uint8Array;
    };
}, O extends Record<string, any>>(ProtoClass: T, obj: O | undefined, converter?: (obj: O) => Record<string, any>, ignoreUnknownProperties?: boolean): string | undefined;
export declare function deserialize(ProtoClass: any, base64String: any, converter: any): any;
