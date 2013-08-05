#!/usr/bin/env node

require('proof')(3, function (equal) {
    var source = require('../..').createSource()

    source(function () { return 1 })
    var method = source()()

    console.log(String(method))

    equal(method(), 1, 'one liner')
    equal(String(source()), 'return 1', 'toString')

    source = require('../..').createSource()
    source(function () {
        return 1
    })
    method = source()()

    console.log(String(method))

    equal(method(), 1, 'trim last line')
})
