require('proof')(1, function (deepEqual) {
    var esprima = require('esprima')
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
})
