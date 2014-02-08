require('../proof')(1, function (dump, deepEqual) {
    var incept = require('../../lib/incept')
    deepEqual(incept({ a: 1 }), { type: 'ObjectExpression', properties: [
        { type: 'Property',
          key: { type: 'Identifier', name: 'a' },
          value: { type: 'Literal', value: 1 },
          kind: 'init' }
    ] }, 'object')
})
