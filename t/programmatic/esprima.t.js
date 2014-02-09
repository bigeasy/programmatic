require('proof')(2, function (deepEqual) {
    var redux = require('../..')
    var esprima = require('esprima')
    var escodegen = require('escodegen')
    deepEqual(esprima.parse('var answer = 42'), {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "answer"
                        },
                        "init": {
                            "type": "Literal",
                            "value": 42
                        }
                    }
                ],
                "kind": "var"
            }
        ]
    }, 'parse')
    deepEqual(escodegen.generate(esprima.parse('var answer = 42'), {
        format: { semicolons: false }
    }), 'var answer = 42', 'format')
})
