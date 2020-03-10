import { symbols, functions } from '@/lib/definitions';

const searchReplace = (search, replace, item) => ({
  search,
  replace: (f, tags) => (replace ? f(tags, replace) : ((_, p1) => f(tags, p1))),
  item: item || null,
});

// This simply wraps the result as-is in a <span> tag
const span = (classes, innerText) => `<span class="token ${classes.join(' ')}">${innerText}</span>`;

const REG_GOLD = searchReplace(/(\d+g)/g);
const REG_SILVER = searchReplace(/(\d+s)/g);
const REG_COPPER = searchReplace(/(\d+c)/g);

const REG_LPAREN = searchReplace(/\(/g, '(');
const REG_RPAREN = searchReplace(/\)/g, ')');

const REG_MATH_REPLACEMENTS = [
  searchReplace(/\//g, '/'),
  searchReplace(/-/g, '-'),
  searchReplace(/\*/g, '*'),
  searchReplace(/\+/g, '+'),
];

const REG_PERCENT_REPLACEMENTS = [
  searchReplace(/%/g, '%'),
];

const REG_PUNCTUATION = searchReplace(/(,)/g);
const REG_NUMERIC = searchReplace(/(\d+\.?\d{0,}|\.?\d+)/g);

const REG_ITEMS = [
  searchReplace(/(\[.+\])/g),
  searchReplace(/(i:(\d+|ID))/g),
  searchReplace(/(item:(\d+|ID))/g),
];

const REG_FUNCTIONS = functions.map(f => searchReplace(new RegExp(`(${f.name}\\s?\\()`, 'gi'), null, f));

const REG_SYMBOLS = symbols.map(s => searchReplace(new RegExp(`(${s.name})`, 'gi'), null, s));

/**
 * Returns a function that takes a string argument and parses it using known
 * grammar rules defined in this file.
 *
 * The functions passed defined each step of the process, from walking through each
 * grammar rule (the walker function), to tagging the found patterns along the way (the
 * tagger function). It returns a string, defined by the end function.
 *
 * @param {Function} start Function in the form of (String)
 * @param {Function} walker Function in the form of (RegExp|Array, Function, Array)
 * @param {Function} tagger Function in the form of (Array, String) => String
 * @param {Function} end Function in the form of (String) => String
 */
function lemmatizer(start, walker, tagger, end) {
  return (string) => {
    start(string);

    REG_MATH_REPLACEMENTS.forEach((n) => {
      walker(n, tagger, ['maths']);
    });

    REG_PERCENT_REPLACEMENTS.forEach((n) => {
      walker(n, tagger, ['percent']);
    });

    REG_ITEMS.forEach((regex) => {
      walker(regex, tagger, ['item']);
    });

    REG_FUNCTIONS.forEach((regex) => {
      walker(regex, tagger, ['function']);
    });

    REG_SYMBOLS.forEach((regex) => {
      walker(regex, tagger, ['symbol']);
    });

    walker(REG_LPAREN, tagger, ['parens', 'lparen']);
    walker(REG_RPAREN, tagger, ['parens', 'rparen']);

    walker(REG_GOLD, tagger, ['currency', 'gold']);
    walker(REG_SILVER, tagger, ['currency', 'silver']);
    walker(REG_COPPER, tagger, ['currency', 'copper']);

    walker(REG_PUNCTUATION, tagger, ['punc']);
    walker(REG_NUMERIC, tagger, ['numeric']);

    return end(string);
  };
}

/* This is a little more involved. It adds spaces and applies capitalization
 * to the names of symbols to make things look nice.
 *
 * It uses the capitalization from the symbol definition.
 */
const addSpaces = (_classes, text) => {
  let replacedString = text;
  _classes.map((textClass) => {
    switch (textClass) {
      case 'maths':
      case 'item':
        replacedString = ` ${replacedString} `;
        break;

      case 'punc':
        replacedString = ', ';
        break;

      case 'function':
        REG_FUNCTIONS.forEach(({ search, item }) => {
          replacedString = replacedString.replace(search, `${item.name}(`);
        });
        break;

      case 'symbol':
        REG_SYMBOLS.forEach(({ search, item }) => {
          replacedString = replacedString.replace(search, item.name);
        });
        break;
      default:
        break;
    }

    return null;
  });

  return replacedString;
};

/**
 * A lemmatization function that returns a function that applies the passed argument
 * to each of the parsed tokens in the input string with classes and matched text.
 *
 * @param {function} func A function in this form: (classes, text) => (some value)
 */
function stylizer(func) {
  let replaceString = '';
  return lemmatizer((s) => {
    replaceString = s;
  },
  (struct, f, tags) => {
    replaceString = replaceString.replace(struct.search, struct.replace(f, tags));
  },
  func,
  () => replaceString);
}

export const reformatter = stylizer(addSpaces);
export const stylizeString = stylizer(span);
