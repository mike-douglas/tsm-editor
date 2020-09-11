const REG_WHITESPACE = /\s+/;
const REG_DIGIT = /[0-9]/;
const REG_ALPHA = /[A-Za-z]/;
const REG_OPERATION = /(-|\+|\/|%|\*|:)/;
const REG_PAREN = /(\(|\))/;
const REG_BRACKET = /\[|\]/;
const REG_PUNC = /(,|\.)/;
const REG_CURRENCY = /(g|s|c)/i;

export class Token {
  static WHITESPACE = 'whitespace';

  static EXPRESSION = 'expression';

  static PLUS = 'plus';

  static MINUS = 'minus';

  static MUL = 'mul';

  static DIV = 'div';

  static PERCENT = 'percent';

  static COLON = 'colon';

  static KWORD = 'keyword';

  static ITEM = 'item';

  static RPAR = 'rparen';

  static LPAR = 'lparen';

  static LBRACKET = 'lbracket';

  static RBRACKET = 'rbracket';

  static NUMBER = 'number';

  static PUNC = 'punc';

  static EOF = 'eof';

  static DENOM = 'denom';

  constructor(type, value) {
    this.type = type;
    this.value = value;
  }

  toString() {
    return `T(${this.type}, ${this.value})`;
  }
}

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

  get lastCharacter() {
    if (this.currentPosition > 0 && this.currentPosition < this.text.length) {
      return `${this.text[this.currentPosition - 1]}`;
    }

    return null;
  }

  rewind() {
    this.currentPosition = 0;
    this.currentToken = null;
  }

  advance() {
    this.currentPosition += 1;
  }

  toTokenizedString() {
    const result = [];
    const originalPosition = this.currentPosition;
    const originalToken = this.currentToken;
    let token = null;

    do {
      token = this.getNextToken();
      result.push(token);
    } while (token.type !== Token.EOF);

    this.currentPosition = originalPosition;
    this.currentToken = originalToken;

    return result.map(t => t.toString()).join(', ');
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

    while (this.currentCharacter
      && (this.currentCharacter.match(REG_DIGIT)
          || this.currentCharacter === '.')) {
      result += this.currentCharacter;
      this.advance();
    }

    return result;
  }

  getKeyword() {
    let result = '';

    while (this.currentCharacter && this.currentCharacter.match(REG_ALPHA)) {
      result += this.currentCharacter;
      this.advance();
    }

    return result;
  }

  getItem() {
    let result = '';

    while (this.currentCharacter && !this.currentCharacter.match(REG_BRACKET)) {
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

      if (this.currentCharacter.match(REG_BRACKET)) {
        const c = this.currentCharacter;
        this.advance();
        return new Token(c === '[' ? Token.LBRACKET : Token.RBRACKET, c);
      }

      if (this.currentCharacter.match(REG_PUNC)) {
        const c = this.currentCharacter;
        this.advance();
        return new Token(Token.PUNC, c);
      }

      if (this.currentCharacter.match(REG_CURRENCY)
          && this.lastCharacter
          && this.lastCharacter.match(REG_DIGIT)) {
        const c = this.currentCharacter;
        this.advance();
        return new Token(Token.DENOM, c);
      }

      if (this.currentCharacter.match(REG_DIGIT)) {
        return new Token(Token.NUMBER, this.getNumber());
      }

      if (this.currentCharacter.match(REG_ALPHA)) {
        return new Token(Token.KWORD, this.getKeyword());
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
          case ':':
            return new Token(Token.COLON, c);
          default:
            break;
        }
      }
    }

    return new Token(Token.EOF, null);
  }
}
