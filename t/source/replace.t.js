#!/usr/bin/env node

require('proof')(3, function (equal) {
    var source = require('../..').createSource()

    source(function () {
        return $number
    })
    source('number', '1')

    var method = source()()

    console.log(String(method))

    equal(method(), 1, 'replace with string')

    source('number', function () { 1 })
    method = source()()
    console.log(String(method))
    equal(method(), 1, 'replace with source')

    source = require('../..').createSource()
    source(function () {
        return (
            $number
        )
    })
    source('number', function () {
        2 -
        1
    })
    method = source()()
    console.log(String(method))
    equal(method(), 1, 'replace with multi-line source')

})
