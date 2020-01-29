import { symbols } from '@/lib/definitions';

export default function stylizeString(string) {
  let replacedString = string;

  symbols.forEach((symbol) => {
    replacedString = replacedString.replace(symbol.name, `<span class="symbol">${symbol.name}</span>`);
  });

  return replacedString;
}
