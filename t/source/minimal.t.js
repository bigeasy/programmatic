require('proof')(3, function () {
    var source = require('../..')

    var block = source(function () { return 1 })
    var method = block.compile()

    console.log(String(method))

    this.equal(method(), 1, 'one liner')
    this.equal(String(block), 'return 1', 'toString')

    method = source(function () {
        return 1
    }).compile()

    console.log(String(method))

    this.equal(method(), 1, 'trim last line')
})
