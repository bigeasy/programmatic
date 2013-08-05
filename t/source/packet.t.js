#!/usr/bin/env node

// examples to satisfy the requirements of Packet

require('proof')(1, function (equal) {
    var source = require('../..').createSource()

    source(function () {
        var number = 1
    })
    source(function () {
        return number
    })
    var method = source()()

    console.log(String(method))

    equal(method(), 1, 'catenated')
})
