function Builder (parameters) {
    this._parameters = parameters
    this._body = []
}

Builder.prototype.push = function (statement) {
    this._body.push(statement)
}

Builder.prototype.create = function (statement) {
    return {
        type: 'Program',
        body:
         [ { type: 'ExpressionStatement',
             expression:
              { type: 'AssignmentExpression',
                operator: '=',
                left:
                 { type: 'MemberExpression',
                   computed: false,
                   object: { type: 'Identifier', name: 'module' },
                   property: { type: 'Identifier', name: 'exports' } },
                right:
                 { type: 'FunctionExpression',
                   id: null,
                   params: this._parameters,
                   defaults: [],
                   body: { type: 'BlockStatement', body: this._body },
                   rest: null,
                   generator: false,
                   expression: false } } } ] }
}

module.exports = function (parameters) {
    return new Builder(parameters)
}
