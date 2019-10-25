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
require('proof')(5, (okay) => {
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
})
