const $ = require('..')

{
    function generate (body) {
        return $(`
            function f () {
                `, body, `
            }
        `)
    }

    console.log(generate('return 1'))
}
