// examples to satisfy the requirements of Packet

require('proof')(1, function () {
    var source = require('../..')

    var block = source(function () {
        $.var(multiple = $multiple)
    })
    block(function () {
        return number * multiple
    })
    block.multiple(function () { 2 })
    var double = block.compile('number')

    console.log(String(double))

    this.equal(double(2), 4, 'vars preserved')
})
