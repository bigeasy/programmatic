var esprima = require('esprima')
var ok = require('assert').ok
var contains = require('subordinate')
var util = require('util')
var incept = require('./incept')

function dump (object) {
    return util.inspect(object, false, null)
}

function push (node) {
    return ({
        type: 'ExpressionStatement',
        expression: {
            type: 'CallExpression',
            callee: {
                type: 'MemberExpression',
                computed: false,
                object: { type: 'Identifier', name: '$' },
                property: { type: 'Identifier', name: 'push' }
            },
            arguments: [ incept(node) ]
        }
    })
}

function rewrite (outer) {
    for (var i = 0, I = outer.body.body.length; i < I; i++) {
        var node = outer.body.body[i]
        if (contains(node, NODE.returnFunction)) {
            node.argument.body.body = node.argument.body.body.map(function (node) {
                return push(node)
            })
            outer.body.body.unshift({
                type: 'VariableDeclaration',
                 declarations:
                  [ { type: 'VariableDeclarator',
                      id: { type: 'Identifier', name: '$' },
                      init:
                       { type: 'CallExpression',
                         callee:
                          { type: 'CallExpression',
                            callee: { type: 'Identifier', name: 'require' },
                            arguments: [ { type: 'Literal', value: 'programmatic/builder' } ] },
                         arguments: [ incept(node.argument.params) ] } } ],
                 kind: 'var' })
            outer.body.body.splice.apply(outer.body.body, [i + 1, 1].concat(node.argument.body.body))
            outer.body.body.push({
                type: 'ReturnStatement',
                argument: {
                    type: 'CallExpression',
                    callee: {
                        type: 'MemberExpression',
                        computed: false,
                        object: { type: 'Identifier', name: '$' },
                        property: { type: 'Identifier', name: 'create' }
                    },
                    arguments: []
                }
            })
            break
        }
    }
}

var NODE = {
    exportsMember: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
            type: 'MemberExpression',
            object: {
                type: 'Identifier', name: 'exports'
            }
        }
    },
    returnFunction: {
        type: 'ReturnStatement',
        argument: { type: 'FunctionExpression' }
    }
}

exports.generate = function (source) {
    var program = esprima.parse(source)
    return program.body.filter(function (node) {
        if (node.type == 'ExpressionStatement' && node.expression.type == 'AssignmentExpression') {
            var e = node.expression
            if (contains(e, NODE.exportsMember)) {
                ok(node.expression.right.type == 'FunctionExpression')
                return true
            }
        }
    }).map(function (node) {
        rewrite(node.expression.right)
        return node
    })
}
