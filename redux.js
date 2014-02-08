var esprima = require('esprima')
var ok = require('assert').ok
var contains = require('subordinate')

var NODE = {
    moduleExports: {
        left: {
            type: 'MemberExpression',
            object: { name: 'module' },
            property: { name: 'exports' }
        }
    }
}

exports.generate = function (source) {
    var program = esprima.parse(source)
    return program.body.filter(function (node) {
        if (node.type == 'ExpressionStatement' && node.expression.type == 'AssignmentExpression') {
            var e = node.expression
            if (contains(e, NODE.moduleExports)) {
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
