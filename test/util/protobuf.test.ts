import {
  FilterContext,
  FilterOperator,
  FilterPrecision,
  FilterType,
  fromFilterContextEnum,
  fromFilterOperatorEnum,
  fromFilterPrecisionEnum,
  fromFilterTypeEnum,
  toFilterContextEnum,
  toFilterOperatorEnum,
  toFilterPrecisionEnum,
  toFilterTypeEnum,
} from '../../src/types/filter'
import {
  FilterContext as FilterContextEnum,
  FilterOperator as FilterOperatorEnum,
  FilterPrecision as FilterPrecisionEnum,
  FilterType as FilterTypeEnum,
} from '../../src/generated/proto/query_pb'

describe('toEnum / fromEnum — FilterContext (snake case, CONTEXT_ prefix)', () => {
  const cases: [FilterContext, FilterContextEnum][] = [
    ['include', FilterContextEnum.CONTEXT_INCLUDE],
    ['exclude', FilterContextEnum.CONTEXT_EXCLUDE],
  ]

  test.each(cases)('toEnum(%s) === %i', (literal, enumVal) => {
    expect(toFilterContextEnum(literal)).toBe(enumVal)
  })

  test.each(cases)('fromEnum(%i) === %s', (literal, enumVal) => {
    expect(fromFilterContextEnum(enumVal)).toBe(literal)
  })

  it('toEnum throws on unknown value', () => {
    expect(() => toFilterContextEnum('unknown' as FilterContext)).toThrow(/Unknown enum value/)
  })
})

describe('toEnum / fromEnum — FilterOperator (upper case, OPERATOR_ prefix)', () => {
  const cases: [FilterOperator, FilterOperatorEnum][] = [
    ['AND', FilterOperatorEnum.OPERATOR_AND],
    ['OR', FilterOperatorEnum.OPERATOR_OR],
  ]

  test.each(cases)('toEnum(%s) === %i', (literal, enumVal) => {
    expect(toFilterOperatorEnum(literal)).toBe(enumVal)
  })

  test.each(cases)('fromEnum(%i) === %s', (literal, enumVal) => {
    expect(fromFilterOperatorEnum(enumVal)).toBe(literal)
  })

  it('toEnum throws on unknown value', () => {
    expect(() => toFilterOperatorEnum('XOR' as FilterOperator)).toThrow(/Unknown enum value/)
  })
})

describe('toEnum / fromEnum — FilterPrecision (snake case, PRECISION_ prefix)', () => {
  const cases: [FilterPrecision, FilterPrecisionEnum][] = [
    ['exact', FilterPrecisionEnum.PRECISION_EXACT],
    ['partial', FilterPrecisionEnum.PRECISION_PARTIAL],
    ['fuzzy', FilterPrecisionEnum.PRECISION_FUZZY],
    ['soft', FilterPrecisionEnum.PRECISION_SOFT],
  ]

  test.each(cases)('toEnum(%s) === %i', (literal, enumVal) => {
    expect(toFilterPrecisionEnum(literal)).toBe(enumVal)
  })

  test.each(cases)('fromEnum(%i) === %s', (literal, enumVal) => {
    expect(fromFilterPrecisionEnum(enumVal)).toBe(literal)
  })

  it('toEnum throws on unknown value', () => {
    expect(() => toFilterPrecisionEnum('approximate' as FilterPrecision)).toThrow(/Unknown enum value/)
  })
})

describe('toEnum / fromEnum — FilterType (snake case, TYPE_ prefix)', () => {
  const cases: [FilterType, FilterTypeEnum][] = [
    ['hasTextContents', FilterTypeEnum.TYPE_HAS_TEXT_CONTENTS],
    ['daterange', FilterTypeEnum.TYPE_DATERANGE],
    ['collection', FilterTypeEnum.TYPE_COLLECTION],
    ['person', FilterTypeEnum.TYPE_PERSON],
    ['textReuseCluster', FilterTypeEnum.TYPE_TEXT_REUSE_CLUSTER],
  ]

  test.each(cases)('toEnum(%s) === %i', (literal, enumVal) => {
    expect(toFilterTypeEnum(literal)).toBe(enumVal)
  })

  test.each(cases)('fromEnum(%i) === %s', (literal, enumVal) => {
    expect(fromFilterTypeEnum(enumVal)).toBe(literal)
  })

  it('toEnum throws on unknown value', () => {
    expect(() => toFilterTypeEnum('unknownType' as FilterType)).toThrow(/Unknown enum value/)
  })
})
