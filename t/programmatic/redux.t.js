require('proof')(1, function (deepEqual) {
    var redux  = require('../../redux')
    deepEqual(redux.redent(1, '\
        while (true) {                  \n\
            index++                     \n\
            if (index == 10) break      \n\
        }'), [
        [ 1, 'while (true) {' ],
        [ 2, 'index++' ],
        [ 2, 'if (index == 10) break' ],
        [ 1, '}' ]
    ], 'dedent')

    var s = redux.concept, o = redux.concept, i = 0

    console.log(s('                     \n\
        var i = 0                       \n\
        while (i < 10) {                \n\
            ', o('i++'), '              \n\
        }                               \n\
    '))
})
