import { symbols, functions } from '@/lib/definitions';
import Lexer, { Token } from '@/lib/lexer';

const functionNames = functions.map(f => f.name);
const symbolNames = symbols.map(s => s.name);
const lowerCaseToNormalCase = {};

functionNames.forEach((n) => {
  lowerCaseToNormalCase[n.toLowerCase()] = n;
  return null;
});

symbolNames.forEach((n) => {
  lowerCaseToNormalCase[n.toLowerCase()] = n;
  return null;
});

/**
 * Returns a reformatted version of the passed string. It retains any existing whitespace.
 * What it reformats:
 * - Text case for function and symbol names
 * - Spacing between function arguments
 * - Spacing between operations such as +, -, *, and /
 * @param {string} string The TSM String to reformat
 */
function reformatter(string) {
  const correctCase = s => lowerCaseToNormalCase[s.toLowerCase()] || s;
  const doNothing = token => token.value;
  const appendSpace = token => `${token.value} `;
  const padSpace = token => ` ${token.value} `;

  const tokenFormat = {
    [Token.WHITESPACE]: doNothing,
    [Token.EXPRESSION]: doNothing,
    [Token.PLUS]: padSpace,
    [Token.MINUS]: padSpace,
    [Token.MUL]: padSpace,
    [Token.DIV]: padSpace,
    [Token.PERCENT]: doNothing,
    [Token.RBRACKET]: doNothing,
    [Token.LBRACKET]: doNothing,
    [Token.RPAR]: doNothing,
    [Token.LPAR]: doNothing,
    [Token.NUMBER]: doNothing,
    [Token.PUNC]: appendSpace,
    [Token.COLON]: doNothing,
    [Token.ITEM]: doNothing,
    [Token.DENOM]: doNothing,
    [Token.KWORD]: (token) => {
      if (functionNames.find(e => e.toLowerCase() === token.value.toLowerCase())) {
        return correctCase(token.value);
      }
      if (symbolNames.find(e => e.toLowerCase() === token.value.toLowerCase())) {
        return correctCase(token.value);
      }

      return token.value;
    },
  };

  const lexer = new Lexer(string);
  let token = lexer.getNextToken();
  let result = '';

  while (token.type !== Token.EOF) {
    result += tokenFormat[token.type](token);
    token = lexer.getNextToken();
  }

  return result;
}

function stylizeString(string) {
  if (string.length === 0) {
    return '';
  }
  const classes = {
    [Token.WHITESPACE]: () => 'whitespace',
    [Token.EXPRESSION]: () => 'expression',
    [Token.PLUS]: () => 'maths',
    [Token.MINUS]: () => 'maths',
    [Token.MUL]: () => 'maths',
    [Token.DIV]: () => 'maths',
    [Token.PERCENT]: () => 'percent',
    [Token.RBRACKET]: () => 'brackets rbracket',
    [Token.LBRACKET]: () => 'brackets lbracket',
    [Token.RPAR]: () => 'parens rparen',
    [Token.LPAR]: () => 'parens lparen',
    [Token.NUMBER]: () => 'numeric',
    [Token.PUNC]: () => 'punc',
    [Token.COLON]: () => 'punc',
    [Token.ITEM]: () => 'item',
    [Token.DENOM]: (token) => {
      const denom = { g: 'gold', s: 'silver', c: 'copper' };
      return `currency ${denom[token.value]}`;
    },
    [Token.KWORD]: (token) => {
      if (functionNames.find(e => e.toLowerCase() === token.value.toLowerCase())) {
        return 'function';
      }
      if (symbolNames.find(e => e.toLowerCase() === token.value.toLowerCase())) {
        return 'symbol';
      }

      return '';
    },
  };

  const span = token => `<span class="token ${classes[token.type](token)}">${token.value}</span>`;

  const lexer = new Lexer(string);

  let token = lexer.getNextToken();
  let result = '';

  while (token.type !== Token.EOF) {
    const nextToken = lexer.getNextToken();
    if (token.type === Token.WHITESPACE) {
      result += token.value;
    } else if (token.type !== Token.DENOM) {
      if (nextToken.type === Token.DENOM) {
        result += `<span class="token ${classes[nextToken.type](nextToken)}">${span(token)}${nextToken.value}</span>`;
      } else {
        result += span(token);
      }
    }
    token = nextToken;
  }

  return result;
}

export { stylizeString, reformatter };
