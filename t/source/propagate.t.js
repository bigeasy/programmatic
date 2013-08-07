require('proof')(1, function () {
    var source = require('../..')

    var block = source(function () {
        return $math
    })
    block.$math(function () { $multiple * number })
    block.$multiple(function () { 2 })

    console.log(String(block))

    var double = block.compile('number')
    this.ok(double(2) == 4, 'generated function')
})
