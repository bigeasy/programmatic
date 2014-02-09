require('../proof')(2, function (dump, deepEqual) {
    var incept = require('../../lib/incept')
    deepEqual(incept({ a: 1 }), { type: 'ObjectExpression', properties: [
        { type: 'Property',
          key: { type: 'Identifier', name: 'a' },
          value: { type: 'Literal', value: 1 },
          kind: 'init' }
    ] }, 'object')
    deepEqual(incept([{ a: 1 }]), {
        type: 'ArrayExpression',
        elements: [
            { type: 'ObjectExpression',
              properties: [
                { type: 'Property',
                  key: { type: 'Identifier', name: 'a' },
                  value: { type: 'Literal', value: 1 },
                  kind: 'init' } ] }
        ]
    }, 'array')
})
