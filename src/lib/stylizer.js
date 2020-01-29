import { symbols, functions } from '@/lib/definitions';

export default function stylizeString(string) {
  let replacedString = string;

  ['/', '-', '*', '+', '%'].forEach((n) => {
    replacedString = replacedString.replace(n, `<span class="maths">${n}</span>`);
  });

  ['(', ')'].forEach((v) => {
    replacedString = replacedString.replace(v, `<span class="parens">${v}</span>`);
  });

  symbols.forEach((symbol) => {
    replacedString = replacedString.replace(symbol.name, `<span class="symbol">${symbol.name}</span>`);
  });

  functions.forEach((func) => {
    replacedString = replacedString.replace(func.name, `<span class="symbol">${func.name}</span>`);
  });

  replacedString = replacedString.replace(/(\d+g)/g, (match, p1) => `<span class="currency gold">${p1}</span>`);
  replacedString = replacedString.replace(/(\d+s)/g, (match, p1) => `<span class="currency silver">${p1}</span>`);
  replacedString = replacedString.replace(/(\d+c)/g, (match, p1) => `<span class="currency copper">${p1}</span>`);

  return replacedString;
}
