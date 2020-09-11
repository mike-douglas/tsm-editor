import { Token } from '@/lib/lexer';
import {
  FunctionNode, BinaryOperatorNode, NumberNode, CurrencyNode, KeywordNode, ItemNode,
} from './node';

class ParserError extends Error {
}

export default class Parser {
  constructor(lexer) {
    this.lexer = lexer;
    this.currentToken = this.lexer.getNextToken();
  }

  /**
   * Progress through the lexer's tokens, getting the next expected token
   *
   * @param {string} tokenType The expected token to get next
   */
  eat(tokenType) {
    // Eat all whitespace, not needed for parsing the language
    while (this.currentToken.type === Token.WHITESPACE) {
      this.lexer.getNextToken();
    }
    if (this.currentToken.type === tokenType) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      throw new ParserError(`Syntax Error: expected ${tokenType} but got ${this.currentToken.type}`);
    }
  }

  /**
   * Returns a term, following the format:
   *  term  : KWORD | NUM | LPAR expr RPAR | func | cur | item(TODO)
   */
  term() {
    const token = this.currentToken;

    if (token.type === Token.NUMBER
        && this.lexer.currentCharacter
        && this.lexer.currentCharacter.match(/(g|s|c)/)) {
      return this.cur();
    }

    if (token.type === Token.NUMBER) {
      this.eat(Token.NUMBER);

      return new NumberNode(token);
    }

    if (token.type === Token.KWORD
        && this.lexer.currentCharacter === '(') {
      return this.func();
    }

    if (token.type === Token.KWORD) {
      this.eat(Token.KWORD);

      return new KeywordNode(token);
    }

    if (token.type === Token.ITEM) {
      this.eat(Token.ITEM);

      return new ItemNode(token);
    }

    if (token.type === Token.LPAR) {
      this.eat(Token.LPAR);
      const node = this.expr();
      this.eat(Token.RPAR);
      return node;
    }

    return null;
  }

  /**
   * Parse a currency node, following the format:
   *  cur   : NUM DENOM (NUM DENOM)*
   */
  cur() {
    const values = [];

    let token = this.currentToken;
    this.eat(Token.NUMBER);
    let denom = this.currentToken;
    this.eat(Token.DENOM);
    values.push([token, denom]);

    while (this.currentToken.type === Token.NUMBER) {
      token = this.currentToken;
      this.eat(Token.NUMBER);
      denom = this.currentToken;
      this.eat(Token.DENOM);
      values.push([token, denom]);
    }

    return new CurrencyNode(values);
  }

  /**
   * Parse a factor-based calculation call, following the format:
   *  fact  : term ((MUL|DIV|PERCENT) term)*
   */
  fact() {
    let node = this.term();

    while ([Token.MUL, Token.DIV, Token.PERCENT].indexOf(this.currentToken.type) >= 0) {
      const token = this.currentToken;

      this.eat(token.type);

      node = new BinaryOperatorNode(node, token, this.term());
    }

    return node;
  }

  /**
   * Parse a binary operation expression, following:
   *  expr  : fact ((PLUS|MINUS) fact)*
   */
  expr() {
    let node = this.fact();

    while ([Token.PLUS, Token.MINUS].indexOf(this.currentToken.type) >= 0) {
      const token = this.currentToken;

      this.eat(token.type);

      node = new BinaryOperatorNode(node, token, this.fact());
    }

    return node;
  }

  /**
   * Parse a function call, following:
   *  func  : KWORD LPAR (expr (PUNC expr)*)? RPAR
   */
  func() {
    const token = this.currentToken;
    const args = [];

    this.eat(Token.KWORD);
    this.eat(Token.LPAR);

    if (this.currentToken.type !== Token.RPAR) {
      args.push(this.expr());
    }

    while (this.currentToken.type === Token.PUNC) {
      this.eat(Token.PUNC);

      const node = this.expr();
      args.push(node);
    }

    this.eat(Token.RPAR);

    return new FunctionNode(token, args);
  }

  parse() {
    return this.expr();
  }
}
