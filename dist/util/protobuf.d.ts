export declare function fromObject(ProtoClass: any, obj: any): any;
export declare function omitUndefinedAndEmptyLists(obj: any): any;
export declare function fixRepeatedFields(obj: any): any;
export declare function getEnumString(Enum: any, enumNumber: any, upperCase?: boolean): string;
export declare function getEnumNumber(Enum: any, enumString: any): any;
export declare function serialize(ProtoClass: any, obj: any, converter: any): string;
export declare function deserialize(ProtoClass: any, base64String: any, converter: any): any;
