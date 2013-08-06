// examples to satisfy the requirements of Packet

require('proof')(1, function (equal) {
    var source = require('../..')

    var block = source(function () {
        var number = 1
    })
    block(function () {
        return number
    })
    var method = block.compile()

    console.log(String(method))

    equal(method(), 1, 'catenated')
})
