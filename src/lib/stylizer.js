import { symbols, functions } from '@/lib/definitions';

const span = (classes, innerText) => `<span class="token ${classes.join(' ')}">${innerText}</span>`;

const REG_GOLD = /(\d+g)/g;
const REG_SILVER = /(\d+s)/g;
const REG_COPPER = /(\d+c)/g;

const REG_ITEM_BRACKET = /(\[.+\])/g;
const REG_ITEM_NUMERIC = /(item:(\d+|ID))/g;

const REG_LPAREN = /\(/g;
const REG_RPAREN = /\)/g;

const REG_REPLACEMENTS = [
  [/\//g, '/'],
  [/-/g, '-'],
  [/\*/g, '*'],
  [/\+/g, '+'],
  [/%/g, '%'],
];

export default function stylizeString(string) {
  let replacedString = string;

  REG_REPLACEMENTS.forEach((n) => {
    const [reg, replace] = n;
    replacedString = replacedString.replace(reg, span(['maths'], replace));
  });

  functions.forEach((func) => {
    replacedString = replacedString.replace(new RegExp(`${func.name}\\s?\\(`, 'g'), span(['function'], `${func.name}(`));
  });

  symbols.forEach((symbol) => {
    replacedString = replacedString.replace(new RegExp(symbol.name, 'g'), span(['symbol'], symbol.name));
  });

  replacedString = replacedString.replace(REG_LPAREN, span(['parens'], '('));
  replacedString = replacedString.replace(REG_RPAREN, span(['parens'], ')'));

  const cspan = c => ((_match, p1) => span(['currency', c], p1));

  replacedString = replacedString.replace(REG_GOLD, cspan('gold'));
  replacedString = replacedString.replace(REG_SILVER, cspan('silver'));
  replacedString = replacedString.replace(REG_COPPER, cspan('copper'));

  replacedString = replacedString.replace(REG_ITEM_BRACKET, (_match, p1) => span(['item'], p1));
  replacedString = replacedString.replace(REG_ITEM_NUMERIC, (_match, p1) => span(['item'], p1));

  return replacedString;
}
