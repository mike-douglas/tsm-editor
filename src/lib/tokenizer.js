export function tokenizeByWord(blob) {
  // eslint-disable-next-line no-useless-escape
  return blob.split(/[\s\(\)\{\}]+/);
}

export function tokenizeByLetter(blob) {
  return blob.split();
}

export class Token {
  static WHITESPACE = 'whitespace';

  static EXPRESSION = 'expression';

  static PLUS = 'plus';

  static MINUS = 'minus';

  static MUL = 'mul';

  static DIV = 'div';

  static PERCENT = 'percent';

  static KEYWORD = 'keyword';

  static RPAR = 'rparen';

  static LPAR = 'lparen';

  static NUMBER = 'number';

  static EOF = 'eof';

  constructor(type, value) {
    this.type = type;
    this.value = value;
  }

  toString() {
    return `Token(${this.type}, ${this.value})`;
  }
}

const REG_WHITESPACE = /\s+/;
const REG_DIGIT = /[0-9]/;
const REG_ALPHA = /[A-Za-z]/;
const REG_OPERATION = /(-|\+)/;
const REG_PAREN = /(\(|\))/;

export default class Lexer {
  constructor(text) {
    this.text = text;
    this.nothing = '';
    this.currentPosition = 0;
    this.currentToken = null;
  }

  get currentCharacter() {
    if (this.currentPosition > this.text.length - 1) {
      return null;
    }

    return `${this.text[this.currentPosition]}`;
  }

  advance() {
    this.currentPosition += 1;
  }

  skipWhitespace() {
    while (this.currentCharacter.match(REG_WHITESPACE)) {
      this.advance();
    }
  }

  getWhiteSpace() {
    let result = '';

    while (this.currentCharacter && this.currentCharacter.match(REG_WHITESPACE)) {
      result += this.currentCharacter;
      this.advance();
    }

    return result;
  }

  getNumber() {
    let result = '';

    while (this.currentCharacter && this.currentCharacter.match(REG_DIGIT)) {
      result += this.currentCharacter;
      this.advance();
    }

    return parseInt(result, 10);
  }

  getKeyword() {
    let result = '';

    while (this.currentCharacter && this.currentCharacter.match(REG_ALPHA)) {
      result += this.currentCharacter;
      this.advance();
    }

    return result;
  }

  getNextToken() {
    while (this.currentCharacter != null) {
      if (this.currentCharacter.match(REG_WHITESPACE)) {
        return new Token(Token.WHITESPACE, this.getWhiteSpace());
      }

      if (this.currentCharacter.match(REG_PAREN)) {
        const c = this.currentCharacter;
        this.advance();
        return new Token(c === '(' ? Token.LPAR : Token.RPAR, c);
      }

      if (this.currentCharacter.match(REG_DIGIT)) {
        return new Token(Token.NUMBER, this.getNumber());
      }

      if (this.currentCharacter.match(REG_ALPHA)) {
        return new Token(Token.KEYWORD, this.getKeyword());
      }

      if (this.currentCharacter.match(REG_OPERATION)) {
        const c = this.currentCharacter;
        this.advance();
        switch (c) {
          case '-':
            return new Token(Token.MINUS, c);
          case '+':
            return new Token(Token.PLUS, c);
          case '*':
            return new Token(Token.MUL, c);
          case '/':
            return new Token(Token.DIV, c);
          case '%':
            return new Token(Token.PERCENT, c);
          default:
            break;
        }
      }
    }

    return new Token(Token.EOF, null);
  }
}
