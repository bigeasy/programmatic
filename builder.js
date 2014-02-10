function walk (ast, visitor) {
    (function walk (node, parent) {
        for (var key in node) {
            if (key == 'parent') continue

            var value = node[key]
            if (Array.isArray(value)) {
                value.forEach(function (child) {
                    if (child && typeof child.type == 'string') {
                        walk(child, node)
                    }
                })
            } else if (value && typeof value.type == 'string') {
                walk(value, node)
            }
        }
        visitor(node)
    })(ast)
}

function Builder (parameters, variables) {
    this._parameters = parameters
    this._variables = variables
    this._body = []
}

Builder.prototype.push = function (statement) {
    walk(statement, function (node) {
        if (node.type == 'Identifier') {
            if (this._variables[node.name]) {
                node.type = 'Literal'
                node.value = this._variables[node.name]
            }
        }
    }.bind(this))
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

module.exports = function (parameters, variables) {
    return new Builder(parameters, variables)
}
