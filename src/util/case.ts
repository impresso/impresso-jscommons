/**
 * Splits input into normalized lowercase word tokens.
 * Matches nbubna/Case's delimiter handling:
 * - CamelCase / PascalCase transitions (fooBar -> foo, Bar)
 * - Acronym/number boundaries (HTTPResponse -> HTTP, Response)
 * - Strips apostrophes and non-alphanumerics
 */
function _words(str: string | null | undefined): string[] {
  if (!str) return [];
  return String(str)
    .replace(/['’]/g, '') // remove apostrophes (Case default for programmatic cases)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // split camelCase and digit-to-capital
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // split acronyms (e.g., XMLHttp -> XML Http)
    .replace(/[^a-zA-Z0-9]+/g, ' ') // replace punctuation/symbols with spaces
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

export function snake(str: string | null | undefined): string {
  return _words(str).join('_');
}

export function camel(str: string | null | undefined): string {
  const words = _words(str);
  if (!words.length) return '';
  return words[0] + words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}