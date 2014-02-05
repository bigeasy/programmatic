require('proof')(5, function () {
    var programmatic = require('../..')

    var block = programmatic(function () {
        return $number
    })
    block.$number('1')

    var method = block.compile()

    console.log(String(method))

    this.equal(method(), 1, 'replace with string')

    block.$number(function () { 1 })
    method = block.compile()
    console.log(String(method))
    this.equal(method(), 1, 'replace with source')

    block = programmatic(function () {
        return (
            $number
        )
    })
    block.$number(function () {
        2 -
        1
    })
    method = block.compile()
    console.log(String(method))
    this.equal(method(), 1, 'replace with multi-line source')

    block = programmatic('\n\
        return $number  \n\
    ')
    block.$number('1')

    method = block.compile()

    console.log(String(method))

    this.equal(method(), 1, 'replace with string')

    block = programmatic('\n\
        return $number  \n\
    ')
    var number = programmatic(function () { 1 })
    block.$number(number)

    method = block.compile()

    console.log(String(method))

    this.equal(method(), 1, 'replace with source')
})
