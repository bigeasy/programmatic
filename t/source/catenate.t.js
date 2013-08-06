// examples to satisfy the requirements of Packet

require('proof')(1, function () {
    var source = require('../..')

    var block = source(function () {
        number++
    })
    block(function () {
        return number
    })
    var method = block.compile('number')

    console.log(String(method))

    this.equal(method(0), 1, 'catenated')
})
