import { symbols, functions } from '@/lib/definitions';

const REG_GOLD = /(\d+g)/g;
const REG_SILVER = /(\d+s)/g;
const REG_COPPER = /(\d+c)/g;

const REG_LPAREN = /\(/g;
const REG_RPAREN = /\)/g;

const REG_MATH_REPLACEMENTS = [
  [/\//g, '/'],
  [/-/g, '-'],
  [/\*/g, '*'],
  [/\+/g, '+'],
  [/%/g, '%'],
];

const REG_PUNCTUATION = /(,)/g;
const REG_NUMERIC = /(\d+\.?\d{0,}|\.?\d+)/g;

const REG_ITEMS = [
  /(\[.+\])/g,
  /(i:(\d+|ID))/g,
];

const REG_FUNCTIONS = functions.map(f => ({
  func: f,
  regex: new RegExp(`(${f.name}\\s?\\()`, 'gi'),
}));

const REG_SYMBOLS = symbols.map(s => ({
  symbol: s,
  regex: new RegExp(`(${s.name})`, 'gi'),
}));

// This simply wraps the result as-is in a <span> tag
const span = (classes, innerText) => `<span class="token ${classes.join(' ')}">${innerText}</span>`;

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
        REG_FUNCTIONS.forEach(({ func, regex }) => {
          replacedString = replacedString.replace(regex, `${func.name}(`);
        });
        break;

      case 'symbol':
        REG_SYMBOLS.forEach(({ symbol, regex }) => {
          replacedString = replacedString.replace(regex, symbol.name);
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
  return (string) => {
    let replacedString = string;

    REG_MATH_REPLACEMENTS.forEach((n) => {
      const [reg, replace] = n;
      replacedString = replacedString.replace(reg, func(['maths'], replace));
    });

    REG_ITEMS.forEach((regex) => {
      replacedString = replacedString.replace(regex, (_match, p1) => func(['item'], p1));
    });

    REG_FUNCTIONS.forEach(({ regex }) => {
      replacedString = replacedString.replace(regex, (_match, p1) => func(['function'], p1));
    });

    REG_SYMBOLS.forEach(({ regex }) => {
      replacedString = replacedString.replace(regex, (_match, p1) => func(['symbol'], p1));
    });

    replacedString = replacedString.replace(REG_LPAREN, func(['parens', 'lparen'], '('));
    replacedString = replacedString.replace(REG_RPAREN, func(['parens', 'rparen'], ')'));

    const currencyReplace = c => ((_match, p1) => func(['currency', c], p1));

    replacedString = replacedString.replace(REG_GOLD, currencyReplace('gold'));
    replacedString = replacedString.replace(REG_SILVER, currencyReplace('silver'));
    replacedString = replacedString.replace(REG_COPPER, currencyReplace('copper'));

    replacedString = replacedString.replace(REG_PUNCTUATION, (_match, p1) => func(['punc'], p1));
    replacedString = replacedString.replace(REG_NUMERIC, (_match, p1) => func(['numeric'], p1));

    return replacedString;
  };
}

export const reformatter = stylizer(addSpaces);
export const stylizeString = stylizer(span);
