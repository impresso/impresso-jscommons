import { camel, snake } from 'case';

// Utility type to convert SNAKE_CASE to camelCase
export type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<SnakeToCamel<U>>}` : S

// Utility type to omit 'unspecified' from a union of literals
export type OmitUnspecified<T> = T extends 'unspecified' ? never : T


export function omitUndefinedAndEmptyLists<T extends Record<string, unknown>>(obj: T): T {
  return Object.keys(obj).reduce((o, property) => {
    if (o[property] === undefined || (Array.isArray(o[property]) && o[property].length === 0)) {
      delete o[property];
    }
    return o;
  }, obj);
}

const camelToSnakeUpper = (value: string): string => snake(value).toUpperCase()
const snakeToCamel = (value: string): string => camel(value) //value.toLowerCase().replace(/_([a-z])/g, (_, c: string) => c.toUpperCase())

type EnumObject = Record<string, string | number> & Record<number, string>;

export const createPrefixedEnumMapper = <TLiteral extends string, TEnum extends EnumObject>(
  enumObj: TEnum,
  prefix: string,
  literalType: 'upper' | 'snake' = 'snake'
) => ({
  toEnum(value: TLiteral): TEnum[keyof TEnum] {
    const enumKey = `${prefix}${camelToSnakeUpper(value)}`
    const enumValue = enumObj[enumKey]

    if (typeof enumValue !== 'number') {
      throw new Error(`Unknown enum value: ${value}`)
    }

    return enumValue as TEnum[keyof TEnum]
  },

  fromEnum(value: TEnum[keyof TEnum]): TLiteral {
    const enumKey = Object.keys(enumObj).find((key) => enumObj[key] === value)

    if (typeof enumKey !== 'string' || !enumKey.startsWith(prefix)) {
      throw new Error(`Unknown enum key: ${value}`)
    }

    const fn = literalType === 'upper' ? (s: string) => s.toUpperCase() : snakeToCamel

    return fn(enumKey.slice(prefix.length)) as TLiteral
  }
})
