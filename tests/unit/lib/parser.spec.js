/* eslint-disable import/extensions */
import Parser from '@/lib/parser';
import { Token } from '@/lib/lexer';

function LexerMock(tokens, getCharacterAt) {
  let i = 0;
  return {
    /**
     * currentCharacter and getNextToken are the only getters/functions
     * used in the Parser class.
     */
    currentCharacter: null,
    getNextToken() {
      const value = tokens[i];
      i += 1;

      // Allow overriding of the currentCharacter getter (used for testing functions)
      if (value.type !== Token.EOF && getCharacterAt) {
        let currentIndex = 0;
        for (let n = 0; n < i; n += 1) {
          currentIndex += tokens[n].value.length;
        }
        this.currentCharacter = getCharacterAt(currentIndex);
      }

      return value;
    },
  };
}

describe('Grammar rules', () => {
  it('implements term   : KWORD|NUM|LPAR expr RPAR|func|cur|item|itemid', () => {
    // KWORD
    expect((
      new Parser(LexerMock([
        new Token(Token.KWORD, 'DBMarket'),
        new Token(Token.EOF, null),
      ]))).term().toString())
      .toEqual('T(keyword, DBMarket)');

    // NUM
    expect((
      new Parser(LexerMock([
        new Token(Token.NUMBER, '100'),
        new Token(Token.EOF, null),
      ]))).term().toString())
      .toEqual('T(number, 100)');

    // LPAR expr RPAR
    expect((
      new Parser(LexerMock([
        new Token(Token.LPAR, '('),
        new Token(Token.KWORD, 'DBMarket'),
        new Token(Token.RPAR, ')'),
        new Token(Token.EOF, null),
      ]))).term().toString())
      .toEqual('T(keyword, DBMarket)');
  });

  it('implements item   : LBRACKET KWORD (KWORD)* RBRACKET', () => {
    // LBRACKET KWORD RBRACKET
    expect((
      new Parser(LexerMock([
        new Token(Token.LBRACKET, '['),
        new Token(Token.KWORD, 'Frostmourne'),
        new Token(Token.RBRACKET, ']'),
        new Token(Token.EOF, null),
      ]))).item().toString())
      .toEqual('(T(keyword, Frostmourne))');
    // LBRACKET KWORD RBRACKET
    expect((
      new Parser(LexerMock([
        new Token(Token.LBRACKET, '['),
        new Token(Token.KWORD, 'Sulfuron'),
        new Token(Token.KWORD, 'Hammer'),
        new Token(Token.RBRACKET, ']'),
        new Token(Token.EOF, null),
      ]))).item().toString())
      .toEqual('(T(keyword, Sulfuron), T(keyword, Hammer))');
  });

  it('implements itemid : KWORD(\'i\') COLON NUM', () => {
    // KWORD COLON NUM
    expect((
      new Parser(LexerMock([
        new Token(Token.KWORD, 'i'),
        new Token(Token.COLON, ':'),
        new Token(Token.NUMBER, '1234'),
        new Token(Token.EOF, null),
      ]))).itemid().toString())
      .toEqual('T(number, 1234)');
  });

  it('implements cur    : NUM DENOM (NUM DENOM)*', () => {
    // NUM DENOM
    expect((
      new Parser(LexerMock([
        new Token(Token.NUMBER, '50000'),
        new Token(Token.DENOM, 'g'),
        new Token(Token.EOF, null),
      ]))).cur().toString())
      .toEqual('(T(number, 50000),T(denom, g))');
    expect((
      new Parser(LexerMock([
        new Token(Token.NUMBER, '520'),
        new Token(Token.DENOM, 's'),
        new Token(Token.EOF, null),
      ]))).cur().toString())
      .toEqual('(T(number, 520),T(denom, s))');
    expect((
      new Parser(LexerMock([
        new Token(Token.NUMBER, '50'),
        new Token(Token.DENOM, 'c'),
        new Token(Token.EOF, null),
      ]))).cur().toString())
      .toEqual('(T(number, 50),T(denom, c))');

    // NUM DENOM (NUM DENOM)*
    expect((
      new Parser(LexerMock([
        new Token(Token.NUMBER, '50000'),
        new Token(Token.DENOM, 'g'),
        new Token(Token.NUMBER, '20'),
        new Token(Token.DENOM, 's'),
        new Token(Token.EOF, null),
      ]))).cur().toString())
      .toEqual('(T(number, 50000),T(denom, g),T(number, 20),T(denom, s))');
    expect((
      new Parser(LexerMock([
        new Token(Token.NUMBER, '50000'),
        new Token(Token.DENOM, 'g'),
        new Token(Token.NUMBER, '20'),
        new Token(Token.DENOM, 's'),
        new Token(Token.NUMBER, '10'),
        new Token(Token.DENOM, 'c'),
        new Token(Token.EOF, null),
      ]))).cur().toString())
      .toEqual('(T(number, 50000),T(denom, g),T(number, 20),T(denom, s),T(number, 10),T(denom, c))');
  });

  it('implements fact   : term ((MUL|DIV|PERCENT) term)*', () => {
    expect((
      new Parser(LexerMock([
        new Token(Token.NUMBER, '10'),
        new Token(Token.DIV, '/'),
        new Token(Token.NUMBER, '20'),
        new Token(Token.EOF, null),
      ]))).fact().toString())
      .toEqual('(T(number, 10), T(div, /), T(number, 20))');

    expect((
      new Parser(LexerMock([
        new Token(Token.NUMBER, '10'),
        new Token(Token.MUL, '*'),
        new Token(Token.NUMBER, '20'),
        new Token(Token.EOF, null),
      ]))).fact().toString())
      .toEqual('(T(number, 10), T(mul, *), T(number, 20))');

    expect((
      new Parser(LexerMock([
        new Token(Token.NUMBER, '100'),
        new Token(Token.MUL, '%'),
        new Token(Token.KWORD, 'DBMarket'),
        new Token(Token.EOF, null),
      ]))).fact().toString())
      .toEqual('(T(number, 100), T(mul, %), T(keyword, DBMarket))');
  });

  it('implements expr   : fact (WHITESPACE)? ((PLUS|MINUS) fact)*', () => {
    expect((
      new Parser(LexerMock([
        new Token(Token.NUMBER, '10'),
        new Token(Token.PLUS, '+'),
        new Token(Token.NUMBER, '20'),
        new Token(Token.EOF, null),
      ]))).expr().toString())
      .toEqual('(T(number, 10), T(plus, +), T(number, 20))');

    expect((
      new Parser(LexerMock([
        new Token(Token.NUMBER, '10'),
        new Token(Token.MINUS, '-'),
        new Token(Token.NUMBER, '20'),
        new Token(Token.EOF, null),
      ]))).expr().toString())
      .toEqual('(T(number, 10), T(minus, -), T(number, 20))');

    expect((
      new Parser(LexerMock([
        new Token(Token.NUMBER, '10'),
        new Token(Token.MINUS, '-'),
        new Token(Token.NUMBER, '20'),
        new Token(Token.MINUS, '-'),
        new Token(Token.NUMBER, '20'),
        new Token(Token.MINUS, '-'),
        new Token(Token.NUMBER, '20'),
        new Token(Token.EOF, null),
      ]))).expr().toString())
      .toEqual('(((T(number, 10), T(minus, -), T(number, 20)), T(minus, -), T(number, 20)), T(minus, -), T(number, 20))');
  });

  it('implements func   : KWORD LPAR (expr (PUNC expr)*)? RPAR', () => {
    // KWORD LPAR RPAR
    expect((
      new Parser(LexerMock([
        new Token(Token.KWORD, 'max'),
        new Token(Token.LPAR, '('),
        new Token(Token.RPAR, ')'),
        new Token(Token.EOF, null),
      ]))).func().toString())
      .toEqual('T(keyword, max)()');
    // KWORD LPAR (expr (PUNC expr)*)? RPAR
    expect((
      new Parser(LexerMock([
        new Token(Token.KWORD, 'max'),
        new Token(Token.LPAR, '('),
        new Token(Token.NUMBER, '20'),
        new Token(Token.RPAR, ')'),
        new Token(Token.EOF, null),
      ]))).func().toString())
      .toEqual('T(keyword, max)(T(number, 20))');
    expect((
      new Parser(LexerMock([
        new Token(Token.KWORD, 'max'),
        new Token(Token.LPAR, '('),
        new Token(Token.NUMBER, '20'),
        new Token(Token.PUNC, ','),
        new Token(Token.NUMBER, '20'),
        new Token(Token.RPAR, ')'),
        new Token(Token.EOF, null),
      ]))).func().toString())
      .toEqual('T(keyword, max)(T(number, 20), T(number, 20))');
  });
});

