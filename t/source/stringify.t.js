require('proof')(2, function () {
    var source = require('../..')

    var block = source(function () { return object[$(key)] })
    block.key('a')

    var method = block.compile('object')

    console.log(String(method))

    this.equal(method({ a: 1 }), 1, 'stringify')
    this.equal(String(block), 'return object["a"]', 'toString')
})
