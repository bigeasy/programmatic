#!/usr/bin/env node

require('proof')(3, function (equal) {
    var source = require('../..')

    var block = source(function () {
        return $number
    })
    block.number('1')

    var method = block.compile()

    console.log(String(method))

    equal(method(), 1, 'replace with string')

    block.number(function () { 1 })
    method = block.compile()
    console.log(String(method))
    equal(method(), 1, 'replace with source')

    block = source(function () {
        return (
            $number
        )
    })
    block.number(function () {
        2 -
        1
    })
    method = block.compile()
    console.log(String(method))
    equal(method(), 1, 'replace with multi-line source')

})
