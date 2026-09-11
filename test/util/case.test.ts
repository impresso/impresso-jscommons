import { camel, snake } from '../../src/util/case'

describe('snake', () => {
  const cases: [string | null | undefined, string][] = [
    ['fooBar', 'foo_bar'],
    ['FooBar', 'foo_bar'],
    ['foo_bar', 'foo_bar'],
    ['foo-bar', 'foo_bar'],
    ['foo bar', 'foo_bar'],
    ['foo.bar', 'foo_bar'],
    ['foo/bar', 'foo_bar'],
    ['HTTPResponse', 'http_response'],
    ['XMLHttpRequest', 'xml_http_request'],
    ['foo123bar', 'foo123bar'],
    ['foo2Bar', 'foo2_bar'],
    ['foo’bar', 'foobar'],
    ["foo'bar", 'foobar'],
    ['', ''],
    [null, ''],
    [undefined, ''],
  ]

  test.each(cases)('snake(%j) === %j', (input, expected) => {
    expect(snake(input)).toBe(expected)
  })
})

describe('camel', () => {
  const cases: [string | null | undefined, string][] = [
    ['foo_bar', 'fooBar'],
    ['FooBar', 'fooBar'],
    ['fooBar', 'fooBar'],
    ['foo-bar', 'fooBar'],
    ['foo bar', 'fooBar'],
    ['foo.bar', 'fooBar'],
    ['foo/bar', 'fooBar'],
    ['HTTPResponse', 'httpResponse'],
    ['XMLHttpRequest', 'xmlHttpRequest'],
    ['foo123bar', 'foo123bar'],
    ['foo2_bar', 'foo2Bar'],
    ['foo’bar', 'foobar'],
    ["foo'bar", 'foobar'],
    ['', ''],
    [null, ''],
    [undefined, ''],
  ]

  test.each(cases)('camel(%j) === %j', (input, expected) => {
    expect(camel(input)).toBe(expected)
  })
})