// examples to satisfy the requirements of Packet

require('proof')(3, function () {
    var programmatic = require('../..')

    var block = programmatic(function () {
        number++
    })
    block(function () {
        return number
    })
    var method = block.compile('number')

    console.log(String(method))

    this.equal(method(0), 1, 'catenated')

    var block = programmatic()

    block(function () {
        number++
    })
    block(function () {
        return number
    })
    method = block.compile('number')
    this.equal(method(0), 1, 'catenated')
    var block = programmatic(function () {
        number++
    }, function () {
        return number
    })

    method = block.compile('number')
    this.equal(method(0), 1, 'catenated')
})
