/**
 * Case conversion utilities - ESM version
 * Converted from the CommonJS 'case' module to ESM
 */

const unicodes = (s: string, prefix: string = ''): string => {
  prefix = prefix || '';
  return s.replace(/(^|-)/g, `$1\\u${prefix}`).replace(/,/g, `\\u${prefix}`);
};

const basicSymbols = unicodes('20-26,28-2F,3A-40,5B-60,7B-7E,A0-BF,D7,F7', '00');
const baseLowerCase = 'a-z' + unicodes('DF-F6,F8-FF', '00');
const baseUpperCase = 'A-Z' + unicodes('C0-D6,D8-DE', '00');
const improperInTitle = 'A|An|And|As|At|But|By|En|For|If|In|Of|On|Or|The|To|Vs?\\.?|Via';

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

const regexps = (
  symbols?: string,
  lowers?: string,
  uppers?: string,
  impropers?: string
): RegexpsConfig => {
  symbols = symbols || basicSymbols;
  lowers = lowers || baseLowerCase;
  uppers = uppers || baseUpperCase;
  impropers = impropers || improperInTitle;

  return {
    capitalize: new RegExp(`(^|[${symbols}])([${lowers}])`, 'g'),
    pascal: new RegExp(`(^|[${symbols}])+([${lowers}${uppers}])`, 'g'),
    fill: new RegExp(`[${symbols}]+(.|$)`, 'g'),
    sentence: new RegExp(`(^\\s*|[\\?\\!\\.]+"?\\s+"?|,\\s+")([${lowers}])`, 'g'),
    improper: new RegExp(`\\b(${impropers})\\b`, 'g'),
    relax: new RegExp(`([^${uppers}])([${uppers}]*)([${uppers}])(?=[^${uppers}]|$)`, 'g'),
    upper: new RegExp(`^[^${lowers}]+$`),
    hole: /[^\s]\s[^\s]/,
    apostrophe: /'/g,
    room: new RegExp(`[${symbols}]`),
  };
};

const re = regexps();

const utils = {
  re,
  unicodes,
  regexps,
  types: [] as string[],
  up: String.prototype.toUpperCase,
  low: String.prototype.toLowerCase,
  cap: (s: string): string => {
    return utils.up.call(s.charAt(0)) + s.slice(1);
  },
  decap: (s: string): string => {
    return utils.low.call(s.charAt(0)) + s.slice(1);
  },
  deapostrophe: (s: string): string => {
    return s.replace(re.apostrophe, '');
  },
  fill: (s: string, fill?: string, deapostrophe?: boolean): string => {
    if (fill != null) {
      s = s.replace(re.fill, (m, next) => {
        return next ? fill + next : '';
      });
    }
    if (deapostrophe) {
      s = utils.deapostrophe(s);
    }
    return s;
  },
  prep: (s: string, fill?: boolean, pascal?: boolean, upper?: boolean): string => {
    s = s == null ? '' : s + ''; // force to string
    if (!upper && re.upper.test(s)) {
      s = utils.low.call(s);
    }
    if (!fill && !re.hole.test(s)) {
      const holey = utils.fill(s, ' ');
      if (re.hole.test(holey)) {
        s = holey;
      }
    }
    if (!pascal && !re.room.test(s)) {
      s = s.replace(re.relax, (m, before, acronym, caps) => {
        return before + ' ' + (acronym ? acronym + ' ' : '') + caps;
      });
    }
    return s;
  },
  relax: (m: string, before: string, acronym: string, caps: string): string => {
    return before + ' ' + (acronym ? acronym + ' ' : '') + caps;
  },
};

const types = {
  lower: (s: string, fill?: string, deapostrophe?: boolean): string => {
    return utils.fill(utils.low.call(utils.prep(s, fill as any)), fill, deapostrophe);
  },
  snake: (s: string): string => {
    return caseModule.lower(s, '_', true);
  },
  constant: (s: string): string => {
    return caseModule.upper(s, '_', true);
  },
  camel: (s: string): string => {
    return utils.decap(caseModule.pascal(s));
  },
  kebab: (s: string): string => {
    return caseModule.lower(s, '-', true);
  },
  upper: (s: string, fill?: string, deapostrophe?: boolean): string => {
    return utils.fill(utils.up.call(utils.prep(s, fill as any, false, true)), fill, deapostrophe);
  },
  capital: (s: string, fill?: string, deapostrophe?: boolean): string => {
    return utils.fill(
      utils.prep(s).replace(re.capitalize, (m, border, letter) => {
        return border + utils.up.call(letter);
      }),
      fill,
      deapostrophe
    );
  },
  header: (s: string): string => {
    return caseModule.capital(s, '-', true);
  },
  pascal: (s: string): string => {
    return utils.fill(
      utils.prep(s, false, true).replace(re.pascal, (m, border, letter) => {
        return utils.up.call(letter);
      }),
      '',
      true
    );
  },
  title: (s: string): string => {
    return caseModule.capital(s).replace(re.improper, (small, p, i, s) => {
      return i > 0 && i < s.lastIndexOf(' ') ? utils.low.call(small) : small;
    });
  },
  sentence: (s: string, names?: string[], abbreviations?: string[]): string => {
    s = caseModule.lower(s).replace(re.sentence, (m, prelude, letter) => {
      return prelude + utils.up.call(letter);
    });
    if (names) {
      names.forEach((name) => {
        s = s.replace(new RegExp(`\\b${caseModule.lower(name)}\\b`, 'g'), utils.cap);
      });
    }
    if (abbreviations) {
      abbreviations.forEach((abbr) => {
        s = s.replace(
          new RegExp(`(\\b${caseModule.lower(abbr)}\\.\\s+)(\\w)`),
          (m, abbrAndSpace, letter) => {
            return abbrAndSpace + utils.low.call(letter);
          }
        );
      });
    }
    return s;
  },
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

const caseModule = {
  _: utils,
  of: (s: string): string | undefined => {
    for (let i = 0; i < utils.types.length; i++) {
      const fn = caseModule[utils.types[i]];
      if (typeof fn === 'function' && fn.apply(caseModule, [s]) === s) {
        return utils.types[i];
      }
    }
    return undefined;
  },
  flip: (s: string): string => {
    return s.replace(/\w/g, (l) => {
      return (l === utils.up.call(l) ? utils.low : utils.up).call(l);
    });
  },
  random: (s: string): string => {
    return s.replace(/\w/g, (l) => {
      return (Math.round(Math.random()) ? utils.up : utils.low).call(l);
    });
  },
  type: (type: string, fn: Function): void => {
    caseModule[type as keyof typeof caseModule] = fn as any;
    utils.types.push(type);
  },
} as CaseModule;

// Add types
Object.keys(types).forEach((type) => {
  caseModule.type(type, types[type as keyof typeof types]);
});

// TODO: Remove "squish" in a future breaking release.
caseModule.squish = caseModule.pascal;

// Allow import default
caseModule.default = caseModule;

// Export named functions
export const { lower, upper, pascal, camel, snake, kebab, capital, header, constant, title, sentence, flip, random } = caseModule;

// Export default
export default caseModule;
