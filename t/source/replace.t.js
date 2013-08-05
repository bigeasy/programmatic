#!/usr/bin/env node

require('proof')(1, function (equal) {
    var source = require('../..').createSource()

    source(function () {
        return $number
    })
    source('number', '1')

    var method = source()()

    console.log(String(method))

    equal(method(), 1, 'generated')
})
