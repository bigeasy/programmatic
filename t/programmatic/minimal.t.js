require('proof')(5, function () {
    var programmatic = require('../..')

    var block = programmatic(function () { return 1 })
    var method = block.compile()

    console.log(String(method))

    this.equal(method(), 1, 'one liner')
    this.equal(String(block), 'return 1', 'toString')
    this.equal(block.define('a'), 'function (a) {\n    return 1\n}', 'define')

    method = programmatic(function () {
        return 1
    }).compile()

    console.log(String(method))

    this.equal(method(), 1, 'trim last line')

    block = programmatic('return 1')
    method = block.compile()

    this.equal(method(), 1, 'one liner string')
})
