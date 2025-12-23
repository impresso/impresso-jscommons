import caseModule from 'case'
import { fromByteArray, toByteArray } from 'base64-js';

const { pascal, camel, upper, snake } = caseModule

// While this one is being implemented: https://github.com/protocolbuffers/protobuf/issues/1591
export function fromObject<T extends { new (): any }>(
  ProtoClass: T,
  obj: Record<string, any> | undefined,
  ignoreUnknownProperties = false,
): InstanceType<T> | undefined {
  if (obj === undefined) return undefined;
  const instance = new ProtoClass();
  Object.keys(obj).forEach((property) => {
    const setterName = `set${pascal(property)}`;
    const listSetterName = `set${pascal(property)}List`;
    const setter = instance[setterName] || instance[listSetterName];
    if (setter === undefined) {
      if (!ignoreUnknownProperties) throw new Error(`Unknown property: "${property}"`);
    } else {
      setter.call(instance, obj[property]);
    }
  });

  return instance;
}


export function omitUndefinedAndEmptyLists(obj) {
  return Object.keys(obj).reduce((o, property) => {
    if (o[property] === undefined || (Array.isArray(o[property]) && o[property].length === 0)) {
      delete o[property];
    }
    return o;
  }, obj);
}

export function fixRepeatedFields(obj) {
  return Object.keys(obj).reduce((o, property) => {
    if (property.endsWith('List')) {
      o[property.replace(/List$/, '')] = o[property].map(fixRepeatedFields);
      delete o[property];
    }
    return o;
  }, obj);
}

export function getEnumString(Enum, enumNumber, upperCase = false) {
  // `0` element is `undefined` by convention.
  if (!enumNumber || enumNumber === 0) return undefined;
  const enumString = Object.keys(Enum).find((key) => Enum[key] === enumNumber);
  if (!enumString) throw new Error(`Unknown enum number: ${enumNumber}`);
  const camelized = camel(enumString.split('_').slice(1).join('_'));
  return upperCase ? upper(camelized) : camelized;
}

export function getEnumNumber(Enum, enumString) {
  if (enumString === undefined) return undefined;
  const prefix = Object.keys(Enum)[0].split('_')[0];
  const field = [prefix, upper(snake(enumString), '_')].join('_');
  const val = Enum[field];
  if (val === undefined) throw new Error(`Unknown enum value: ${enumString} (${field})`);
  return val;
}


export function serialize<
  T extends { new (): { serializeBinary: () => Uint8Array } },
  O extends Record<string, any>
>(
  ProtoClass: T,
  obj: O | undefined,
  converter?: (obj: O) => Record<string, any>,
  ignoreUnknownProperties = false,
): string | undefined {
  if (obj === undefined) return undefined;
  const convertedObj = converter ? converter(obj) : obj;
  return fromByteArray(fromObject(ProtoClass, convertedObj, ignoreUnknownProperties)?.serializeBinary());
}

export function deserialize(ProtoClass, base64String, converter) {
  const obj = fixRepeatedFields(ProtoClass.deserializeBinary(toByteArray(base64String)).toObject());
  return converter ? converter(obj) : obj;
}
