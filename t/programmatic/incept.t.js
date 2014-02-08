require('../proof')(1, function (dump, deepEqual) {
    var incept = require('../../lib/incept')
    deepEqual(incept({}), { type: 'ObjectExpression', properties: [] }, 'object')
})
