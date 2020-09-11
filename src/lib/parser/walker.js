class TreeError extends Error {

}

export default class TreeWalker {
  constructor(parser, visitMethods) {
    this.parser = parser;
    this.visitMethods = visitMethods || {};
  }

  registerVisitor(nodeType, func) {
    this.visitMethods[nodeType] = func;
  }

  visit(node) {
    // eslint-disable-next-line no-prototype-builtins
    if (this.visitMethods.hasOwnProperty(node.type)) {
      return this.visitMethods[node.type](node);
    }

    throw new TreeError(`Unknown visit method ${node.type}`);
  }
}