describe('Formula parsing', () => {
  it('parses `1 + 2 * 4 / 5`', () => {
    expect(
      (new Parser(LexerMock([
        new Token(Token.NUMBER, '1'),
        new Token(Token.PLUS, '+'),
        new Token(Token.NUMBER, '2'),
        new Token(Token.MUL, '*'),
        new Token(Token.NUMBER, '4'),
        new Token(Token.DIV, '/'),
        new Token(Token.NUMBER, '5'),
        new Token(Token.EOF, null),
      ]))).parse().toString(),
    ).toMatch('(T(number, 1), T(plus, +), ((T(number, 2), T(mul, *), T(number, 4)), T(div, /), T(number, 5)))');
  });
  it('parses `(1 + 2) * 4 / 5`', () => {
    expect(
      (new Parser(LexerMock([
        new Token(Token.LPAR, '('),
        new Token(Token.NUMBER, '1'),
        new Token(Token.PLUS, '+'),
        new Token(Token.NUMBER, '2'),
        new Token(Token.RPAR, ')'),
        new Token(Token.MUL, '*'),
        new Token(Token.NUMBER, '4'),
        new Token(Token.DIV, '/'),
        new Token(Token.NUMBER, '5'),
        new Token(Token.EOF, null),
      ]))).parse().toString(),
    ).toMatch('(((T(number, 1), T(plus, +), T(number, 2)), T(mul, *), T(number, 4)), T(div, /), T(number, 5))');
  });
  it('parses `1 + (2 * 4) / 5`', () => {
    expect(
      (new Parser(LexerMock([
        new Token(Token.NUMBER, '1'),
        new Token(Token.PLUS, '+'),
        new Token(Token.LPAR, '('),
        new Token(Token.NUMBER, '2'),
        new Token(Token.MUL, '*'),
        new Token(Token.NUMBER, '4'),
        new Token(Token.RPAR, ')'),
        new Token(Token.DIV, '/'),
        new Token(Token.NUMBER, '5'),
        new Token(Token.EOF, null),
      ]))).parse().toString(),
    ).toMatch('(T(number, 1), T(plus, +), ((T(number, 2), T(mul, *), T(number, 4)), T(div, /), T(number, 5)))');
  });
  it('parses `DBMarket + max(2, 4)`', () => {
    expect(
      (new Parser(LexerMock([
        new Token(Token.KWORD, 'DBMarket'),
        new Token(Token.PLUS, '+'),
        new Token(Token.KWORD, 'max'),
        new Token(Token.LPAR, '('),
        new Token(Token.NUMBER, '2'),
        new Token(Token.PUNC, ','),
        new Token(Token.NUMBER, '10'),
        new Token(Token.RPAR, ')'),
        new Token(Token.EOF, null),
      ], c => `${'DBMarket+max(2,4)'[c]}`))).parse().toString(),
    ).toMatch('(T(keyword, DBMarket), T(plus, +), T(keyword, max)(T(number, 2), T(number, 10)))');
  });
  it('parses `DBMarket + max(100% DBRegionalAverage, 5 * VendorSell)`', () => {
    expect(
      (new Parser(LexerMock([
        new Token(Token.KWORD, 'DBMarket'),
        new Token(Token.PLUS, '+'),
        new Token(Token.KWORD, 'max'),
        new Token(Token.LPAR, '('),
        new Token(Token.NUMBER, '100'),
        new Token(Token.PERCENT, '%'),
        new Token(Token.KWORD, 'DBRegionalAverage'),
        new Token(Token.PUNC, ','),
        new Token(Token.NUMBER, '5'),
        new Token(Token.MUL, '*'),
        new Token(Token.KWORD, 'VendorSell'),
        new Token(Token.RPAR, ')'),
        new Token(Token.EOF, null),
      ], c => `${'DBMarket+max(100%DBRegionalAverage,5*VendorSell)'[c]}`))).parse().toString(),
    ).toMatch('(T(keyword, DBMarket), T(plus, +), T(keyword, max)((T(number, 100), T(percent, %), T(keyword, DBRegionalAverage)), (T(number, 5), T(mul, *), T(keyword, VendorSell))))');
  });
  it('parses `DBMarket + max(100% DBRegionalAverage([Atiesh]), 5 * VendorSell(i:12345))`', () => {
    expect(
      (new Parser(LexerMock([
        new Token(Token.KWORD, 'DBMarket'),
        new Token(Token.PLUS, '+'),
        new Token(Token.KWORD, 'max'),
        new Token(Token.LPAR, '('),
        new Token(Token.NUMBER, '100'),
        new Token(Token.PERCENT, '%'),
        new Token(Token.KWORD, 'DBRegionalAverage'),
        new Token(Token.LPAR, '('),
        new Token(Token.LBRACKET, '['),
        new Token(Token.KWORD, 'Atiesh'),
        new Token(Token.RBRACKET, ']'),
        new Token(Token.RPAR, ')'),
        new Token(Token.PUNC, ','),
        new Token(Token.NUMBER, '5'),
        new Token(Token.MUL, '*'),
        new Token(Token.KWORD, 'VendorSell'),
        new Token(Token.LPAR, '('),
        new Token(Token.KWORD, 'i'),
        new Token(Token.COLON, ':'),
        new Token(Token.NUMBER, '1234'),
        new Token(Token.RPAR, ')'),
        new Token(Token.RPAR, ')'),
        new Token(Token.EOF, null),
      ], c => `${'DBMarket+max(100%DBRegionalAverage([Atiesh]),5*VendorSell(i:12345))'[c]}`))).parse().toString(),
    ).toMatch('(T(keyword, DBMarket), T(plus, +), T(keyword, max)((T(number, 100), T(percent, %), T(keyword, DBRegionalAverage)((T(keyword, Atiesh)))), (T(number, 5), T(mul, *), T(keyword, VendorSell)(T(number, 1234)))))');
  });
  it('handles mismatched parens in `1 + (2 * 4 / 5`', () => {
    let errorMessage = '';
    try {
      const p = new Parser(LexerMock([
        new Token(Token.NUMBER, '1'),
        new Token(Token.PLUS, '+'),
        new Token(Token.LPAR, '('),
        new Token(Token.NUMBER, '2'),
        new Token(Token.MUL, '*'),
        new Token(Token.NUMBER, '4'),
        new Token(Token.DIV, '/'),
        new Token(Token.NUMBER, '5'),
        new Token(Token.EOF, null),
      ]));
      p.parse();
    } catch (error) {
      errorMessage = error.message;
    }

    expect(errorMessage).toEqual('Syntax Error: expected rparen but got eof');
  });
});
