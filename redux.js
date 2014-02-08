var esprima = require('esprima')
var ok = require('assert').ok

function isModuleExports (e) {
    return e.left.type == 'MemberExpression'
        && e.left.object.name == 'module'
        && e.left.property.name == 'exports'
}

exports.generate = function (source) {
    var program = esprima.parse(source)
    return program.body.filter(function (node) {
        if (node.type == 'ExpressionStatement' && node.expression.type == 'AssignmentExpression') {
            var e = node.expression
            if (isModuleExports(node.expression)) {
                ok(node.expression.right.type == 'FunctionExpression')
                return true
            }
        }
    }).map(function (node) {
        var f = node.expression.right
        f.params.shift()
        return [ f.params.map(function (node) {
            return node.name
        }), { type: "Program", body: f.body.body  }]
    })
}
