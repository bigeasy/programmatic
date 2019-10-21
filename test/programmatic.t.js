var loop = `var i = 0
while (i < 10) {
    i++ // foo
    console.log(i)
}`

const f = `function () {
    var i = 0
    while (i < 10) {
        i++ // foo
        console.log(i)
    }
    console.log(i)
}`

var blank = `function () {
    var i = 0
    while (i < 10) {
        i++ // foo
        console.log(i)
    }

    console.log(i)
}`

require('proof')(5, prove)

function prove (assert) {
    const s = require('..')
    let inner
    assert(inner = s(`
        var i = 0
        while (i < 10) {
            `, '', `
            `, 'i++', ` // foo
            console.log(i)
        }
    `), loop, 'indented')
    assert(s([`
        function () {
            `, inner, `

            console.log(i)
            // __reference__
        }
    `]), f, 'nested multi-line')
    assert(s([`
        function () {
            `, inner, `
            // __blank__
            console.log(i)
        }
    `]), blank, 'nested blank line')
    assert(s(`
        var i = 0
        while (i < 10) {
            i++ // foo
            console.log(i)
        `, '}', `
    `), loop, 'dedented')
    assert(s(`
        var i = 0
        `, 'while (i < 10)', ` {
            i++ // foo
            console.log(i)
        }
    `), loop, 'unchanged')
}
