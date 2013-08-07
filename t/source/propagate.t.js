require('proof')(2, function () {
    var source = require('../..')

    var block = source(function () {
        return $math
    })
    block.$math(function () { $multiple * number })
    block.$multiple(function () { 2 })

    console.log(String(block))
    this.equal(String(block), 'return 2 * number\n', 'convert to string')

    var double = block.compile('number')
    this.ok(double(2) == 4, 'generated function')
})
