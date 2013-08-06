require('proof')(3, function (equal) {
    var source = require('../..')

    var block = source(function () { return 1 })
    var method = block.compile()

    console.log(String(method))

    equal(method(), 1, 'one liner')
    equal(String(block), 'return 1', 'toString')

    method = source(function () {
        return 1
    }).compile()

    console.log(String(method))

    equal(method(), 1, 'trim last line')
})
