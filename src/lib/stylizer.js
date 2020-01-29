import { symbols, functions } from '@/lib/definitions';

const span = (classes, innerText) => `<span class="token ${classes.join(' ')}">${innerText}</span>`;

const REG_GOLD = /(\d+g)/g;
const REG_SILVER = /(\d+s)/g;
const REG_COPPER = /(\d+c)/g;

const REG_ITEM_BRACKET = /(\[.+\])/g;
const REG_ITEM_NUMERIC = /(item:(\d+|ID))/g;

export default function stylizeString(string) {
  let replacedString = string;

  ['/', '-', '*', '+', '%'].forEach((n) => {
    replacedString = replacedString.replace(n, span(['maths'], n));
  });

  ['(', ')'].forEach((v) => {
    replacedString = replacedString.replace(v, span(['parents'], v));
  });

  symbols.forEach((symbol) => {
    replacedString = replacedString.replace(symbol.name, span(['symbol'], symbol.name));
  });

  functions.forEach((func) => {
    replacedString = replacedString.replace(func.name, span(['function'], func.name));
  });

  const cspan = c => ((_match, p1) => span(['currency', c], p1));

  replacedString = replacedString.replace(REG_GOLD, cspan('gold'));
  replacedString = replacedString.replace(REG_SILVER, cspan('silver'));
  replacedString = replacedString.replace(REG_COPPER, cspan('copper'));

  replacedString = replacedString.replace(REG_ITEM_BRACKET, (_match, p1) => span(['item'], p1));
  replacedString = replacedString.replace(REG_ITEM_NUMERIC, (_match, p1) => span(['item'], p1));

  return replacedString;
}
