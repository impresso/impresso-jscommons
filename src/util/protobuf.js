const {
  snake, camel, upper, pascal,
} = require('case');
const { fromByteArray, toByteArray } = require('base64-js');

// While this one is being implemented: https://github.com/protocolbuffers/protobuf/issues/1591
function fromObject(ProtoClass, obj) {
  if (obj === undefined) return undefined;
  const instance = new ProtoClass();
  Object.keys(obj).forEach((property) => {
    const setterName = `set${pascal(property)}`;
    const listSetterName = `set${pascal(property)}List`;
    const setter = instance[setterName] || instance[listSetterName];
    if (setter === undefined) throw new Error(`Unknown property: "${property}"`);
    setter.call(instance, obj[property]);
  });

  return instance;
}


function omitUndefinedAndEmptyLists(obj) {
  return Object.keys(obj).reduce((o, property) => {
    if (o[property] === undefined || (Array.isArray(o[property]) && o[property].length === 0)) {
      delete o[property];
    }
    return o;
  }, obj);
}

function fixRepeatedFields(obj) {
  return Object.keys(obj).reduce((o, property) => {
    if (property.endsWith('List')) {
      o[property.replace(/List$/, '')] = o[property].map(fixRepeatedFields);
      delete o[property];
    }
    return o;
  }, obj);
}

function getEnumString(Enum, enumNumber, upperCase = false) {
  // `0` element is `undefined` by convention.
  if (!enumNumber || enumNumber === 0) return undefined;
  const enumString = Object.keys(Enum).find((key) => Enum[key] === enumNumber);
  if (!enumString) throw new Error(`Unknown enum number: ${enumNumber}`);
  const camelized = camel(enumString.split('_').slice(1).join('_'));
  return upperCase ? upper(camelized) : camelized;
}

function getEnumNumber(Enum, enumString) {
  if (enumString === undefined) return undefined;
  const prefix = Object.keys(Enum)[0].split('_')[0];
  const field = [prefix, upper(snake(enumString), '_')].join('_');
  const val = Enum[field];
  if (val === undefined) throw new Error(`Unknown enum value: ${enumString} (${field})`);
  return val;
}


function serialize(ProtoClass, obj, converter) {
  if (obj === undefined) return undefined;
  const convertedObj = converter ? converter(obj) : obj;
  return fromByteArray(fromObject(ProtoClass, convertedObj).serializeBinary());
}

function deserialize(ProtoClass, base64String, converter) {
  const obj = fixRepeatedFields(ProtoClass.deserializeBinary(toByteArray(base64String)).toObject());
  return converter ? converter(obj) : obj;
}

module.exports = {
  fromObject,
  omitUndefinedAndEmptyLists,
  fixRepeatedFields,
  getEnumString,
  getEnumNumber,
  serialize,
  deserialize,
};
