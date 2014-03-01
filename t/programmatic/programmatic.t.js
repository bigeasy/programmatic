var loop = 'var i = 0\n\
while (i < 10) {\n\
    i++ // foo\n\
    console.log(i)\n\
}'

var f = 'function () {\n\
    var i = 0\n\
    while (i < 10) {\n\
        i++ // foo\n\
        console.log(i)\n\
    }\n\
    console.log(i)\n\
}'

var blank = 'function () {\n\
    var i = 0\n\
    while (i < 10) {\n\
        i++ // foo\n\
        console.log(i)\n\
    }\n\
\n\
    console.log(i)\n\
}'

require('proof')(5, function (equal) {
    var s  = require('../..'), inner
    equal(inner = s('                   \n\
        var i = 0                       \n\
        while (i < 10) {                \n\
            ', 'i++', ' // foo          \n\
            console.log(i)              \n\
        }                               \n\
    '), loop, 'indented')
    equal(s('                           \n\
        function () {                   \n\
            ', inner, '                 \n\
                                        \n\
            console.log(i)              \n\
        }                               \n\
    '), f, 'nested multi-line')
    equal(s('                           \n\
        function () {                   \n\
            ', inner, '                 \n\
            // __blank__                \n\
            console.log(i)              \n\
        }                               \n\
    '), blank, 'nested blank line')
    equal(s('                           \n\
        var i = 0                       \n\
        while (i < 10) {                \n\
            i++ // foo                  \n\
            console.log(i)              \n\
        ', '}', '                       \n\
    '), loop, 'dedented')
    equal(s('                           \n\
        var i = 0                       \n\
        ', 'while (i < 10)', ' {        \n\
            i++ // foo                  \n\
            console.log(i)              \n\
        }                               \n\
    '), loop, 'unchanged')
})
