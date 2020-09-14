export class NodeType {
  static Unknown = 'unknown';

  static BinaryOperator = 'binaryOp';

  static Number = 'number';

  static Keyword = 'keyword';

  static Item = 'item';

  static Function = 'function';

  static Currency = 'currency';
}

class Node {
  constructor(token) {
    this.token = token;
    this.type = NodeType.Unknown;
  }

  value() {
    return this.token ? this.token.value : null;
  }

  toString() {
    return `${this.token.toString()}`;
  }
}

/**
 * A node that represents a function call
 */
export class FunctionNode extends Node {
  constructor(token, args) {
    super(token);
    this.arguments = args;
    this.type = NodeType.Function;
  }

  toString() {
    return `${this.token.toString()}(${this.arguments.map(n => n.toString()).join(', ')})`;
  }
}

/**
 * A node that represents a binary operation
 */
export class BinaryOperatorNode extends Node {
  constructor(left, operator, right) {
    super(operator);
    this.left = left;
    this.operator = operator;
    this.right = right;
    this.type = NodeType.BinaryOperator;
  }

  toString() {
    return `(${this.left.toString()}, ${this.token.toString()}, ${this.right.toString()})`;
  }
}

/**
 * Represents a number
 */
export class NumberNode extends Node {
  constructor(token) {
    super(token);
    this.type = NodeType.Number;
  }
}

/**
 * Represents a currency value (numbers + denominations)
 */
export class CurrencyNode extends Node {
  constructor(values) {
    super(null);
    this.values = values;
    this.type = NodeType.Currency;
  }

  toString() {
    return `(${this.values.toString()})`;
  }
}

/**
 * Represents a keyword (symbol, function, unknown)
 */
export class KeywordNode extends Node {
  constructor(token) {
    super(token);
    this.type = NodeType.Keyword;
  }
}

/**
 * Represents an in-game item
 */
export class ItemNode extends Node {
  constructor(values) {
    super(null);
    this.values = values;
    this.type = NodeType.Item;
  }

  toString() {
    return `(${this.values.map(v => v.toString()).join(', ')})`;
  }
}

/**
 * Represents an in-game item, referenced by Item ID
 */
export class ItemIDNode extends Node {
  constructor(token) {
    super(token);
    this.type = NodeType.Item;
  }
}
