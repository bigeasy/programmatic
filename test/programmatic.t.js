const loop = `for (var i = 0; i < 9; i++) {
    console.log('here')

    console.log(i)
}`
const f = `function f () {
    for (var i = 0; i < 9; i++) {
        console.log('here')

        console.log(i)
    }

    console.log('done')
}`
const list = ` * a
 * b
 * c`
const message = `Title

 * a
 * b
 * c

Closes #3.
`
const blanked = `
for (var i = 0; i < 9; i++) {
    console.log(i)
}`

const erased = `{
    let i = 0
}`

const select = `function (bool) {
    return bool
} (true)`

const snuggled = `case 1:
    select (function (bool) {
        return bool
    } (true)) {
    }`

require('proof')(8, okay => {
    const $ = require('..')
    const $loop = $(`
        for (var i = 0; i < 9; i++) {
            console.log('here')

            console.log(i)
        }
    `)
    okay($loop, loop, 'strip leading white')
    okay($(`
        function f () {
            `, $loop, `

            console.log('done')
        }
    `), f, 'strip leading white')
    okay($(4, `
         * a
         * b
         * c
    `), list, 'set stop')
    okay($(`
        ${'Title'}

        `, list, `

        Closes #${3}.

    `), message, 'message')
    okay($(`

        for (var i = 0; i < 9; i++) {
            console.log(i)
        }
    `), blanked, 'leading blank')

    okay($(`
        {
            `, null, -1, `

            let i = 0
        }
    `), erased, 'fast-forward')

    okay($(`
        {
            let i = 0

            `, -1, null, `
        }
    `), erased, 'rewind')

    okay($(`
        case 1:
            select (`, select, `) {
            }
    `), snuggled, 'snuggled')
})
